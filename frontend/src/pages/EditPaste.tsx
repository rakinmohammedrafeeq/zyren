import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import api from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
interface Paste { id: number; title: string; content: string; }
export default function EditPaste() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
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
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const params = new URLSearchParams();
      params.set('title', title);
      params.set('content', content);
      await api.put(`/paste/${id}`, params, { suppressErrorToast: true });
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
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 container mx-auto p-4 max-w-3xl">
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Edit Paste</CardTitle>
            <CardDescription>Update your paste content</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
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
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  placeholder="Paste your content here..."
                  className="min-h-64 font-mono"
                />
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
    </div>
  );
}