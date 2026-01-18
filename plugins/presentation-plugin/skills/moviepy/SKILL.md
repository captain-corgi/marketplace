---
name: moviepy
description: Video editing automation with MoviePy (Python). Use for trimming, concatenating, compositing, effects, text overlays, audio mixing, GIF creation, video rendering.
version: 1.0.0
license: MIT
---

# MoviePy Skill

Python video editing automation library. Requires FFmpeg (auto-installed via imageio).

## Installation

```bash
pip install moviepy
```

Verify: `python -c "from moviepy.config import check; check()"`

## Core Concepts

- **VideoClip**: Base for visual elements (VideoFileClip, ImageClip, TextClip, ColorClip)
- **AudioClip**: Base for audio (AudioFileClip)
- **Effects**: `vfx` (video) and `afx` (audio) modules
- **Compositing**: CompositeVideoClip, concatenate_videoclips

## Quick Reference

### Loading Clips
See [references/loading.md](references/loading.md)

### Modifying Clips
See [references/modifying.md](references/modifying.md)

### Compositing
See [references/compositing.md](references/compositing.md)

### Rendering
See [references/rendering.md](references/rendering.md)

## Common Scripts

- [scripts/trim_video.py](scripts/trim_video.py) - Extract subclip from video
- [scripts/add_text_overlay.py](scripts/add_text_overlay.py) - Add text to video
- [scripts/concat_videos.py](scripts/concat_videos.py) - Concatenate multiple videos
- [scripts/create_gif.py](scripts/create_gif.py) - Convert video segment to GIF
- [scripts/video_to_gif_speed.py](scripts/video_to_gif_speed.py) - GIF with auto-speedup for presentations
- [scripts/add_audio.py](scripts/add_audio.py) - Replace/mix audio track

## Key Methods (v2.0)

| Method | Description |
|--------|-------------|
| `subclipped(t_start, t_end)` | Extract portion |
| `with_start(t)` | Set start time in composition |
| `with_duration(d)` | Set duration |
| `with_position(pos)` | Set x,y position |
| `with_effects([...])` | Apply effects |
| `resized(factor)` | Resize clip |
| `write_videofile(path)` | Render to file |
| `write_gif(path)` | Render to GIF |

## Time Formats

- Seconds: `15.5`
- Tuple: `(1, 30)` → 1:30, `(0, 1, 30)` → 00:01:30
- String: `"00:01:30.50"`
- Negative: `-10` → 10s from end

## Resources

- [MoviePy Docs](https://zulko.github.io/moviepy/)
- [API Reference](https://zulko.github.io/moviepy/reference/index.html)
