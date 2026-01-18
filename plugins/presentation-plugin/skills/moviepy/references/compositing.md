# Compositing Clips

## Concatenate (Sequential)

```python
from moviepy import concatenate_videoclips

# Play clips one after another
final = concatenate_videoclips([clip1, clip2, clip3])

# With transition padding
final = concatenate_videoclips([clip1, clip2], padding=-1)  # 1s overlap

# With background color for different sizes
final = concatenate_videoclips([clip1, clip2], bg_color=(0,0,0))
```

## Composite (Layered)

```python
from moviepy import CompositeVideoClip

# Stack clips (later clips on top)
final = CompositeVideoClip([
    background_clip,
    overlay_clip.with_position("center"),
    text_clip.with_position(("center", "bottom"))
])

# Set explicit size
final = CompositeVideoClip([clip1, clip2], size=(1920, 1080))
```

## Positioning Clips

```python
# Absolute position (from top-left)
clip = clip.with_position((100, 50))

# Named positions
clip = clip.with_position("center")
clip = clip.with_position(("right", "bottom"))
clip = clip.with_position(("center", "top"))

# Relative (percentage)
clip = clip.with_position((0.1, 0.9), relative=True)  # 10% from left, 90% from top
```

## Timing in Composition

```python
# Set when clip appears
clip1 = clip1.with_start(0)
clip2 = clip2.with_start(5)     # Appears at 5s
clip3 = clip3.with_start(10)

# Set duration for static clips (images, text)
text = text.with_duration(3)
image = image.with_start(2).with_duration(5)

final = CompositeVideoClip([clip1, clip2, clip3])
```

## Transitions

```python
from moviepy import vfx

# Fade in/out
clip = clip.with_effects([vfx.FadeIn(1)])
clip = clip.with_effects([vfx.FadeOut(1)])

# Cross-fade (overlap clips with padding)
clip1 = clip1.with_effects([vfx.FadeOut(1)])
clip2 = clip2.with_effects([vfx.FadeIn(1)])
final = concatenate_videoclips([clip1, clip2], padding=-1)

# CrossFadeIn/Out for composition
clip2 = clip2.with_effects([vfx.CrossFadeIn(1)])
```

## Juxtapose (Side by Side)

```python
from moviepy import clips_array

# 2x2 grid
final = clips_array([
    [clip1, clip2],
    [clip3, clip4]
])
```

## Audio Compositing

```python
from moviepy import CompositeAudioClip, concatenate_audioclips

# Mix audio tracks
mixed = CompositeAudioClip([audio1, audio2.with_start(5)])

# Sequential audio
combined = concatenate_audioclips([audio1, audio2])

# Set mixed audio to video
video = video.with_audio(mixed)
```
