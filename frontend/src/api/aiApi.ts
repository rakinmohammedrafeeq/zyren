import api from './axios';

export interface AIRequest {
  content: string;
  question?: string;
  targetLanguage?: string;
  action?: string;
  mediaUrl?: string;
  mediaType?: string;
}

export interface AIResponse {
  result: string;
  contentType?: string;
  wordCount?: number;
  error?: string;
}

/**
 * Helper to handle AI API errors with user-friendly messages
 */
const handleAIError = (error: any, context: string): Error => {
  const status = error.response?.status;
  const serverMessage = error.response?.data?.message || '';
  
  // Check for payload size error
  if (status === 413 || serverMessage.toLowerCase().includes('payload') || serverMessage.toLowerCase().includes('too large')) {
    return new Error('Your content is too large. Please try with shorter content or smaller files.');
  }
  
  // Check for rate limiting
  if (status === 429) {
    return new Error('Too many requests. Please wait a moment and try again.');
  }
  
  // AI service errors
  if (status === 500 || status === 502 || status === 503) {
    return new Error('AI service is temporarily unavailable. Please try again later.');
  }
  
  // Token limit errors (common with AI services)
  if (serverMessage.toLowerCase().includes('token') && (serverMessage.toLowerCase().includes('limit') || serverMessage.toLowerCase().includes('exceed'))) {
    return new Error('Your content exceeds the AI processing limit. Please try with shorter content.');
  }
  
  // Network or timeout errors
  if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
    return new Error(`${context} took too long. Please try again with shorter content.`);
  }
  
  // Generic error with context
  return new Error(`Failed to ${context.toLowerCase()}. Please try again.`);
};

/**
 * Generate title from content using AI
 */
export const generateTitle = async (content: string): Promise<string> => {
  try {
    const response = await api.post<AIResponse>('/ai/generate-title', { content }, { suppressErrorToast: true });
    return response.data.result || 'Untitled Paste';
  } catch (error: any) {
    throw handleAIError(error, 'generate title');
  }
};

/**
 * Summarize content using AI (with optional media)
 */
export const summarizeContent = async (content: string, mediaUrl?: string, mediaType?: string): Promise<AIResponse> => {
  try {
    const response = await api.post<AIResponse>('/ai/summarize', { 
      content,
      mediaUrl,
      mediaType
    }, { suppressErrorToast: true });
    return response.data;
  } catch (error: any) {
    throw handleAIError(error, 'summarize content');
  }
};

/**
 * Chat with AI about content (with optional media)
 */
export const chatWithAI = async (content: string, question: string, mediaUrl?: string): Promise<string> => {
  try {
    const response = await api.post<AIResponse>('/ai/chat', { 
      content, 
      question,
      mediaUrl
    }, { suppressErrorToast: true });
    return response.data.result || 'Unable to generate response.';
  } catch (error: any) {
    throw handleAIError(error, 'chat with AI');
  }
};

/**
 * Translate content using AI
 */
export const translateContent = async (content: string, targetLanguage: string): Promise<string> => {
  try {
    const response = await api.post<AIResponse>('/ai/translate', { content, targetLanguage }, { suppressErrorToast: true });
    return response.data.result || 'Unable to translate.';
  } catch (error: any) {
    throw handleAIError(error, 'translate content');
  }
};

/**
 * Detect content type using AI
 */
export const detectContentType = async (content: string): Promise<string> => {
  try {
    const response = await api.post<AIResponse>('/ai/detect-type', { content }, { suppressErrorToast: true });
    return response.data.result || 'unknown';
  } catch (error: any) {
    throw handleAIError(error, 'detect content type');
  }
};
