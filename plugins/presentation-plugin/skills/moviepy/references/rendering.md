# Rendering Clips

## Write Video File

```python
# Basic render (codec auto-detected from extension)
clip.write_videofile("output.mp4")

# Common formats
clip.write_videofile("output.webm")
clip.write_videofile("output.ogv")
clip.write_videofile("output.avi")

# With options
clip.write_videofile(
    "output.mp4",
    fps=24,
    codec="libx264",           # Video codec
    audio_codec="aac",         # Audio codec
    bitrate="8000k",           # Video bitrate
    audio_bitrate="192k",      # Audio bitrate
    threads=4,                 # Parallel threads
    preset="medium",           # Encoding speed/quality tradeoff
    logger=None                # Disable progress bar
)
```

## Presets (libx264)

| Preset | Speed | Quality |
|--------|-------|---------|
| `ultrafast` | Fastest | Lowest |
| `fast` | Fast | Lower |
| `medium` | Balanced | Balanced |
| `slow` | Slow | Higher |
| `veryslow` | Slowest | Highest |

## Write GIF

```python
clip.write_gif("output.gif")

# With options
clip.write_gif(
    "output.gif",
    fps=15,
    loop=0                     # 0 = infinite loop
)
```

## Save Single Frame

```python
# Save frame at specific time
clip.save_frame("frame.png", t=5)          # At 5 seconds
clip.save_frame("frame.jpg", t="00:00:10") # At 10 seconds
```

## Export Image Sequence

```python
# Export all frames
clip.write_images_sequence(
    "frames/frame%04d.png",    # frame0001.png, frame0002.png, ...
    fps=24
)
```

## Write Audio

```python
# Audio from video clip
clip.audio.write_audiofile("audio.mp3")

# Audio clip directly
audio_clip.write_audiofile(
    "output.mp3",
    fps=44100,
    bitrate="192k"
)
```

## Preview (requires ffplay)

```python
# Preview video
clip.preview()
clip.preview(fps=15)           # Lower fps for slow machines

# Preview portion
clip.subclipped(0, 10).preview()

# Show single frame
clip.show(t=5)                 # Show frame at 5s

# Jupyter notebook
clip.display_in_notebook()
clip.display_in_notebook(t=5)  # Show frame
```

## Close Clips

```python
# Free resources when done
clip.close()

# Or use context manager
with VideoFileClip("video.mp4") as clip:
    clip.write_videofile("output.mp4")
```
