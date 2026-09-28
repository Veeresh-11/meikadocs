# 🐕 How to Upload Ira - Your 3D Dog Model

## Quick Start

Your SecureDocs website now features Ira, an interactive 3D dog helper positioned in the **bottom-right corner**. Currently showing a placeholder. Follow these steps to add your actual 3D model.

---

## What Ira Does

✅ **Positioned on the right side** of the screen  
✅ **Clickable** - Opens an AI helper chatbot dialog  
✅ **Mouse tracking** - Rotates to follow cursor  
✅ **Animations** - Cycles between idle/sitting poses  
✅ **Always accessible** via floating button when dialog is closed  
✅ **Smart responses** - Answers questions about features, pricing, security, etc.

---

## Step 1: Prepare Your 3D Model

### Required Format
- **.glb** file (recommended) OR **.gltf** with textures
- File size: Under 5MB for best performance

### Required Animations
Your model should include these animation clips:
- `idle` - Standing/breathing animation (loops)
- `sit` - Sitting pose (loops)
- `shake` - Handshake/paw wave (plays once)
- `walk` OR `slide` - Walking motion (optional)

### Model Specifications
- **Polygon count**: 5,000 - 20,000 triangles
- **Textures**: Embed in .glb OR include separately
- **Rigging**: Simple skeleton with 8-15 bones
- **Orientation**: Dog should face forward (positive Z-axis)

---

## Step 2: Upload Your Model

### Option A: Local Upload (Development)

1. Create a folder in your project root:
   ```
   /public/models/
   ```

2. Place your dog model there:
   ```
   /public/models/ira-dog.glb
   ```

3. The component will automatically load it!

### Option B: External Hosting (Production)

1. Upload your `.glb` file to a CDN:
   - **Cloudinary**: https://cloudinary.com
   - **GitHub**: Upload to a repo and use raw URL
   - **Vercel Blob**: https://vercel.com/storage/blob
   - **AWS S3**: Public bucket with CORS enabled

2. Update the model URL in `/components/Dog3D.tsx`:
   ```typescript
   modelUrl = 'https://your-cdn.com/ira-dog.glb'
   ```

---

## Step 3: Adjust Model Settings

After uploading, you may need to tweak these settings in `/components/Dog3D.tsx`:

### Scale (if dog is too big/small)
```typescript
<group 
  scale={[1.5, 1.5, 1.5]}  // Make bigger
  // OR
  scale={[0.5, 0.5, 0.5]}  // Make smaller
>
```

### Position (if dog is off-center)
```typescript
<group 
  position={[0, -2, 0]}  // Move down
  position={[0, 0, 0]}   // Center
  position={[1, 0, 0]}   // Move right
>
```

### Rotation (if facing wrong direction)
```typescript
<group 
  rotation={[0, Math.PI, 0]}  // Rotate 180°
>
```

---

## Step 4: Test Interactions

Once uploaded, test these features:

✅ **Click Ira** → Should trigger handshake animation  
✅ **Move mouse** → Ira should rotate to follow  
✅ **Wait 4 seconds** → Should cycle between idle/sit  
✅ **Page navigation** → Ira visible on all pages except Pricing  

---

## Animation Name Mapping

If your animations have different names, update in `/components/Dog3D.tsx`:

```typescript
switch (animation) {
  case 'shake':
    actions['your_shake_animation_name']?.play();
    break;
  case 'sit':
    actions['your_sit_animation_name']?.play();
    break;
  case 'idle':
    actions['your_idle_animation_name']?.play();
    break;
}
```

To see available animation names:
```typescript
console.log('Available animations:', names);
```

---

## Texture Application

Your uploaded texture (`909dd416...png`) will be applied if:

1. **Embedded in .glb** → Works automatically ✅
2. **Separate texture file** → Upload texture too:
   ```typescript
   import dogTexture from 'figma:asset/909dd41...png';
   const texture = useTexture(dogTexture);
   ```

---

## Common Issues & Fixes

### ❌ Model doesn't appear
- Check browser console for errors
- Verify file path is correct
- Ensure CORS is enabled (for external URLs)
- Try smaller file size (< 2MB)

### ❌ Model is black/no texture
```typescript
// Add this to your material in the model:
<meshStandardMaterial roughness={0.8} metalness={0.2} />
```

### ❌ Animations don't play
- Verify animation names match exactly
- Check that animations are exported in the .glb
- Use glTF Viewer to inspect: https://gltf-viewer.donmccurdy.com/

### ❌ Model is too slow to load
- Compress textures (use 1024x1024 max)
- Reduce polygon count
- Use Draco compression in .glb export

---

## Recommended Tools

### For 3D Modeling
- **Blender** (Free) - https://blender.org
- **Maya** (Paid)
- **3ds Max** (Paid)

### For Testing .glb Files
- **glTF Viewer** - https://gltf-viewer.donmccurdy.com/
- **Three.js Editor** - https://threejs.org/editor/

### For Compression
- **glTF-Pipeline** - Optimize file size
- **Draco Compression** - Reduce geometry size

---

## Example Model Export (Blender)

1. Select your rigged dog model
2. File → Export → glTF 2.0 (.glb)
3. Enable these options:
   - ✅ Include: Selected Objects
   - ✅ Include: Animations
   - ✅ Compression: Draco
   - ✅ Format: glTF Binary (.glb)
   - ✅ Include: Punctual Lights (if needed)
4. Export to `/public/models/ira-dog.glb`

---

## Current Status

- ✅ 3D Scene configured with lights
- ✅ Animation system ready
- ✅ Mouse interaction enabled
- ✅ Click handlers active
- ✅ Placeholder displayed
- 📦 **Waiting for your .glb model upload**

---

## Need Help?

If you encounter issues:
1. Check the browser console for errors
2. Verify your model works in glTF Viewer
3. Try the placeholder first to confirm scene works
4. Share error messages for debugging

**Once you upload your model, Ira will come to life! 🐕✨**