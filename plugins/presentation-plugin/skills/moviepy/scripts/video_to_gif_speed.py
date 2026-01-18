#!/usr/bin/env python3
"""Convert video to GIF with auto-speedup to target duration. Ideal for PowerPoint presentations."""

import argparse
import sys
from pathlib import Path

try:
    from moviepy import VideoFileClip, vfx
except ImportError:
    print("Error: moviepy not installed. Run: pip install moviepy")
    sys.exit(1)


def video_to_gif_speed(
    input_path: str,
    output_path: str = None,
    target_duration: float = 10.0,
    fps: int = 15,
    resize_factor: float = 0.5,
) -> None:
    """Convert video to GIF and speed up to fit target duration."""
    
    if not output_path:
        input_file = Path(input_path)
        output_path = str(input_file.parent / f"{input_file.stem}_{int(target_duration)}s.gif")
    
    print(f"Loading video: {input_path}")
    
    with VideoFileClip(input_path) as clip:
        original_duration = clip.duration
        print(f"Original duration: {original_duration:.2f}s")
        
        speed_factor = original_duration / target_duration
        
        if speed_factor <= 1.0:
            print(f"Video already {target_duration}s or shorter, no speedup needed")
            processed = clip
        else:
            print(f"Speeding up by {speed_factor:.2f}x")
            processed = clip.with_effects([vfx.MultiplySpeed(speed_factor)])
        
        if resize_factor != 1.0:
            processed = processed.resized(resize_factor)
            print(f"Resized to {resize_factor:.0%}")
        
        print(f"Creating GIF: {output_path}")
        processed.write_gif(str(output_path), fps=fps)
        
        print(f"✅ GIF duration: {processed.duration:.2f}s → {output_path}")


def main():
    parser = argparse.ArgumentParser(
        description="Convert video to GIF with auto-speedup for presentations"
    )
    parser.add_argument("input", help="Input video file")
    parser.add_argument("--output", "-o", help="Output GIF file (auto-generated if omitted)")
    parser.add_argument("--duration", "-d", type=float, default=10.0,
                        help="Target duration in seconds (default: 10)")
    parser.add_argument("--fps", type=int, default=15, help="GIF fps (default: 15)")
    parser.add_argument("--resize", "-r", type=float, default=0.5,
                        help="Resize factor for smaller file (default: 0.5)")
    
    args = parser.parse_args()
    
    if not Path(args.input).exists():
        print(f"Error: Input file not found: {args.input}")
        sys.exit(1)
    
    video_to_gif_speed(args.input, args.output, args.duration, args.fps, args.resize)


if __name__ == "__main__":
    main()
