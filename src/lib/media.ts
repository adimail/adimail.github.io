export function detectMediaType(
  url: string
): 'video' | 'audio' | 'pdf' | 'image' | 'unknown' {
  const cleanUrl = (url || '').split('?')[0].split('#')[0].toLowerCase();

  if (/\.(mp4|webm|ogg|mov|m4v)$/i.test(cleanUrl)) {
    return 'video';
  }

  if (/\.(mp3|wav|ogg|m4a|aac|flac)$/i.test(cleanUrl)) {
    return 'audio';
  }

  if (/\.pdf$/i.test(cleanUrl)) {
    return 'pdf';
  }

  if (/\.(png|jpe?g|gif|webp|svg|avif)$/i.test(cleanUrl)) {
    return 'image';
  }

  return 'unknown';
}

