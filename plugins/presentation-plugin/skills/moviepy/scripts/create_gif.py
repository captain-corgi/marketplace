#!/usr/bin/env python3
"""Create GIF from video segment."""

import argparse
import sys
from pathlib import Path

try:
    from moviepy import VideoFileClip
except ImportError:
    print("Error: moviepy not installed. Run: pip install moviepy")
    sys.exit(1)


def parse_time(time_str: str) -> float | str:
    """Parse time string to float or keep as string for MoviePy."""
    if time_str.startswith("-"):
        return float(time_str)
    try:
        return float(time_str)
    except ValueError:
        return time_str


def create_gif(
    input_path: str,
    output_path: str,
    start: str = "0",
    end: str | None = None,
    fps: int = 15,
    resize: float = 1.0,
) -> None:
    """Create GIF from video segment."""
    start_time = parse_time(start)
    end_time = parse_time(end) if end else None
    
    with VideoFileClip(input_path) as clip:
        if end_time:
            subclip = clip.subclipped(start_time, end_time)
        else:
            subclip = clip.subclipped(start_time)
        
        if resize != 1.0:
            subclip = subclip.resized(resize)
        
        subclip.write_gif(output_path, fps=fps)
        print(f"Saved GIF to: {output_path}")


def main():
    parser = argparse.ArgumentParser(description="Create GIF from video")
    parser.add_argument("input", help="Input video file")
    parser.add_argument("output", help="Output GIF file")
    parser.add_argument("--start", "-s", default="0", help="Start time")
    parser.add_argument("--end", "-e", help="End time")
    parser.add_argument("--fps", type=int, default=15, help="GIF fps (default: 15)")
    parser.add_argument("--resize", "-r", type=float, default=1.0, 
                        help="Resize factor (default: 1.0)")
    
    args = parser.parse_args()
    
    if not Path(args.input).exists():
        print(f"Error: Input file not found: {args.input}")
        sys.exit(1)
    
    create_gif(args.input, args.output, args.start, args.end, args.fps, args.resize)


if __name__ == "__main__":
    main()
