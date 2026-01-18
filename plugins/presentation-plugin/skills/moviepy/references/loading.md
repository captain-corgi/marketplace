# Loading Clips

## Video Clips

```python
from moviepy import VideoFileClip, ImageClip, TextClip, ColorClip

# Load video file (mp4, avi, mkv, mov, webm)
clip = VideoFileClip("video.mp4")

# Load image as clip
img = ImageClip("image.png")

# Create text clip (requires font path)
text = TextClip(
    text="Hello World",
    font="path/to/font.ttf",
    font_size=50,
    color="white",
    bg_color="black",
    method="caption"  # or "label"
)

# Solid color clip
color = ColorClip(size=(1920, 1080), color=(255, 0, 0))
```

## Audio Clips

```python
from moviepy import AudioFileClip

audio = AudioFileClip("audio.mp3")
```

## Image Sequence

```python
from moviepy import ImageSequenceClip

# From folder (alphanumerical order)
clip = ImageSequenceClip("frames_folder/", fps=24)

# From list of files
clip = ImageSequenceClip(["frame1.png", "frame2.png"], fps=24)
```

## Clip Properties

```python
clip.duration  # seconds
clip.fps       # frames per second
clip.size      # (width, height)
clip.w, clip.h # width, height
clip.audio     # embedded audio clip
clip.mask      # mask clip (for transparency)
```

## TextClip Parameters

| Parameter | Description |
|-----------|-------------|
| `text` | Text content |
| `font` | Path to .ttf/.otf font |
| `font_size` | Font size in pixels |
| `color` | Text color |
| `bg_color` | Background color |
| `stroke_color` | Outline color |
| `stroke_width` | Outline width |
| `method` | `"label"` (single line) or `"caption"` (multi-line) |
| `size` | (width, height) for `"caption"` |
| `text_align` | Alignment: `"left"`, `"center"`, `"right"` |
