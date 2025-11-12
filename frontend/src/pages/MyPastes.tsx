import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import api from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Loader2, Trash2, Edit, ExternalLink, Copy } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
interface Paste {
  id: number;
  title: string;
  content: string;
  code: string;
  createdAt: string;
  expiryAt?: string;
}
export default function MyPastes() {
  const [pastes, setPastes] = useState<Paste[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [pasteToDelete, setPasteToDelete] = useState<number | null>(null);
  useEffect(() => {
    const fetchPastes = async () => {
      try {
        const response = await api.get('/paste/me', { suppressErrorToast: true });
        setPastes(response.data);
      } catch (error) {
        type Err = { response?: { data?: { message?: string } } };
        const err = error as Err;
        toast.error(err.response?.data?.message || 'Failed to load pastes. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchPastes();
  }, []);
  const handleDeleteClick = (id: number) => {
    setPasteToDelete(id);
    setDeleteDialogOpen(true);
  };
  const handleDeleteConfirm = async () => {
    if (pasteToDelete !== null) {
      try {
        await api.delete(`/paste/${pasteToDelete}`, { suppressErrorToast: true });
        toast.success('Paste deleted successfully');
        setPastes(pastes.filter(p => p.id !== pasteToDelete));
      } catch (error) {
        type Err = { response?: { data?: { message?: string } } };
        const err = error as Err;
        toast.error(err.response?.data?.message || 'Failed to delete paste. Please try again.');
      } finally {
        setDeleteDialogOpen(false);
        setPasteToDelete(null);
      }
    }
  };
  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setPasteToDelete(null);
  };
  const copyPublicLink = (code: string) => {
    const url = `${window.location.origin}/public/${code}`;
    navigator.clipboard.writeText(url);
    toast.success('Link copied to clipboard!');
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
      <div className="flex-1 container mx-auto p-4 max-w-5xl">
        <div className="flex justify-end items-center mb-6 mt-8">
          <Link to="/create-paste">
            <Button>Create New Paste</Button>
          </Link>
        </div>
        {pastes.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground mb-4">You haven't created any pastes yet</p>
              <Link to="/create-paste">
                <Button>Create Your First Paste</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {pastes.map((paste) => (
              <Card key={paste.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{paste.title}</CardTitle>
                      <CardDescription>
                        Code: <span className="font-mono font-semibold">{paste.code}</span> • Created: {new Date(paste.createdAt).toLocaleString()}
                        {paste.expiryAt && ` • Expires: ${new Date(paste.expiryAt).toLocaleString()}`}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyPublicLink(paste.code)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Link to={`/public/${paste.code}`}>
                        <Button variant="outline" size="sm">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Link to={`/edit-paste/${paste.id}`}>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteClick(paste.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
                    {paste.content.substring(0, 200)}
                    {paste.content.length > 200 && '...'}
                  </pre>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Paste</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this paste? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={handleDeleteCancel}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}