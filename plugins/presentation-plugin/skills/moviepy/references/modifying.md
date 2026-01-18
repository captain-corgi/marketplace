# Modifying Clips

All modifications return a **copy** (out-of-place). Original clip unchanged.

## Timing Methods

```python
# Extract portion
subclip = clip.subclipped(10, 30)         # 10s to 30s
subclip = clip.subclipped("00:00:10", "00:00:30")
subclip = clip.subclipped(10, -5)         # 10s to 5s before end

# Set timing for composition
clip = clip.with_start(5)                 # Start at 5s
clip = clip.with_duration(10)             # Set duration to 10s
clip = clip.with_end(15)                  # End at 15s

# Cut out section
clip = clip.with_section_cut_out(10, 20)  # Remove 10s-20s
```

## Transform Methods

```python
# Resize
clip = clip.resized(0.5)                  # 50% size
clip = clip.resized((1280, 720))          # Exact size
clip = clip.resized(width=1280)           # Scale to width

# Crop
clip = clip.cropped(x1=100, y1=50, x2=500, y2=400)

# Rotate
clip = clip.rotated(90)                   # 90 degrees

# Position (for compositing)
clip = clip.with_position((100, 50))      # x=100, y=50
clip = clip.with_position("center")
clip = clip.with_position(("center", "bottom"))
clip = clip.with_position((0.1, 0.1), relative=True)  # 10% from edges
```

## Audio Methods

```python
clip = clip.with_audio(audio_clip)        # Set audio
clip = clip.without_audio()               # Remove audio
clip = clip.with_volume_scaled(0.5)       # 50% volume
```

## Effects (vfx / afx)

```python
from moviepy import vfx, afx

# Apply effects
clip = clip.with_effects([
    vfx.FadeIn(1),
    vfx.FadeOut(1),
    vfx.MultiplySpeed(2),                 # 2x speed
    vfx.TimeMirror(),                     # Reverse
    vfx.Margin(20, color=(0,0,0)),        # Add border
    vfx.MirrorX(),                        # Horizontal flip
    vfx.MirrorY(),                        # Vertical flip
    vfx.BlackAndWhite(),
    vfx.InvertColors(),
])

# Audio effects
clip = clip.with_effects([
    afx.AudioFadeIn(1),
    afx.AudioFadeOut(1),
    afx.MultiplyVolume(0.5),
])
```

## Shorthand (dynamically added)

```python
clip = clip.fadein(1)
clip = clip.fadeout(1)
clip = clip.multiply_speed(2)
```

## Custom Filters

```python
# Transform each frame
def invert_colors(frame):
    return 255 - frame

clip = clip.image_transform(invert_colors)

# Time transform (speed effects)
clip = clip.time_transform(lambda t: t * 2)  # 2x speed
```
