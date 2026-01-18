#!/usr/bin/env python3
"""Concatenate multiple videos into one."""

import argparse
import sys
from pathlib import Path

try:
    from moviepy import VideoFileClip, concatenate_videoclips, vfx
except ImportError:
    print("Error: moviepy not installed. Run: pip install moviepy")
    sys.exit(1)


def concat_videos(
    input_paths: list[str],
    output_path: str,
    transition: float = 0,
) -> None:
    """Concatenate videos with optional crossfade transition."""
    clips = []
    
    for path in input_paths:
        clip = VideoFileClip(path)
        clips.append(clip)
    
    if transition > 0 and len(clips) > 1:
        processed = []
        for i, clip in enumerate(clips):
            if i > 0:
                clip = clip.with_effects([vfx.CrossFadeIn(transition)])
            if i < len(clips) - 1:
                clip = clip.with_effects([vfx.FadeOut(transition)])
            processed.append(clip)
        final = concatenate_videoclips(processed, padding=-transition)
    else:
        final = concatenate_videoclips(clips)
    
    final.write_videofile(output_path)
    
    for clip in clips:
        clip.close()
    
    print(f"Saved concatenated video to: {output_path}")


def main():
    parser = argparse.ArgumentParser(description="Concatenate multiple videos")
    parser.add_argument("inputs", nargs="+", help="Input video files")
    parser.add_argument("--output", "-o", required=True, help="Output video file")
    parser.add_argument("--transition", "-t", type=float, default=0, 
                        help="Crossfade transition duration in seconds (default: 0)")
    
    args = parser.parse_args()
    
    for path in args.inputs:
        if not Path(path).exists():
            print(f"Error: Input file not found: {path}")
            sys.exit(1)
    
    concat_videos(args.inputs, args.output, args.transition)


if __name__ == "__main__":
    main()
