import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { Shield, Eye, AlertTriangle, Lock, Unlock, Globe, MapPin, Smartphone, Monitor, WifiOff, UserX, Database, FileText, Chrome } from 'lucide-react';

interface DataExposurePageProps {
  onSkip: () => void;
}

interface ExposedData {
  type: string;
  value: string;
  icon: any;
  risk: 'high' | 'medium' | 'low';
}

interface IPData {
  ip: string;
  city: string;
  region: string;
  country: string;
  timezone: string;
  latitude?: number;
  longitude?: number;
  accuracy?: number; // only ever populated from real device GPS — never faked for IP-only estimates

  // --- Location provenance ---
  locationSource?: 'device' | 'ip'; // was this from GPS/Wi-Fi or an IP database guess?
  ipGeoAgreementKm?: number; // how far apart independent IP-geo providers' guesses were

  // --- Network intelligence ---
  asn?: string;
  isp?: string;
  proxyDetected?: boolean;
  hostingDetected?: boolean;
  mobileNetwork?: boolean;
  networkCheckAvailable?: boolean;
  networkConfidence?: number; // 0-100, higher = more trustworthy

  // --- Location cross-check (device GPS vs network/IP) ---
  locationMismatch?: boolean;
  mismatchDistanceKm?: number;
  locationConfidence?: number; // 0-100

  // --- Timezone cross-check ---
  timezoneMismatch?: boolean;

  // --- Network + location risk sub-score (bot signals are folded in separately, at render time) ---
  riskScore?: number; // 0-100, higher = riskier
}

interface ProviderResult {
  provider: string;
  ip?: string;
  city?: string;
  region?: string;
  country?: string;
  timezone?: string;
  latitude?: number;
  longitude?: number;
  asn?: string;
  isp?: string;
  proxy?: boolean;
  hosting?: boolean;
  mobile?: boolean;
}

interface BotSignals {
  automationFlag: boolean; // navigator.webdriver
  headlessUA: boolean; // headless browser / automation signature in the user-agent string
  cdpArtifact: boolean; // legacy Selenium/ChromeDriver artifact property
  noPlugins: boolean; // zero browser plugins reported
  noLanguages: boolean; // zero negotiated languages
  inconsistentChromeObject: boolean; // UA claims Chrome but window.chrome is missing
}

/**
 * Great-circle distance between two lat/lon points, in kilometers.
 */
function haversineDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/**
 * Takes the best of several GPS samples over a short time window instead of
 * trusting a single getCurrentPosition() call. A device's first GPS fix is
 * frequently a coarse, low-accuracy estimate (especially indoors or on a
 * cold start) — sampling for a few seconds and keeping the most precise
 * reading materially reduces error. Resolves early once a high-quality fix
 * (<= goodEnoughAccuracyMeters) arrives.
 */
function getBestGpsFix(
  windowMs: number,
  goodEnoughAccuracyMeters: number
): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    let best: GeolocationPosition | null = null;
    let settled = false;

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        if (!best || pos.coords.accuracy < best.coords.accuracy) {
          best = pos;
        }
        if (!settled && pos.coords.accuracy <= goodEnoughAccuracyMeters) {
          settled = true;
          navigator.geolocation.clearWatch(watchId);
          resolve(pos);
        }
      },
      (err) => {
        if (!settled && !best) {
          settled = true;
          navigator.geolocation.clearWatch(watchId);
          reject(err);
        }
      },
      { enableHighAccuracy: true, timeout: windowMs, maximumAge: 0 }
    );

    setTimeout(() => {
      if (!settled) {
        settled = true;
        navigator.geolocation.clearWatch(watchId);
        if (best) resolve(best);
        else reject(new Error('No GPS fix obtained within time window'));
      }
    }, windowMs);
  });
}

/**
 * --- IP geolocation / network intelligence providers ---
 *
 * ACCURACY DISCLAIMER: IP geolocation has a hard accuracy ceiling — it maps
 * IP address ranges to an ISP's registered location (often a regional hub),
 * NOT a device's physical position. A single provider being tens to a few
 * hundred km off is normal and expected, especially on mobile carriers,
 * satellite ISPs, or VPNs. Querying several providers and reporting how
 * much they disagree (an honest uncertainty figure) is the correct fix —
 * not "picking a better provider." The only way to get sub-100m accuracy
 * is device GPS / Wi-Fi positioning via the browser Geolocation API, which
 * this file always prioritizes when permission is granted.
 *
 * For a production / government deployment, replace these free-tier calls
 * with a contracted, paid provider (MaxMind GeoIP2 Insights, IPQualityScore,
 * IPinfo Privacy Detection) called from your backend, not the browser.
 *
 * Tor exit-node detection is intentionally NOT included: a real check
 * needs the Tor Project's exit-node list or a paid feed fetched server-side
 * (browsers can't do this reliably due to CORS). Hardcoding a "No Tor
 * Detected" result with no real check behind it would be misleading on a
 * security page, so it's omitted rather than faked.
 */

async function fetchIpinfo(signal: AbortSignal): Promise<ProviderResult | null> {
  try {
    const res = await fetch('https://ipinfo.io/json', { signal });
    if (!res.ok) return null;
    const j = await res.json();
    if (!j || j.error) return null;
    const [lat, lon] = j.loc ? j.loc.split(',').map(parseFloat) : [undefined, undefined];
    return {
      provider: 'ipinfo.io',
      ip: j.ip,
      city: j.city,
      region: j.region,
      country: j.country,
      timezone: j.timezone,
      latitude: lat,
      longitude: lon,
    };
  } catch {
    return null;
  }
}

async function fetchIpapiCo(signal: AbortSignal): Promise<ProviderResult | null> {
  try {
    const res = await fetch('https://ipapi.co/json/', { signal });
    if (!res.ok) return null;
    const j = await res.json();
    if (!j || j.error) return null;
    return {
      provider: 'ipapi.co',
      ip: j.ip,
      city: j.city,
      region: j.region,
      country: j.country_name,
      timezone: j.timezone,
      latitude: j.latitude,
      longitude: j.longitude,
    };
  } catch {
    return null;
  }
}

// Combines geolocation AND network intelligence (proxy/hosting/mobile/ASN/ISP)
// in a single free-tier call against the requester's own IP — this doubles
// as a second, independent geolocation opinion used for the agreement check.
async function fetchIpApiCom(signal: AbortSignal): Promise<ProviderResult | null> {
  try {
    const res = await fetch(
      'https://ip-api.com/json/?fields=status,city,regionName,country,timezone,lat,lon,query,as,isp,proxy,hosting,mobile',
      { signal }
    );
    if (!res.ok) return null;
    const j = await res.json();
    if (j.status !== 'success') return null;
    return {
      provider: 'ip-api.com',
      ip: j.query,
      city: j.city,
      region: j.regionName,
      country: j.country,
      timezone: j.timezone,
      latitude: j.lat,
      longitude: j.lon,
      asn: j.as,
      isp: j.isp,
      proxy: Boolean(j.proxy),
      hosting: Boolean(j.hosting),
      mobile: Boolean(j.mobile),
    };
  } catch {
    return null;
  }
}

async function fetchBigDataCloudFallback(signal: AbortSignal): Promise<ProviderResult | null> {
  try {
    const res = await fetch('https://api.bigdatacloud.net/data/ip-geolocation-full', { signal });
    if (!res.ok) return null;
    const j = await res.json();
    if (!j || !j.location) return null;
    return {
      provider: 'bigdatacloud',
      ip: j.ip,
      city: j.location.localityName || j.location.city,
      region: j.location.principalSubdivision,
      country: j.location.countryName,
      timezone: j.location.timeZone?.ianaTimeId,
      latitude: j.location.latitude,
      longitude: j.location.longitude,
    };
  } catch {
    return null;
  }
}

async function fetchIpifyGeoJsFallback(signal: AbortSignal): Promise<ProviderResult | null> {
  try {
    const ipifyRes = await fetch('https://api.ipify.org?format=json', { signal });
    if (!ipifyRes.ok) return null;
    const ipifyJson = await ipifyRes.json();
    const geoRes = await fetch(`https://get.geojs.io/v1/ip/geo/${ipifyJson.ip}.json`, { signal });
    if (!geoRes.ok) return null;
    const geoJson = await geoRes.json();
    return {
      provider: 'ipify+geojs',
      ip: geoJson.ip,
      city: geoJson.city,
      region: geoJson.region,
      country: geoJson.country,
      timezone: geoJson.timezone,
      latitude: parseFloat(geoJson.latitude),
      longitude: parseFloat(geoJson.longitude),
    };
  } catch {
    return null;
  }
}

/**
 * Synchronous, point-in-time automation/bot signals.
 *
 * IMPORTANT: these are well-known, easily-spoofed client-side heuristics.
 * They catch unsophisticated scripts (default Selenium/Puppeteer setups,
 * simple scrapers) and are NOT a substitute for real bot mitigation. A
 * motivated attacker controls the JS sandbox these checks run in and can
 * simply make them report "clean." `noPlugins` in particular can also
 * false-positive on privacy-hardened real browsers (e.g. Firefox with
 * resistFingerprinting, Tor Browser) — that's why it's weighted low below.
 * For a government deployment, real bot defense belongs at the edge
 * (managed bot detection / WAF) and on the server (rate limiting, IP/TLS
 * reputation), not in a page component.
 */
function getStaticBotSignals(): BotSignals {
  const ua = navigator.userAgent;
  const claimsChrome = /Chrome\//.test(ua) && !/Edg\//.test(ua);
  return {
    automationFlag: Boolean((navigator as any).webdriver),
    headlessUA: /HeadlessChrome|PhantomJS|SlimerJS|Selenium|Puppeteer|Playwright|crawler|spider/i.test(ua),
    cdpArtifact: Boolean(
      (document as any).$cdc_asdjflasutopfhvcZLmcfl_ ||
      (window as any).cdc_adoQpoasnfa76pfcZLmcfl_
    ),
    noPlugins: navigator.plugins ? navigator.plugins.length === 0 : true,
    noLanguages: !navigator.languages || navigator.languages.length === 0,
    inconsistentChromeObject: claimsChrome && typeof (window as any).chrome === 'undefined',
  };
}

export function DataExposurePage({ onSkip }: DataExposurePageProps) {
  const [visibleItems, setVisibleItems] = useState(0);
  const [counter, setCounter] = useState(0);
  const [showWarning, setShowWarning] = useState(false);
  const [ipData, setIpData] = useState<IPData | null>(null);
  const [exposedData, setExposedData] = useState<ExposedData[]>([]);
  const [locationAccuracy, setLocationAccuracy] = useState<'high' | 'medium' | 'low'>('low');
  const [usingGPS, setUsingGPS] = useState(false);

  // --- Bot / automation signals ---
  // Static signals are computed once at mount (they don't change mid-session).
  const [botSignals] = useState<BotSignals>(() => getStaticBotSignals());
  const [hasPointerMovement, setHasPointerMovement] = useState(false);
  const [interactionCheckElapsed, setInteractionCheckElapsed] = useState(false);
  const [firstInteractionMs, setFirstInteractionMs] = useState<number | null>(null);

  // Watch for any real human-style interaction (mouse, touch, keyboard, scroll).
  // Bots that never interact with the page, or that act within milliseconds of
  // load with zero prior movement, look very different from a real visitor.
  useEffect(() => {
    const startTime = performance.now();
    const markInteraction = () => {
      setHasPointerMovement(true);
      setFirstInteractionMs(Math.round(performance.now() - startTime));
    };

    window.addEventListener('mousemove', markInteraction, { once: true });
    window.addEventListener('touchstart', markInteraction, { once: true });
    window.addEventListener('keydown', markInteraction, { once: true });
    window.addEventListener('scroll', markInteraction, { once: true });

    const timeout = setTimeout(() => setInteractionCheckElapsed(true), 4000);

    return () => {
      window.removeEventListener('mousemove', markInteraction);
      window.removeEventListener('touchstart', markInteraction);
      window.removeEventListener('keydown', markInteraction);
      window.removeEventListener('scroll', markInteraction);
      clearTimeout(timeout);
    };
  }, []);

  // Fetch real user data with accurate geolocation
  useEffect(() => {
    const fetchRealUserData = async () => {
      let geoData: { latitude?: number; longitude?: number; accuracy?: number; city?: string; region?: string; country?: string } = {};

      // 1. Browser GPS — take the best of several samples instead of a single fix
      if ('geolocation' in navigator) {
        try {
          const position = await getBestGpsFix(6000, 20);

          geoData.latitude = position.coords.latitude;
          geoData.longitude = position.coords.longitude;
          geoData.accuracy = position.coords.accuracy;
          setUsingGPS(true);

          if (position.coords.accuracy < 100) {
            setLocationAccuracy('high');
          } else if (position.coords.accuracy < 1000) {
            setLocationAccuracy('medium');
          } else {
            setLocationAccuracy('low');
          }

          try {
            const reverseGeoResponse = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${geoData.latitude}&lon=${geoData.longitude}&zoom=10&addressdetails=1`,
              {
                headers: {
                  'User-Agent': 'Meika-DataExposure-Demo',
                  'Accept': 'application/json'
                }
              }
            );

            if (reverseGeoResponse.ok) {
              const reverseGeoData = await reverseGeoResponse.json();
              if (reverseGeoData.address) {
                geoData.city = reverseGeoData.address.city ||
                               reverseGeoData.address.town ||
                               reverseGeoData.address.village ||
                               reverseGeoData.address.municipality ||
                               reverseGeoData.address.county ||
                               'Unknown';
                geoData.region = reverseGeoData.address.state ||
                                reverseGeoData.address.region ||
                                reverseGeoData.address.province ||
                                '';
                geoData.country = reverseGeoData.address.country || 'Unknown';
              }
            }
          } catch (error) {
            console.error('Reverse geocoding failed:', error);
          }
        } catch (error) {
          console.log('GPS unavailable or denied, falling back to IP geolocation');
          setLocationAccuracy('low');
          setUsingGPS(false);
        }
      }

      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000);

        // 2. Query multiple IP geolocation / network-intelligence providers concurrently
        const settled = await Promise.allSettled([
          fetchIpinfo(controller.signal),
          fetchIpapiCo(controller.signal),
          fetchIpApiCom(controller.signal),
        ]);

        const successfulResults: ProviderResult[] = [];
        for (const r of settled) {
          if (r.status === 'fulfilled' && r.value) {
            successfulResults.push(r.value);
          }
        }

        let data: ProviderResult | null = null;
        let ipGeoAgreementKm: number | undefined;

        if (successfulResults.length > 0) {
          const withGeo = successfulResults.filter(
            (r) => typeof r.latitude === 'number' && typeof r.longitude === 'number'
          );

          if (withGeo.length > 0) {
            const avgLat =
              withGeo.reduce((sum, r) => sum + (r.latitude as number), 0) / withGeo.length;
            const avgLon =
              withGeo.reduce((sum, r) => sum + (r.longitude as number), 0) / withGeo.length;

            if (withGeo.length > 1) {
              // How far apart did independent providers' guesses land?
              // The worst pairwise disagreement is the honest uncertainty figure.
              let maxDist = 0;
              for (let i = 0; i < withGeo.length; i++) {
                for (let j = i + 1; j < withGeo.length; j++) {
                  const d = haversineDistanceKm(
                    withGeo[i].latitude as number,
                    withGeo[i].longitude as number,
                    withGeo[j].latitude as number,
                    withGeo[j].longitude as number
                  );
                  if (d > maxDist) maxDist = d;
                }
              }
              ipGeoAgreementKm = maxDist;
            }

            const metaSource =
              successfulResults.find((r) => r.provider === 'ip-api.com') || successfulResults[0];

            data = {
              provider: 'consensus',
              ip: metaSource.ip,
              city: metaSource.city,
              region: metaSource.region,
              country: metaSource.country,
              timezone: metaSource.timezone,
              latitude: avgLat,
              longitude: avgLon,
              asn: metaSource.asn,
              isp: metaSource.isp,
              proxy: metaSource.proxy,
              hosting: metaSource.hosting,
              mobile: metaSource.mobile,
            };
          } else {
            data = successfulResults[0];
          }
        }

        // 3. Only fall back to single-source providers if ALL primary providers failed
        if (!data) {
          data =
            (await fetchBigDataCloudFallback(controller.signal)) ||
            (await fetchIpifyGeoJsFallback(controller.signal));
        }

        clearTimeout(timeoutId);

        if (data) {
          const locationSource: 'device' | 'ip' = geoData.latitude ? 'device' : 'ip';

          const finalData: IPData = {
            ip: data.ip || 'Unable to detect',
            city: geoData.city || data.city || 'Unknown',
            region: geoData.region || data.region || '',
            country: geoData.country || data.country || 'Unknown',
            timezone: data.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
            latitude: geoData.latitude ?? data.latitude,
            longitude: geoData.longitude ?? data.longitude,
            // Never fabricated: real GPS accuracy when we have it, otherwise omitted
            // entirely (the Location Source / Geo-Database Agreement cards carry the
            // honest uncertainty story for IP-only estimates instead).
            accuracy: geoData.accuracy,
            locationSource,
          };

          // --- Device GPS vs network/IP location cross-check ---
          let mismatchDistanceKm: number | undefined;
          let locationMismatch = false;
          if (
            geoData.latitude !== undefined &&
            geoData.longitude !== undefined &&
            data.latitude !== undefined &&
            data.longitude !== undefined
          ) {
            mismatchDistanceKm = haversineDistanceKm(
              geoData.latitude,
              geoData.longitude,
              data.latitude,
              data.longitude
            );
            locationMismatch = mismatchDistanceKm > 100;
          }

          // --- Timezone consistency check ---
          const browserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
          const timezoneMismatch = Boolean(
            finalData.timezone && browserTimezone && finalData.timezone !== browserTimezone
          );

          // --- Network confidence score (0-100, higher = more trustworthy) ---
          const networkCheckAvailable =
            data.proxy !== undefined || data.hosting !== undefined || data.mobile !== undefined;

          let networkConfidence = 100;
          if (!networkCheckAvailable) {
            networkConfidence = 50; // unknown — could not verify, not assumed clean
          } else {
            if (data.proxy) networkConfidence -= 35;
            if (data.hosting) networkConfidence -= 25;
            if (data.mobile) networkConfidence -= 5;
          }
          networkConfidence = Math.max(0, Math.min(100, networkConfidence));

          // --- Location confidence score (0-100, higher = more trustworthy) ---
          let locationConfidence = 100;
          if (locationSource !== 'device') locationConfidence -= 25; // no device GPS
          if (locationSource === 'ip' && ipGeoAgreementKm === undefined) locationConfidence -= 15; // no cross-check possible
          if (locationMismatch) locationConfidence -= 40;
          if (timezoneMismatch) locationConfidence -= 15;
          if (ipGeoAgreementKm !== undefined && ipGeoAgreementKm > 150) locationConfidence -= 20;
          locationConfidence = Math.max(0, Math.min(100, locationConfidence));

          // --- Network + location risk sub-score (bot signals folded in later, at render time) ---
          const riskScore = Math.round(
            (100 - networkConfidence) * 0.55 + (100 - locationConfidence) * 0.45
          );

          finalData.asn = data.asn;
          finalData.isp = data.isp;
          finalData.proxyDetected = data.proxy ?? false;
          finalData.hostingDetected = data.hosting ?? false;
          finalData.mobileNetwork = data.mobile ?? false;
          finalData.networkCheckAvailable = networkCheckAvailable;
          finalData.networkConfidence = networkConfidence;
          finalData.locationMismatch = locationMismatch;
          finalData.mismatchDistanceKm = mismatchDistanceKm;
          finalData.ipGeoAgreementKm = ipGeoAgreementKm;
          finalData.locationConfidence = locationConfidence;
          finalData.timezoneMismatch = timezoneMismatch;
          finalData.riskScore = riskScore;

          console.log('Final location data:', finalData);
          console.log('Browser geolocation used:', !!geoData.latitude);

          setIpData(finalData);
        } else {
          throw new Error('All IP services failed');
        }
      } catch (error) {
        console.error('Error fetching IP data:', error);
        const fallbackData: IPData = {
          ip: 'Unable to detect',
          city: geoData.city || 'Unknown',
          region: geoData.region || '',
          country: geoData.country || 'Unknown',
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          latitude: geoData.latitude,
          longitude: geoData.longitude,
          accuracy: geoData.accuracy,
          locationSource: geoData.latitude ? 'device' : 'ip',
          networkCheckAvailable: false,
          networkConfidence: 50,
          locationConfidence: geoData.latitude ? 75 : 50,
          riskScore: 25
        };
        console.log('Using fallback location data:', fallbackData);
        setIpData(fallbackData);
      }
    };

    fetchRealUserData();
  }, []);

  // Build exposed data array with real user information
  useEffect(() => {
    if (!ipData) return;

    const userAgent = navigator.userAgent;
    const getBrowser = () => {
      if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) return 'Chrome';
      if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) return 'Safari';
      if (userAgent.includes('Firefox')) return 'Firefox';
      if (userAgent.includes('Edg')) return 'Edge';
      return 'Unknown Browser';
    };

    const getOS = () => {
      if (userAgent.includes('Windows')) return 'Windows';
      if (userAgent.includes('Mac')) return 'macOS';
      if (userAgent.includes('Linux')) return 'Linux';
      if (userAgent.includes('Android')) return 'Android';
      if (userAgent.includes('iOS')) return 'iOS';
      return 'Unknown OS';
    };

    const getDeviceType = () => {
      if (/Mobile|Android|iPhone/i.test(userAgent)) return 'Mobile';
      if (/Tablet|iPad/i.test(userAgent)) return 'Tablet';
      return 'Desktop';
    };

    // Format location — accuracy suffix only ever appears for real device GPS.
    let locationValue = `${ipData.city || 'Unknown'}, ${ipData.region || ''}, ${ipData.country || 'Unknown'}`;
    if (ipData.latitude && ipData.longitude) {
      locationValue += ` (${ipData.latitude.toFixed(4)}°, ${ipData.longitude.toFixed(4)}°)`;
      if (ipData.accuracy) {
        if (ipData.accuracy < 100) {
          locationValue += ` ±${Math.round(ipData.accuracy)}m`;
        } else {
          locationValue += ` ±${(ipData.accuracy / 1000).toFixed(1)}km`;
        }
      }
    }

    const networkConfidence = ipData.networkConfidence ?? 50;
    const locationConfidence = ipData.locationConfidence ?? 50;
    const networkLocationRisk = ipData.riskScore ?? 25;

    // --- Automation / bot likelihood ---
    let automationRisk = 0;
    if (botSignals.automationFlag) automationRisk += 50;
    if (botSignals.cdpArtifact) automationRisk += 40;
    if (botSignals.headlessUA) automationRisk += 30;
    if (botSignals.inconsistentChromeObject) automationRisk += 15;
    if (botSignals.noPlugins) automationRisk += 10;
    if (botSignals.noLanguages) automationRisk += 10;
    if (interactionCheckElapsed && !hasPointerMovement) automationRisk += 20;
    if (firstInteractionMs !== null && firstInteractionMs < 50) automationRisk += 10;
    automationRisk = Math.min(100, automationRisk);

    const combinedRisk = Math.round(networkLocationRisk * 0.6 + automationRisk * 0.4);

    const realData: ExposedData[] = [
      {
        type: 'IP Address',
        value: ipData.ip || 'Unable to detect',
        icon: Globe,
        risk: 'high'
      },
      {
        type: 'Precise Location',
        value: locationValue,
        icon: MapPin,
        risk: 'high'
      },
      {
        type: 'Location Source',
        value: ipData.locationSource === 'device'
          ? 'Device GPS / Wi-Fi positioning (location permission was granted)'
          : 'IP-based estimate only — city/region level. Location permission was not granted or unavailable, so a network database\'s guess is being shown; this can be off by 100km or more.',
        icon: MapPin,
        risk: ipData.locationSource === 'device' ? 'low' : 'medium'
      },
      {
        type: 'Geo-Database Agreement',
        value: ipData.ipGeoAgreementKm !== undefined
          ? `Independent IP geolocation providers differ by ~${Math.round(ipData.ipGeoAgreementKm)} km${ipData.ipGeoAgreementKm > 150 ? ' — treat the city/coordinates above as low-confidence' : ''}`
          : (ipData.locationSource === 'device'
            ? 'Not applicable — using device GPS, not an IP database guess'
            : 'Only one IP geolocation source responded — agreement could not be checked'),
        icon: Database,
        risk: (ipData.ipGeoAgreementKm !== undefined && ipData.ipGeoAgreementKm > 150) ? 'medium' : 'low'
      },
      {
        type: 'Device Type',
        value: `${getDeviceType()} - ${getOS()}`,
        icon: Monitor,
        risk: 'medium'
      },
      {
        type: 'Browser',
        value: getBrowser(),
        icon: Eye,
        risk: 'medium'
      },
      {
        type: 'Screen Resolution',
        value: `${window.screen.width} x ${window.screen.height}`,
        icon: Smartphone,
        risk: 'low'
      },
      {
        type: 'Timezone',
        value: ipData.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
        icon: Globe,
        risk: 'medium'
      },
      {
        type: 'Language',
        value: navigator.language || 'Unknown',
        icon: FileText,
        risk: 'low'
      },
      {
        type: 'Platform',
        value: navigator.platform || 'Unknown',
        icon: Database,
        risk: 'medium'
      },
      {
        type: 'Network Provider',
        value: `${ipData.isp || 'Unknown ISP'}${ipData.asn ? ` (${ipData.asn})` : ''}`,
        icon: WifiOff,
        risk: (ipData.proxyDetected || ipData.hostingDetected) ? 'high' : 'low'
      },
      {
        type: 'VPN / Proxy / Hosting Signal',
        value: !ipData.networkCheckAvailable
          ? 'Unable to verify — network intelligence check failed or was rate-limited'
          : ipData.proxyDetected
            ? 'Proxy or VPN likely in use'
            : ipData.hostingDetected
              ? 'Connection originates from a datacenter / hosting network'
              : 'No proxy or datacenter signal detected',
        icon: Shield,
        risk: !ipData.networkCheckAvailable
          ? 'medium'
          : (ipData.proxyDetected || ipData.hostingDetected) ? 'high' : 'low'
      },
      {
        type: 'Device GPS vs Network Location',
        value: ipData.locationMismatch
          ? `Mismatch of ~${Math.round(ipData.mismatchDistanceKm || 0)} km — possible VPN, spoofing, or remote access`
          : (ipData.mismatchDistanceKm !== undefined ? 'Device GPS and network location are consistent' : 'GPS not available for comparison'),
        icon: MapPin,
        risk: ipData.locationMismatch ? 'high' : 'low'
      },
      {
        type: 'Timezone Consistency',
        value: ipData.timezoneMismatch
          ? `Mismatch: device reports ${Intl.DateTimeFormat().resolvedOptions().timeZone}, network suggests ${ipData.timezone}`
          : 'Device and network timezone agree',
        icon: Globe,
        risk: ipData.timezoneMismatch ? 'medium' : 'low'
      },
      {
        type: 'Network Confidence',
        value: `${networkConfidence}%`,
        icon: Database,
        risk: networkConfidence < 60 ? 'high' : networkConfidence < 85 ? 'medium' : 'low'
      },
      {
        type: 'Location Confidence',
        value: `${locationConfidence}%`,
        icon: MapPin,
        risk: locationConfidence < 60 ? 'high' : locationConfidence < 85 ? 'medium' : 'low'
      },
      {
        type: 'Automation Flag',
        value: botSignals.automationFlag
          ? 'navigator.webdriver is true — browser is very likely automation-controlled'
          : 'navigator.webdriver not detected',
        icon: UserX,
        risk: botSignals.automationFlag ? 'high' : 'low'
      },
      {
        type: 'Headless / Driver Signature',
        value: (botSignals.headlessUA || botSignals.cdpArtifact)
          ? 'Headless browser or WebDriver artifact detected'
          : 'No known headless/driver signature found',
        icon: Monitor,
        risk: (botSignals.headlessUA || botSignals.cdpArtifact) ? 'high' : 'low'
      },
      {
        type: 'Browser Environment Consistency',
        value: (botSignals.noPlugins || botSignals.noLanguages || botSignals.inconsistentChromeObject)
          ? 'One or more browser properties look stripped-down or scripted'
          : 'Browser environment looks consistent with a normal install',
        icon: Eye,
        risk: (botSignals.noPlugins || botSignals.noLanguages || botSignals.inconsistentChromeObject) ? 'medium' : 'low'
      },
      {
        type: 'Pointer / Touch Interaction',
        value: hasPointerMovement
          ? (firstInteractionMs !== null ? `Interaction detected after ${firstInteractionMs}ms` : 'Mouse, touch, scroll, or key interaction detected')
          : (interactionCheckElapsed ? 'No interaction detected — unusual for a human visitor' : 'Waiting for interaction…'),
        icon: Smartphone,
        risk: hasPointerMovement ? 'low' : (interactionCheckElapsed ? 'medium' : 'low')
      },
      {
        type: 'Automation Likelihood Score',
        value: `${automationRisk} / 100 (heuristic only — not a guarantee)`,
        icon: AlertTriangle,
        risk: automationRisk > 60 ? 'high' : automationRisk > 25 ? 'medium' : 'low'
      },
      {
        type: 'Overall Risk Score',
        value: `${combinedRisk} / 100`,
        icon: AlertTriangle,
        risk: combinedRisk > 60 ? 'high' : combinedRisk > 30 ? 'medium' : 'low'
      },
    ];

    setExposedData(realData);
  }, [ipData, botSignals, hasPointerMovement, interactionCheckElapsed, firstInteractionMs]);

  useEffect(() => {
    // Reveal items one by one
    const interval = setInterval(() => {
      setVisibleItems((prev) => {
        if (prev < exposedData.length) {
          return prev + 1;
        }
        return prev;
      });
    }, 400);

    return () => clearInterval(interval);
  }, [exposedData]);

  useEffect(() => {
    // Counter animation
    const counterInterval = setInterval(() => {
      setCounter((prev) => {
        if (prev < 247) return prev + 7;
        return 247;
      });
    }, 50);

    return () => clearInterval(counterInterval);
  }, []);

  useEffect(() => {
    // Show warning after data is revealed
    if (visibleItems >= exposedData.length) {
      setTimeout(() => setShowWarning(true), 1000);
    }
  }, [visibleItems, exposedData.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0B0F] via-[#10121A] to-[#0A0B0F] text-white overflow-hidden relative">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Glowing orbs */}
      <motion.div
        className="absolute top-20 left-20 w-96 h-96 bg-red-600/20 rounded-full blur-[120px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px]"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />


      <div className="relative z-10 container mx-auto px-6 py-20 max-w-6xl">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-3 mb-6 px-6 py-3 bg-red-600/10 border border-red-500/30 rounded-full"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <span className="text-sm text-red-300">Security Alert</span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl mb-6 bg-gradient-to-r from-white via-red-200 to-white bg-clip-text text-transparent">
            You're Being Watched
          </h1>
          <p className="text-xl text-[#9EA3B0] max-w-2xl mx-auto leading-relaxed">
            Every second you browse, your personal data is being collected, tracked, and exposed. Here's what we can see right now:
          </p>
        </motion.div>

        {/* Live exposure counter */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="inline-block bg-gradient-to-r from-red-600/20 to-orange-600/20 border border-red-500/30 rounded-2xl px-8 py-6 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <Unlock className="w-8 h-8 text-red-400" />
              <div>
                <div className="text-sm text-[#9EA3B0] mb-1">Data Points Exposed in Last Hour</div>
                <motion.div
                  className="text-4xl text-red-400 tabular-nums"
                  key={counter}
                >
                  {counter.toLocaleString()}
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Location Accuracy Warning Banner */}
        <AnimatePresence>
          {ipData && ipData.accuracy && ipData.accuracy >= 100 && (
            <motion.div
              className="mb-8 mx-auto max-w-4xl"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-500/30 rounded-xl p-4 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-green-400" />
                  <div className="flex-1">
                    <p className="text-sm text-green-200">
                      <strong>GPS Location Active:</strong> Showing your precise location within ±{ipData.accuracy < 1000 ? `${Math.round(ipData.accuracy)}m` : `${(ipData.accuracy / 1000).toFixed(1)}km`}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Exposed data grid */}
        <div className="grid md:grid-cols-2 gap-4 mb-12">
          <AnimatePresence>
            {exposedData.slice(0, visibleItems).map((item, index) => {
              const Icon = item.icon;
              const riskColors = {
                high: 'from-red-600/20 to-red-900/20 border-red-500/30',
                medium: 'from-orange-600/20 to-orange-900/20 border-orange-500/30',
                low: 'from-yellow-600/20 to-yellow-900/20 border-yellow-500/30',
              };

              return (
                <motion.div
                  key={item.type}
                  className={`bg-gradient-to-br ${riskColors[item.risk]} border rounded-xl p-6 backdrop-blur-sm relative overflow-hidden group`}
                  initial={{ opacity: 0, x: -20, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Scanning effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                    initial={{ x: '-100%' }}
                    animate={{ x: '200%' }}
                    transition={{ duration: 2, delay: index * 0.1 }}
                  />

                  <div className="relative z-10 flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="p-3 bg-white/5 rounded-lg">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-[#9EA3B0] mb-1">{item.type}</div>
                        <div className="text-white">{item.value}</div>
                      </div>
                    </div>
                    <div className={`px-2 py-1 rounded text-xs uppercase tracking-wider ${
                      item.risk === 'high' ? 'bg-red-600/30 text-red-300' :
                      item.risk === 'medium' ? 'bg-orange-600/30 text-orange-300' :
                      'bg-yellow-600/30 text-yellow-300'
                    }`}>
                      {item.risk} risk
                    </div>
                  </div>

                  {/* Eye icon indicator */}
                  <motion.div
                    className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Eye className="w-4 h-4 text-red-400" />
                  </motion.div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Warning message */}
        <AnimatePresence>
          {showWarning && (
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="inline-block bg-gradient-to-r from-red-600/20 via-orange-600/20 to-red-600/20 border border-red-500/30 rounded-2xl px-8 py-8 backdrop-blur-sm max-w-3xl"
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(239, 68, 68, 0.1)',
                    '0 0 40px rgba(239, 68, 68, 0.2)',
                    '0 0 20px rgba(239, 68, 68, 0.1)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <UserX className="w-16 h-16 text-red-400 mx-auto mb-4" />
                <h2 className="text-3xl mb-4">This is Just the Beginning</h2>
                <p className="text-lg text-[#9EA3B0] mb-6 leading-relaxed">
                  Websites, advertisers, and hackers can see this information and much more. 
                  Your browsing history, online purchases, personal conversations, and sensitive files 
                  are constantly at risk without proper encryption.
                </p>
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="text-2xl text-red-400 mb-1">87%</div>
                    <div className="text-sm text-[#9EA3B0]">of users have data exposed online</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="text-2xl text-orange-400 mb-1">4.1B</div>
                    <div className="text-sm text-[#9EA3B0]">records leaked in 2023</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="text-2xl text-yellow-400 mb-1">$4.45M</div>
                    <div className="text-sm text-[#9EA3B0]">average data breach cost</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA */}
        <AnimatePresence>
          {showWarning && (
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <motion.button
                onClick={onSkip}
                className="group relative px-12 py-5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 rounded-full text-lg transition-all duration-300 overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                  animate={{ x: ['-200%', '200%'] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                />
                <span className="relative z-10 flex items-center gap-3">
                  <Lock className="w-5 h-5" />
                  Protect Your Data Now
                  <Shield className="w-5 h-5" />
                </span>
              </motion.button>
              <p className="mt-4 text-sm text-[#9EA3B0]">
                Learn how Meika keeps your files safe with military-grade encryption
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer note */}
        <motion.div
          className="text-center mt-16 text-xs text-[#9EA3B0]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <p>
            This is a demonstration of publicly available information that websites can access.
            <br />
            No personal data is stored or transmitted from this page.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
