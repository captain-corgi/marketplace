#!/usr/bin/env python3
"""Trim/extract a portion from a video file."""

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


def trim_video(input_path: str, output_path: str, start: str, end: str) -> None:
    """Extract a subclip from input video."""
    start_time = parse_time(start)
    end_time = parse_time(end) if end else None
    
    with VideoFileClip(input_path) as clip:
        if end_time:
            subclip = clip.subclipped(start_time, end_time)
        else:
            subclip = clip.subclipped(start_time)
        
        subclip.write_videofile(output_path)
        print(f"Saved trimmed video to: {output_path}")


def main():
    parser = argparse.ArgumentParser(description="Trim a video file")
    parser.add_argument("input", help="Input video file")
    parser.add_argument("output", help="Output video file")
    parser.add_argument("--start", "-s", default="0", help="Start time (seconds or HH:MM:SS)")
    parser.add_argument("--end", "-e", help="End time (seconds or HH:MM:SS, negative for from end)")
    
    args = parser.parse_args()
    
    if not Path(args.input).exists():
        print(f"Error: Input file not found: {args.input}")
        sys.exit(1)
    
    trim_video(args.input, args.output, args.start, args.end)


if __name__ == "__main__":
    main()
