import { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { generateTitle } from '../api/aiApi';
import { toast } from 'sonner';

interface AITitleGeneratorProps {
  content: string;
  onTitleGenerated: (title: string) => void;
}

export default function AITitleGenerator({ content, onTitleGenerated }: AITitleGeneratorProps) {
  const [loading, setLoading] = useState(false);

  const handleGenerateTitle = async () => {
    const trimmedContent = content.trim();

    if (trimmedContent.length < 10) {
      toast.error("Please enter at least 10 characters to generate a title.");
      return;
    }

    setLoading(true);
    try {
      const title = await generateTitle(content);
      onTitleGenerated(title);
      toast.success('Title generated!');
    } catch (error: any) {
      // Display user-friendly error message from aiApi
      const errorMessage = error.message || 'Failed to generate title. Please try again.';
      toast.error(errorMessage);
      console.error('Title generation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleGenerateTitle}
      disabled={loading || !content}
      className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-primary hover:text-primary/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Sparkles className="h-4 w-4" />
      )}
      {loading ? 'Generating...' : 'Generate with AI'}
    </button>
  );
}
