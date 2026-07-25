import { useState, useEffect, useRef } from 'react';
import { Sparkles, Loader2, FileText, Clock } from 'lucide-react';
import { summarizeContent } from '../api/aiApi';

interface AISummaryCardProps {
  content: string;
  pasteId?: string;
  mediaUrl?: string;
  mediaType?: string;
}

export default function AISummaryCard({ content, pasteId, mediaUrl, mediaType }: AISummaryCardProps) {
  const [summary, setSummary] = useState<string>('');
  const [contentType, setContentType] = useState<string>('');
  const [wordCount, setWordCount] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [needsExpansion, setNeedsExpansion] = useState(false);
  const summaryRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    // Auto-generate summary on mount (or load from cache)
    const cachedSummary = localStorage.getItem(`summary_${pasteId}`);
    if (cachedSummary) {
      const parsed = JSON.parse(cachedSummary);
      setSummary(parsed.summary);
      setContentType(parsed.contentType);
      setWordCount(parsed.wordCount);
    } else if (content && content.trim().length > 20) {
      generateSummary();
    }
  }, [content, pasteId]);

  // Check if summary needs expansion (longer than ~150 characters as rough estimate)
  useEffect(() => {
    if (summary && summaryRef.current) {
      // Check if the content is actually overflowing (more than 2 lines)
      const element = summaryRef.current;
      const lineHeight = parseFloat(getComputedStyle(element).lineHeight);
      const maxHeight = lineHeight * 2; // 2 lines
      const actualHeight = element.scrollHeight;
      
      setNeedsExpansion(actualHeight > maxHeight + 2); // +2 for rounding tolerance
    }
  }, [summary]);

  const formatSummary = (text: string): string => {
    // Clean markdown first
    let cleaned = text
      .replace(/\*\*\*(.+?)\*\*\*/g, '$1') // Remove bold+italic ***text***
      .replace(/\*\*(.+?)\*\*/g, '$1')     // Remove bold **text**
      .replace(/\*(.+?)\*/g, '$1')         // Remove italic *text*
      .replace(/#{1,6}\s+(.+)/g, '$1')     // Remove headers ### text
      .replace(/\[(.+?)\]\(.+?\)/g, '$1')  // Remove links [text](url)
      .replace(/`(.+?)`/g, '$1');          // Remove inline code `text`
    
    // Preserve paragraph breaks by replacing double newlines with a marker
    cleaned = cleaned.replace(/\n\n/g, '|||PARAGRAPH|||');
    
    // Remove single newlines (replace with space)
    cleaned = cleaned.replace(/\n/g, ' ');
    
    // Restore paragraph breaks
    cleaned = cleaned.replace(/\|\|\|PARAGRAPH\|\|\|/g, '\n\n');
    
    return cleaned.trim();
  };

  const renderSummary = (text: string) => {
    const formatted = formatSummary(text);
    const paragraphs = formatted.split('\n\n').filter(p => p.trim());
    
    return (
      <div className="space-y-3">
        {paragraphs.map((paragraph, index) => (
          <p key={index} className="text-sm text-muted-foreground">
            {paragraph.trim()}
          </p>
        ))}
      </div>
    );
  };

  const generateSummary = async () => {
    if (!content || loading) return;

    setLoading(true);
    try {
      const result = await summarizeContent(content, mediaUrl, mediaType);
      setSummary(result.result);
      setContentType(result.contentType || 'text');
      setWordCount(result.wordCount || 0);

      // Cache the summary
      if (pasteId) {
        localStorage.setItem(
          `summary_${pasteId}`,
          JSON.stringify({
            summary: result.result,
            contentType: result.contentType,
            wordCount: result.wordCount,
          })
        );
      }
    } catch (error: any) {
      // Error is already shown by aiApi with user-friendly message
      console.error('Failed to generate summary:', error);
    } finally {
      setLoading(false);
    }
  };

  const getReadingTime = (words: number) => {
    const minutes = Math.ceil(words / 200); // Average reading speed
    return minutes === 1 ? '1 min read' : `${minutes} min read`;
  };

  const getContentTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'code':
        return '💻';
      case 'recipe':
        return '🍳';
      case 'article':
        return '📰';
      case 'notes':
        return '📝';
      case 'poem':
        return '✨';
      case 'list':
        return '📋';
      default:
        return '📄';
    }
  };

  if (loading) {
    return (
      <div className="mt-3 p-3 bg-muted/50 rounded-lg border border-dashed">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Generating AI summary...</span>
        </div>
      </div>
    );
  }

  if (!summary) {
    return null;
  }

  return (
    <div className="mt-3 p-3 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg border border-primary/20">
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary flex-shrink-0" />
          <span className="text-xs font-semibold text-primary">AI Summary</span>
        </div>
        {needsExpansion && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            {isExpanded ? 'Show less' : 'Show more'}
          </button>
        )}
      </div>

      {/* Summary Text */}
      <div 
        ref={summaryRef}
        className={`${isExpanded ? '' : 'line-clamp-2'}`}
      >
        {renderSummary(summary)}
      </div>

      {/* Metadata */}
      <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <span>{getContentTypeIcon(contentType)}</span>
          <span className="capitalize">{contentType || 'Text'}</span>
        </span>
        {wordCount > 0 && (
          <>
            <span>•</span>
            <span className="flex items-center gap-1">
              <FileText className="h-3 w-3" />
              {wordCount} words
            </span>
          </>
        )}
        {wordCount > 0 && (
          <>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {getReadingTime(wordCount)}
            </span>
          </>
        )}
      </div>
    </div>
  );
}
