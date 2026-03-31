import React from 'react';
import { X } from 'lucide-react';

export type Media = {
  secureUrl: string;
  publicId: string;
  resourceType: string;
};

type MediaPreviewProps = {
  media: Media | null;
  isPublicView: boolean;
  onRemove?: () => void;
  className?: string;
};

export function MediaPreview({ media, onRemove, className = '' }: MediaPreviewProps) {
  if (!media) return null;

  const openUrl = media.resourceType === 'raw'
    ? media.secureUrl.replace('/image/upload/', '/raw/upload/')
    : media.secureUrl;
  const isPdf = media.resourceType === 'raw' || media.secureUrl.toLowerCase().includes('.pdf');
  const pdfPreviewUrl = media.secureUrl.replace('/upload/', '/upload/pg_1,f_jpg,w_400/');

  const renderBody = () => {
    if (media.resourceType === 'video') {
      return (
        <video
          src={openUrl}
          controls
          className="w-full rounded-lg"
        />
      );
    }

    if (isPdf) {
      return (
        <a href={openUrl} target="_blank" rel="noopener noreferrer">
          <img
            src={pdfPreviewUrl}
            alt="PDF preview"
            className="w-full object-contain rounded-lg cursor-pointer hover:opacity-90 transition"
          />
        </a>
      );
    }

    return (
      <a href={openUrl} target="_blank" rel="noopener noreferrer">
        <img
          src={openUrl}
          alt="Media preview"
          className="w-full h-auto object-contain rounded-lg cursor-pointer hover:opacity-90 transition"
        />
      </a>
    );
  };

  return (
    <div className={`relative w-full max-w-md bg-transparent overflow-hidden rounded-lg ${className}`}>
      {renderBody()}

      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="absolute top-2 right-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
          aria-label="Remove media"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
