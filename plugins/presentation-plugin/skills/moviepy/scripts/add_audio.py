#!/usr/bin/env python3
"""Add or replace audio track in a video."""

import argparse
import sys
from pathlib import Path

try:
    from moviepy import VideoFileClip, AudioFileClip, CompositeAudioClip
except ImportError:
    print("Error: moviepy not installed. Run: pip install moviepy")
    sys.exit(1)


def add_audio(
    video_path: str,
    audio_path: str,
    output_path: str,
    replace: bool = False,
    video_volume: float = 1.0,
    audio_volume: float = 1.0,
    audio_start: float = 0,
) -> None:
    """Add or replace audio in video."""
    video = VideoFileClip(video_path)
    audio = AudioFileClip(audio_path)
    
    if audio_volume != 1.0:
        audio = audio.with_volume_scaled(audio_volume)
    
    if audio_start > 0:
        audio = audio.with_start(audio_start)
    
    if replace or video.audio is None:
        final_audio = audio.with_duration(video.duration)
    else:
        original_audio = video.audio
        if video_volume != 1.0:
            original_audio = original_audio.with_volume_scaled(video_volume)
        final_audio = CompositeAudioClip([original_audio, audio])
    
    final = video.with_audio(final_audio)
    final.write_videofile(output_path)
    
    video.close()
    audio.close()
    
    print(f"Saved video with new audio to: {output_path}")


def main():
    parser = argparse.ArgumentParser(description="Add or replace audio in video")
    parser.add_argument("video", help="Input video file")
    parser.add_argument("audio", help="Audio file to add")
    parser.add_argument("--output", "-o", required=True, help="Output video file")
    parser.add_argument("--replace", "-r", action="store_true", 
                        help="Replace original audio (default: mix)")
    parser.add_argument("--video-volume", type=float, default=1.0,
                        help="Original audio volume (default: 1.0)")
    parser.add_argument("--audio-volume", type=float, default=1.0,
                        help="New audio volume (default: 1.0)")
    parser.add_argument("--audio-start", type=float, default=0,
                        help="Start time for new audio (default: 0)")
    
    args = parser.parse_args()
    
    if not Path(args.video).exists():
        print(f"Error: Video file not found: {args.video}")
        sys.exit(1)
    
    if not Path(args.audio).exists():
        print(f"Error: Audio file not found: {args.audio}")
        sys.exit(1)
    
    add_audio(
        args.video, args.audio, args.output,
        args.replace, args.video_volume, args.audio_volume, args.audio_start
    )


if __name__ == "__main__":
    main()
