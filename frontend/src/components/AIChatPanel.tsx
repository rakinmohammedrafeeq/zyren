import { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, Loader2, Minimize2, Maximize2, Globe, FileText, Volume2 } from 'lucide-react';
import { chatWithAI, translateContent, summarizeContent } from '../api/aiApi';
import { toast } from 'sonner';

interface AIChatPanelProps {
  content: string;
  mediaUrl?: string;
}

interface Message {
  role: 'user' | 'ai';
  content: string;
}

export default function AIChatPanel({ content, mediaUrl }: AIChatPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleAskQuestion = async () => {
    if (!question.trim()) {
      toast.error('Please enter a question');
      return;
    }

    const userMessage: Message = { role: 'user', content: question };
    setMessages((prev) => [...prev, userMessage]);
    setQuestion('');
    setLoading(true);

    try {
      const answer = await chatWithAI(content, question, mediaUrl);
      const aiMessage: Message = { role: 'ai', content: answer };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error: any) {
      // Display user-friendly error message
      const errorMessage = error.message || 'Failed to get AI response. Please try again.';
      toast.error(errorMessage);
      const errorResponse: Message = { 
        role: 'ai', 
        content: 'Sorry, I encountered an error. Please try again or try with shorter content.' 
      };
      setMessages((prev) => [...prev, errorResponse]);
    } finally {
      setLoading(false);
    }
  };

  const handleSummarize = async () => {
    setLoading(true);
    try {
      // Detect media type from URL if available
      let detectedMediaType = 'image';
      if (mediaUrl) {
        if (mediaUrl.includes('/video/') || mediaUrl.match(/\.(mp4|mov|avi|webm)$/i)) {
          detectedMediaType = 'video';
        } else if (mediaUrl.match(/\.(pdf)$/i)) {
          detectedMediaType = 'pdf';
        }
      }
      
      const summary = await summarizeContent(content, mediaUrl, detectedMediaType);
      const aiMessage: Message = {
        role: 'ai',
        content: `📝 Summary:\n\n${summary.result}\n\n📊 Type: ${summary.contentType}\n📝 Words: ${summary.wordCount}`
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsOpen(true);
      setIsMinimized(false);
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to generate summary. Please try again.';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleTranslate = async (language: string) => {
    setLoading(true);
    try {
      const translation = await translateContent(content, language);
      const aiMessage: Message = {
        role: 'ai',
        content: `🌐 Translation to ${language}:\n\n${translation}`
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsOpen(true);
      setIsMinimized(false);
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to translate. Please try again.';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const quickQuestions = [
    'What is this about?',
    'Summarize this in one sentence',
    'What are the key points?',
    'Can you explain this?',
  ];

  if (!isOpen) {
    return (
      <div className="flex gap-2 mt-4">
        <button
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Sparkles className="h-4 w-4" />
          Ask AI About This
        </button>
        <button
          onClick={handleSummarize}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-accent transition-colors disabled:opacity-50"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileText className="h-4 w-4" />}
          Summarize
        </button>
      </div>
    );
  }

  return (
    <div className="mt-6 border rounded-lg overflow-hidden bg-card">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-muted border-b">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">AI Assistant</h3>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 hover:bg-accent rounded"
          >
            {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-accent rounded text-muted-foreground"
          >
            ×
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">
                <Sparkles className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="mb-4">Ask me anything about this paste!</p>
                <div className="space-y-2">
                  <p className="text-sm font-semibold">Try asking:</p>
                  {quickQuestions.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => setQuestion(q)}
                      className="block w-full text-left px-3 py-2 text-sm border rounded hover:bg-accent transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      msg.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </div>
              ))
            )}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-lg p-3">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          <div className="border-t p-3 bg-muted/50">
            <p className="text-xs text-muted-foreground mb-2">Quick Actions:</p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleSummarize}
                disabled={loading}
                className="inline-flex items-center gap-1 px-3 py-1 text-xs border rounded-full hover:bg-accent transition-colors disabled:opacity-50"
              >
                <FileText className="h-3 w-3" />
                Summarize
              </button>
              <button
                onClick={() => handleTranslate('Spanish')}
                disabled={loading}
                className="inline-flex items-center gap-1 px-3 py-1 text-xs border rounded-full hover:bg-accent transition-colors disabled:opacity-50"
              >
                <Globe className="h-3 w-3" />
                Translate to Spanish
              </button>
              <button
                onClick={() => handleTranslate('French')}
                disabled={loading}
                className="inline-flex items-center gap-1 px-3 py-1 text-xs border rounded-full hover:bg-accent transition-colors disabled:opacity-50"
              >
                <Globe className="h-3 w-3" />
                French
              </button>
              <button
                onClick={() => handleTranslate('Hindi')}
                disabled={loading}
                className="inline-flex items-center gap-1 px-3 py-1 text-xs border rounded-full hover:bg-accent transition-colors disabled:opacity-50"
              >
                <Globe className="h-3 w-3" />
                Hindi
              </button>
            </div>
          </div>

          {/* Input */}
          <div className="border-t p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAskQuestion()}
                placeholder="Ask a question..."
                className="flex-1 px-3 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                disabled={loading}
              />
              <button
                onClick={handleAskQuestion}
                disabled={loading || !question.trim()}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
