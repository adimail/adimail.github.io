import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Volume1,
  Maximize,
  RotateCcw,
  Repeat,
  Download,
  X,
  Maximize2,
} from 'lucide-react';
import { detectMediaType } from '../lib/media';

interface MediaViewerProps {
  src: string;
  alt?: string;
  className?: string;
}

export const MediaViewer: React.FC<MediaViewerProps> = ({
  src,
  alt = '',
  className = '',
}) => {
  const mediaType = detectMediaType(src);
  const [isOpen, setIsOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLooping, setIsLooping] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const hideControlsTimerRef = useRef<number | null>(null);

  const downloadFile = useCallback(async (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const filename = alt.trim()
      ? alt.replace(/[^a-zA-Z0-9_-]/g, '_') + '.' + (src.split('.').pop()?.split('?')[0] || 'media')
      : src.split('/').pop()?.split('?')[0] || 'download';

    try {
      const response = await fetch(src);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = blobUrl;
      anchor.download = filename;
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      URL.revokeObjectURL(blobUrl);
    } catch {
      const anchor = document.createElement('a');
      anchor.href = src;
      anchor.download = filename;
      anchor.target = '_blank';
      anchor.rel = 'noopener noreferrer';
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
    }
  }, [src, alt]);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsOpen(false);
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const togglePlay = () => {
    const activeVideo = isOpen ? modalVideoRef.current : videoRef.current;
    if (!activeVideo) return;
    if (activeVideo.paused) {
      activeVideo.play();
      setIsPlaying(true);
    } else {
      activeVideo.pause();
      setIsPlaying(false);
    }
  };

  const toggleLoop = () => {
    const nextLoop = !isLooping;
    setIsLooping(nextLoop);
    if (videoRef.current) videoRef.current.loop = nextLoop;
    if (modalVideoRef.current) modalVideoRef.current.loop = nextLoop;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = Number(e.target.value);
    setCurrentTime(target);
    if (videoRef.current) videoRef.current.currentTime = target;
    if (modalVideoRef.current) modalVideoRef.current.currentTime = target;
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setVolume(val);
    const muted = val === 0;
    setIsMuted(muted);

    if (videoRef.current) {
      videoRef.current.volume = val;
      videoRef.current.muted = muted;
    }
    if (modalVideoRef.current) {
      modalVideoRef.current.volume = val;
      modalVideoRef.current.muted = muted;
    }
  };

  const toggleMute = () => {
    const targetMute = !isMuted;
    const nextVol = targetMute ? 0 : volume === 0 ? 0.5 : volume;
    setIsMuted(targetMute);
    setVolume(nextVol);

    if (videoRef.current) {
      videoRef.current.muted = targetMute;
      videoRef.current.volume = nextVol;
    }
    if (modalVideoRef.current) {
      modalVideoRef.current.muted = targetMute;
      modalVideoRef.current.volume = nextVol;
    }
  };

  const cyclePlaybackRate = () => {
    const rates = [0.75, 1, 1.25, 1.5, 2];
    const next = rates[(rates.indexOf(playbackRate) + 1) % rates.length];
    setPlaybackRate(next);
    if (videoRef.current) videoRef.current.playbackRate = next;
    if (modalVideoRef.current) modalVideoRef.current.playbackRate = next;
  };

  const restartVideo = () => {
    const activeVideo = isOpen ? modalVideoRef.current : videoRef.current;
    if (!activeVideo) return;
    activeVideo.currentTime = 0;
    activeVideo.play();
    setIsPlaying(true);
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (hideControlsTimerRef.current) {
      window.clearTimeout(hideControlsTimerRef.current);
    }
    hideControlsTimerRef.current = window.setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 2200);
  };

  const formatSeconds = (sec: number) => {
    if (isNaN(sec)) return '00:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (mediaType === 'video') {
    return (
      <>
        <div
          onMouseMove={handleMouseMove}
          onMouseLeave={() => isPlaying && setShowControls(false)}
          className={`relative group bg-black rounded-sm overflow-hidden flex items-center justify-center select-none ${className}`}
        >
          <video
            ref={videoRef}
            src={src}
            autoPlay
            muted={isMuted}
            loop={isLooping}
            playsInline
            onClick={togglePlay}
            onTimeUpdate={() => {
              if (videoRef.current) setCurrentTime(videoRef.current.currentTime);
            }}
            onLoadedMetadata={() => {
              if (videoRef.current) setDuration(videoRef.current.duration);
            }}
            onEnded={() => {
              if (!isLooping) setIsPlaying(false);
            }}
            className="w-full h-full max-h-[60vh] object-contain cursor-pointer"
          />

          <div
            className={`absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col gap-2 transition-opacity duration-200 ${
              showControls ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
          >
            <div className="relative w-full flex items-center">
              <input
                type="range"
                min={0}
                max={duration || 1}
                step={0.1}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1 bg-white/20 hover:bg-white/40 rounded appearance-none cursor-pointer accent-zinc-100 focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-between text-xs text-zinc-300 font-mono gap-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={togglePlay}
                  className="p-1 rounded hover:bg-white/20 text-white cursor-pointer"
                  title={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" />}
                </button>

                <button
                  type="button"
                  onClick={restartVideo}
                  className="p-1 rounded hover:bg-white/20 text-zinc-400 hover:text-white cursor-pointer"
                  title="Restart"
                >
                  <RotateCcw size={13} />
                </button>

                <button
                  type="button"
                  onClick={toggleLoop}
                  className={`p-1 rounded cursor-pointer ${
                    isLooping ? 'text-white' : 'text-zinc-500 hover:text-white'
                  }`}
                  title={isLooping ? 'Looping Enabled' : 'Looping Disabled'}
                >
                  <Repeat size={13} />
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={toggleMute}
                    className="p-1 text-zinc-300 hover:text-white cursor-pointer"
                    title={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted || volume === 0 ? (
                      <VolumeX size={14} />
                    ) : volume < 0.5 ? (
                      <Volume1 size={14} />
                    ) : (
                      <Volume2 size={14} />
                    )}
                  </button>

                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.05}
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-14 sm:w-18 h-1 bg-white/20 rounded appearance-none cursor-pointer accent-zinc-100 focus:outline-none"
                  />
                </div>

                <span className="text-[10px] text-zinc-400">
                  {formatSeconds(currentTime)} / {formatSeconds(duration)}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={cyclePlaybackRate}
                  className="px-1.5 py-0.5 rounded hover:bg-white/20 text-white text-[11px] font-mono cursor-pointer"
                  title="Speed"
                >
                  {playbackRate}x
                </button>

                <button
                  type="button"
                  onClick={downloadFile}
                  className="p-1 rounded hover:bg-white/20 text-zinc-300 hover:text-white cursor-pointer"
                  title="Download Video"
                >
                  <Download size={13} />
                </button>

                <button
                  type="button"
                  onClick={handleOpen}
                  className="p-1 rounded hover:bg-white/20 text-zinc-300 hover:text-white cursor-pointer"
                  title="Fullscreen Lightbox"
                >
                  <Maximize size={13} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {isOpen && (
          <div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col justify-between p-4"
            onClick={handleClose}
          >
            <div className="flex items-center justify-end z-10 w-full" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={downloadFile}
                  className="p-2 rounded bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  title="Download"
                >
                  <Download size={16} />
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  className="p-2 rounded bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  title="Close (Esc)"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            <div className="flex-1 flex items-center justify-center p-2" onClick={(e) => e.stopPropagation()}>
              <video
                ref={modalVideoRef}
                src={src}
                controls
                autoPlay
                loop={isLooping}
                className="max-w-full max-h-[85vh] object-contain shadow-2xl"
              />
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <figure className={`my-8 flex flex-col items-center ${className}`}>
        <div
          onClick={handleOpen}
          className="relative group cursor-zoom-in max-w-full inline-block border border-zinc-200 overflow-hidden bg-zinc-50"
        >
          <img
            src={src}
            alt={alt}
            loading="lazy"
            className="w-auto max-w-full max-h-[60vh] object-contain block mx-auto transition-transform duration-200 group-hover:scale-[1.01]"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center pointer-events-none">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/75 text-white p-2 rounded-full shadow-lg">
              <Maximize2 size={16} />
            </span>
          </div>
        </div>
        {alt && (
          <figcaption className="text-center text-xs text-zinc-500 mt-2 font-mono">
            {alt}
          </figcaption>
        )}
      </figure>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex flex-col select-none"
          onClick={handleClose}
        >
          <div
            className="h-14 px-4 sm:px-6 flex items-center justify-end border-b border-zinc-800/80 bg-black/60 shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={downloadFile}
                className="p-2 rounded bg-white/10 hover:bg-white/20 text-zinc-200 transition-colors cursor-pointer"
                title="Download"
              >
                <Download size={18} />
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="p-2 rounded bg-white/10 hover:bg-white/20 text-zinc-200 transition-colors cursor-pointer"
                title="Close (Esc)"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          <div
            className="flex-1 overflow-auto flex items-center justify-center p-4 cursor-default"
            onClick={handleClose}
          >
            <img
              src={src}
              alt={alt}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[88vh] max-w-full object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
};
