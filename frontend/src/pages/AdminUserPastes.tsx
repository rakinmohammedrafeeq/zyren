import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import api from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Loader2, Trash2, ArrowLeft } from 'lucide-react';

interface Paste {
  id: number;
  title: string;
  content: string;
  code: string;
  createdAt: string;
  expiryAt?: string;
}
export default function AdminUserPastes() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [pastes, setPastes] = useState<Paste[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [pasteToDelete, setPasteToDelete] = useState<Paste | null>(null);
  useEffect(() => {
    const fetchUserPastes = async () => {
      try {
        const response = await api.get(`/admin/users/${userId}/pastes`, { suppressErrorToast: true });
        setPastes(response.data);
      } catch (error) {
        type Err = { response?: { data?: { message?: string } } };
        const err = error as Err;
        toast.error(err.response?.data?.message || 'Failed to load user pastes. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchUserPastes();
  }, [userId]);
  const handleDeleteClick = (paste: Paste) => {
    setPasteToDelete(paste);
    setDeleteDialogOpen(true);
  };
  const handleDeleteConfirm = async () => {
    if (pasteToDelete) {
      try {
        await api.delete(`/paste/admin/${pasteToDelete.id}`, { suppressErrorToast: true });
        toast.success('Paste deleted successfully');
        setPastes(pastes.filter(p => p.id !== pasteToDelete.id));
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
      <div className="flex-1 container mx-auto p-4 max-w-5xl">
        <div className="flex items-center gap-4 mb-6 mt-8">
          <Button variant="outline" size="sm" onClick={() => navigate('/admin/users')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>
        {pastes.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">This user has no pastes</p>
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
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteClick(paste)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
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
              Are you sure you want to delete the paste <strong>{pasteToDelete?.title}</strong>? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={handleDeleteCancel}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              Delete Paste
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}