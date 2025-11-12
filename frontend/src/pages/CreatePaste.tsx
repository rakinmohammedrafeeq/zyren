import { useState } from 'react';
import api from '@/lib/api';
import { useNavigate } from 'react-router';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
export default function CreatePaste() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [expiryMinutes, setExpiryMinutes] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
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
      params.set('type', 'TEXT');
      await api.post('/paste', params, { suppressErrorToast: true });
      toast.success('Paste created successfully!');
      navigate('/my-pastes');
    } catch (error) {
      type Err = { response?: { data?: { message?: string } } };
      const err = error as Err;
      toast.error(err.response?.data?.message || 'Failed to create paste. Please try again.');
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
    </div>
  );
}