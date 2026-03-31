import { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import api from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { MediaPreview } from '@/components/MediaPreview';

export default function CreatePaste() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [expiryMinutes, setExpiryMinutes] = useState('');
  const [customCode, setCustomCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploadingMedia, setUploadingMedia] = useState(false);
  const [media, setMedia] = useState<{ secureUrl: string; publicId: string; resourceType: string } | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleMediaUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp', 'video/mp4', 'video/quicktime', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Unsupported file type. Allowed: JPEG, PNG, WebP, MP4, MOV, PDF');
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      toast.error('File too large. Maximum size: 15MB');
      return;
    }

    setUploadingMedia(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('http://localhost:8080/api/media/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        toast.error(errorText || 'Failed to upload media');
        setUploadingMedia(false);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        return;
      }

      const data = await response.json();

      setMedia({
        secureUrl: data.secureUrl,
        publicId: data.publicId,
        resourceType: data.resourceType,
      });
      toast.success('Media uploaded successfully!');
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to upload media';
      toast.error(message || 'Failed to upload media');
      if (typeof import.meta !== 'undefined' && import.meta.env?.DEV) {
        console.error('[media upload] failed', { error });
      }
    } finally {
      setUploadingMedia(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemoveMedia = () => {
    setMedia(null);
  };

  const renderMediaPreview = () => {
    if (!media) return null;

    return (
      <MediaPreview
        media={media}
        isPublicView={false}
        onRemove={() => setShowConfirm(true)}
      />
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set('title', title);
      params.set('content', content);
      if (expiryMinutes) {
        params.set('expiryMinutes', String(parseInt(expiryMinutes)));
      }
      const trimmedCode = customCode.trim();
      if (trimmedCode) {
        const codeRegex = /^[A-Za-z0-9_-]+$/;
        if (!codeRegex.test(trimmedCode)) {
          toast.error("Invalid code format. Use only letters, numbers, '-' or '_'.");
          setLoading(false);
          return;
        }
        params.set('code', trimmedCode);
      }
      params.set('type', 'TEXT');
      if (media) {
        params.set('mediaUrl', media.secureUrl);
        params.set('mediaPublicId', media.publicId);
        params.set('mediaType', media.resourceType);
      }
      await api.post('/paste', params, { suppressErrorToast: true });
      toast.success('Paste created successfully!');
      navigate('/my-pastes');
    } catch (error: unknown) {
      type Err = { response?: { data?: { message?: string } | string } };
      const err = error as Err;
      const apiMessage = typeof err.response?.data === 'string' ? err.response?.data : err.response?.data?.message;
      const message = error instanceof Error ? error.message : apiMessage;
      toast.error(message || 'Failed to create paste. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 container mx-auto p-4 max-w-3xl">
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Create New Paste</CardTitle>
            <CardDescription>Share your code, text, or notes</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <p className="text-xs text-muted-foreground">* indicates required fields</p>

              <div className="space-y-2">
                <Label htmlFor="title">
                  Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  placeholder="My awesome paste"
                  autoFocus
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">
                  Content <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  placeholder="Paste your content here..."
                  className="min-h-64 font-mono"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="media">Media (optional)</Label>
                <Input
                  ref={fileInputRef}
                  id="media"
                  type="file"
                  accept="image/jpeg,image/png,image/jpg,image/webp,video/mp4,video/quicktime,application/pdf"
                  onChange={handleMediaUpload}
                  disabled={uploadingMedia || !!media}
                  className="cursor-pointer"
                />
                <p className="text-xs text-muted-foreground">Supported: JPEG, PNG, WebP, MP4, MOV, PDF (max 15MB)</p>
                {renderMediaPreview()}
              </div>

              <div className="space-y-2">
                <Label htmlFor="expiryMinutes">Expiry (minutes, optional)</Label>
                <Input
                  id="expiryMinutes"
                  type="number"
                  value={expiryMinutes}
                  onChange={(e) => setExpiryMinutes(e.target.value)}
                  placeholder="Leave empty for no expiry"
                  min="1"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="customCode">Custom Code (optional)</Label>
                <Input
                  id="customCode"
                  value={customCode}
                  onChange={(e) => setCustomCode(e.target.value)}
                  placeholder="e.g. my-snippet-123"
                />
                <p className="text-xs text-muted-foreground">If provided, this will be used as the public code for your paste. Allowed: letters, numbers, '-' and '_'. Leave empty to auto-generate an 8-character code.</p>
              </div>

              <div className="flex gap-2">
                <Button type="submit" disabled={loading}>
                  {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Creating...</> : 'Create Paste'}
                </Button>
                <Button type="button" variant="outline" onClick={() => navigate('/my-pastes')}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="rounded-xl p-6 w-80 text-center shadow-lg bg-white text-black dark:bg-neutral-900 dark:text-white">
            <p className="mb-4 text-gray-800 font-medium dark:text-white">
              Are you sure you want to remove this media?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 rounded-md bg-gray-200 text-black hover:bg-gray-300 dark:bg-neutral-700 dark:text-white dark:hover:bg-neutral-600"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleRemoveMedia();
                  setShowConfirm(false);
                }}
                className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
