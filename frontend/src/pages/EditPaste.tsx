import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router';
import api from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { MediaPreview } from '@/components/MediaPreview';
import AITitleGenerator from '@/components/AITitleGenerator';

interface Paste { id: number; title: string; content: string; mediaUrl?: string; mediaPublicId?: string; mediaType?: string; }

// noinspection JSUnusedGlobalSymbols
export default function EditPaste() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [media, setMedia] = useState<{ secureUrl: string; publicId: string; resourceType: string } | null>(null);
  const [uploadingMedia, setUploadingMedia] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPaste = async () => {
      try {
        const response = await api.get('/paste/me', { suppressErrorToast: true });
        const paste = (response.data as Paste[]).find(p => String(p.id) === id);
        if (!paste) {
          toast.error('Paste not found');
          navigate('/my-pastes');
          return;
        }
        setTitle(paste.title);
        setContent(paste.content);
        if (paste.mediaUrl && paste.mediaPublicId && paste.mediaType) {
          setMedia({ secureUrl: paste.mediaUrl, publicId: paste.mediaPublicId, resourceType: paste.mediaType });
        }
      } catch (error) {
        type Err = { response?: { data?: { message?: string } } };
        const err = error as Err;
        toast.error(err.response?.data?.message || 'Failed to load paste. Please try again.');
        navigate('/my-pastes');
      } finally {
        setLoading(false);
      }
    };
    fetchPaste();
  }, [id, navigate]);

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

      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';
      const response = await fetch(`${apiBaseUrl}/media/upload`, {
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
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const params = new URLSearchParams();
      params.set('title', title);
      params.set('content', content);
      if (media) {
        params.set('mediaUrl', media.secureUrl);
        params.set('mediaPublicId', media.publicId);
        params.set('mediaType', media.resourceType);
      } else {
        params.set('mediaUrl', '');
        params.set('mediaPublicId', '');
        params.set('mediaType', '');
      }
      await api.put(`/paste/${id}`, params, { suppressErrorToast: true });
      
      // Clear cached summary so it regenerates with new content
      if (id) {
        localStorage.removeItem(`summary_${id}`);
      }
      
      toast.success('Paste updated successfully!');
      navigate('/my-pastes');
    } catch (error) {
      type Err = { response?: { data?: { message?: string } } };
      const err = error as Err;
      toast.error(err.response?.data?.message || 'Failed to update paste. Please try again.');
    } finally {
        setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 container mx-auto p-4 max-w-3xl">
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Edit Paste</CardTitle>
            <CardDescription>Update your paste content</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <p className="text-xs text-muted-foreground">* indicates required fields</p>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="title">
                    Title <span className="text-red-500">*</span>
                  </Label>
                  <AITitleGenerator 
                    content={content} 
                    onTitleGenerated={(generatedTitle) => setTitle(generatedTitle)} 
                  />
                </div>
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
                {media && (
                  <MediaPreview
                    media={media}
                    isPublicView={false}
                    onRemove={() => setShowConfirm(true)}
                  />
                )}
              </div>

              <div className="flex gap-2">
                <Button type="submit" disabled={saving}>
                  {saving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving...</> : 'Save Changes'}
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