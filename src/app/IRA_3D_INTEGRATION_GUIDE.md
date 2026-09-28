# 🐕 Ira 3D Model Integration Guide

## Current Implementation

Right now, Ira is built using **geometric shapes** (boxes, cylinders, spheres) in React Three Fiber. This is a placeholder that demonstrates all the interactive features while you prepare your actual 3D model.

## How to Replace with Your Real 3D Model

### Step 1: Prepare Your 3D Model

You'll need your dog model in one of these formats:
- **.glb** (recommended - single file with textures embedded)
- **.gltf** (with separate texture files)

The model should include:
- **Rigged skeleton** for animations
- **Animation clips** named:
  - `idle` or `standing` - default standing pose
  - `sit` or `sitting` - sitting pose  
  - `shake` or `handshake` - paw shake animation
  - `walk` or `slide` - walking/sliding motion

### Step 2: Export Model with Textures

1. In your 3D software (Blender, Maya, etc.), apply the texture you uploaded:
   - File: `909dd416e7bc5ceaf53ad57e02c29b2ea0308a58.png`
   
2. UV map the texture to your dog model

3. Export as `.glb` with:
   - ✅ Include animations
   - ✅ Embed textures
   - ✅ Apply modifiers
   - ✅ Export selected objects only

### Step 3: Add Model to Project

Since you're in Figma Make, you have two options:

#### Option A: Use Figma Asset Import (if supported)
```typescript
import dogModel from 'figma:asset/your-dog-model.glb';
```

#### Option B: Use External URL
Host your `.glb` file on a CDN (like GitHub, Cloudinary, or any public URL):
```typescript
const MODEL_URL = 'https://your-cdn.com/models/ira-dog.glb';
```

### Step 4: Update Dog3D Component

Replace the geometric dog in `/components/Dog3D.tsx`:

```typescript
import { useGLTF, useAnimations } from '@react-three/drei';
import { useEffect, useRef } from 'react';

export function Dog3D({ onClick, mouseX = 0 }: Dog3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  
  // Load your model
  const { scene, animations } = useGLTF('/path/to/your-model.glb');
  const { actions, names } = useAnimations(animations, groupRef);

  // Play animations based on state
  useEffect(() => {
    if (animation === 'shake' && actions['shake']) {
      actions['shake']?.reset().play();
    } else if (animation === 'sit' && actions['sit']) {
      actions['sit']?.reset().fadeIn(0.5).play();
    } else if (actions['idle']) {
      actions['idle']?.reset().fadeIn(0.5).play();
    }
  }, [animation, actions]);

  return (
    <group 
      ref={groupRef}
      onClick={onClick}
      scale={[1, 1, 1]} // Adjust scale as needed
      position={[0, -1, 0]}
    >
      <primitive object={scene} />
    </group>
  );
}
```

## Texture Mapping Guide

Your uploaded texture appears to be a **UV layout sheet** with different parts:
- Head (front view) - center left
- Body parts - various sections
- Ears - top sections
- Paws - bottom sections  
- Tail - right side
- Eyes, nose - detail elements

In your 3D software:
1. Create UV islands for each body part
2. Map them to corresponding sections of the texture
3. The golden/tan fur should cover the main body
4. Black sections for nose, paw pads, eyes

## Animation Timing Reference

Based on current implementation:

| Animation | Duration | Trigger |
|-----------|----------|---------|
| Idle → Sit | 4 seconds cycle | Automatic |
| Shake | 2 seconds | On click |
| Slide | 0.5 seconds | Mouse movement |

## Recommended Model Specs

- **Polygon Count**: 5,000 - 15,000 triangles (for web performance)
- **Texture Size**: 1024x1024 or 2048x2048 max
- **File Size**: Under 2MB for best loading speed
- **Rig**: Simple bone structure (8-12 bones)

## Testing Your Model

After replacing the geometric dog:

1. **Check Loading**: Model should appear within 1-2 seconds
2. **Test Animations**: Click and watch for smooth transitions
3. **Verify Scale**: Dog should be visible but not dominate the screen
4. **Test Interactions**: Mouse tracking should work smoothly

## Troubleshooting

### Model too big/small?
Adjust the `scale` prop:
```typescript
<group scale={[0.5, 0.5, 0.5]}> // Make it smaller
```

### Animations not playing?
Check animation names:
```typescript
console.log('Available animations:', names);
```

### Model appears black?
Add lights or check material settings:
```typescript
<meshStandardMaterial roughness={0.8} metalness={0.1} />
```

### Texture not showing?
Ensure textures are embedded in .glb or loaded separately:
```typescript
const texture = useTexture('figma:asset/909dd41...png');
```

## Current Interactive Features

✅ **Implemented and working:**
- Automatic idle/sit cycling
- Click to trigger handshake
- Mouse tracking for slide animation  
- Tail wagging animation
- Smooth rotation following cursor
- Welcome message with tips
- Hidden on pricing page

🎯 **Ready for your model:**
- All animation triggers in place
- Texture system ready
- Lighting optimized for golden fur
- Camera angles set for best view

## Need Help?

If you have your 3D model ready but need help with:
- Rigging
- Animation export
- Texture baking
- File optimization

Provide your model file and I can help integrate it!

---

**Current Status**: ✅ Geometric placeholder active - ready to swap with real model
**Next Step**: Export your rigged dog model as `.glb` with animations
