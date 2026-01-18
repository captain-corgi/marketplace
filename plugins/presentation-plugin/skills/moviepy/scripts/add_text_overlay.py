#!/usr/bin/env python3
"""Add text overlay to a video."""

import argparse
import sys
from pathlib import Path

try:
    from moviepy import VideoFileClip, TextClip, CompositeVideoClip, vfx
except ImportError:
    print("Error: moviepy not installed. Run: pip install moviepy")
    sys.exit(1)


def add_text_overlay(
    input_path: str,
    output_path: str,
    text: str,
    font: str,
    font_size: int = 50,
    color: str = "white",
    position: str = "center",
    start: float = 0,
    duration: float | None = None,
    fade: float = 0.5,
) -> None:
    """Add text overlay to video."""
    with VideoFileClip(input_path) as video:
        text_clip = TextClip(
            text=text,
            font=font,
            font_size=font_size,
            color=color,
        )
        
        clip_duration = duration if duration else video.duration - start
        text_clip = (
            text_clip
            .with_start(start)
            .with_duration(clip_duration)
            .with_position(position)
        )
        
        if fade > 0:
            text_clip = text_clip.with_effects([
                vfx.FadeIn(fade),
                vfx.FadeOut(fade)
            ])
        
        final = CompositeVideoClip([video, text_clip])
        final.write_videofile(output_path)
        print(f"Saved video with text overlay to: {output_path}")


def main():
    parser = argparse.ArgumentParser(description="Add text overlay to video")
    parser.add_argument("input", help="Input video file")
    parser.add_argument("output", help="Output video file")
    parser.add_argument("--text", "-t", required=True, help="Text to overlay")
    parser.add_argument("--font", "-f", required=True, help="Path to .ttf font file")
    parser.add_argument("--font-size", type=int, default=50, help="Font size (default: 50)")
    parser.add_argument("--color", "-c", default="white", help="Text color (default: white)")
    parser.add_argument("--position", "-p", default="center", help="Position: center, top, bottom")
    parser.add_argument("--start", "-s", type=float, default=0, help="Start time in seconds")
    parser.add_argument("--duration", "-d", type=float, help="Duration in seconds")
    parser.add_argument("--fade", type=float, default=0.5, help="Fade duration (default: 0.5)")
    
    args = parser.parse_args()
    
    if not Path(args.input).exists():
        print(f"Error: Input file not found: {args.input}")
        sys.exit(1)
    
    if not Path(args.font).exists():
        print(f"Error: Font file not found: {args.font}")
        sys.exit(1)
    
    add_text_overlay(
        args.input, args.output, args.text, args.font,
        args.font_size, args.color, args.position,
        args.start, args.duration, args.fade
    )


if __name__ == "__main__":
    main()
