'use client';

import { useEffect, useState, useRef } from 'react';
import {
  ChevronDown,
  Download,
  Loader2,
  MessageSquare,
  SendHorizontal,
  Sparkles,
  X,
} from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const targetLanguage = 'en';

const FOCUS_RING =
  'focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 outline-none';

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [modelDownloaded, setModelDownloaded] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isTranslatorLoading, setIsTranslatorLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isModelLoading, setIsModelLoading] = useState(false);
  const [pendingTranslation, setPendingTranslation] = useState<{
    language: string;
    message: string;
  } | null>(null);
  const worker = useRef<Worker | null>(null);
  const initiated = useRef(false);
  const translators = useRef<Map<string, any>>(new Map());
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    if (!worker.current) {
      worker.current = new Worker('/worker.js', {
        type: 'module',
      });
    }

    const onMessageReceived = (e: any) => {
      switch (e.data.status) {
        case 'initiate':
          setIsModelLoading(true);
          break;
        case 'progress':
          setProgress(e.data.progress);
          break;
        case 'complete':
          setIsLoading(false);
          if (e.data?.output?.[0]?.generated_text) {
            const response = e.data?.output[0].generated_text.at(-1).content;
            setMessages((prev) => [
              ...prev,
              { role: 'assistant', content: response },
            ]);
          }
          break;
        case 'ready':
          setIsModelLoading(false);
          setModelDownloaded(true);
          setIsLoading(false);
          break;
      }
    };

    worker.current.addEventListener('message', onMessageReceived);

    return () =>
      worker.current?.removeEventListener('message', onMessageReceived);
  }, []);

  const downloadModel = () => {
    if (!initiated.current && worker.current) {
      initiated.current = true;
      worker.current.postMessage({ text: 'initiate' });
    }
  };

  const getLanguageDetector = async (input: string): Promise<string> => {
    if (!input.trim()) {
      return targetLanguage;
    }

    if ('LanguageDetector' in self) {
      const available = await LanguageDetector.availability();
      if (!available) {
        return targetLanguage;
      }
      const detector = await LanguageDetector.create();
      const result = await detector.detect(input);
      return result[0].detectedLanguage || targetLanguage;
    }
    return targetLanguage;
  };

  const getTranslator = async (
    sourceLanguage: string
  ): Promise<{ translator?: any; needsDownload: boolean }> => {
    if (translators.current.has(sourceLanguage)) {
      return {
        translator: translators.current.get(sourceLanguage),
        needsDownload: false,
      };
    }

    if ('Translator' in self) {
      const availability = await Translator.availability({
        sourceLanguage,
        targetLanguage: targetLanguage,
      });

      if (availability === 'available') {
        const translator = await Translator.create({
          sourceLanguage,
          targetLanguage: targetLanguage,
        });
        translators.current.set(sourceLanguage, translator);
        return { translator, needsDownload: false };
      }

      if (availability === 'downloadable' || availability === 'downloading') {
        return { needsDownload: true };
      }
    }

    return { needsDownload: false };
  };

  const downloadPendingTranslator = async () => {
    if (!pendingTranslation) return;

    const { language, message } = pendingTranslation;

    if (!('Translator' in self)) {
      setPendingTranslation(null);
      return;
    }

    try {
      setIsTranslatorLoading(true);

      const translator = await Translator.create({
        sourceLanguage: language,
        targetLanguage: targetLanguage,
      });

      translators.current.set(language, translator);
      setIsTranslatorLoading(false);

      const translatedContent = await translator.translate(message);
      const userMessage: Message = { role: 'user', content: translatedContent };
      setMessages((prev) => [...prev, userMessage]);
      worker.current?.postMessage({ messages: [...messages, userMessage] });
      setIsLoading(true);
      setPendingTranslation(null);
    } catch (_) {
      setIsTranslatorLoading(false);
      setPendingTranslation(null);
    }
  };

  const sendMessage = async () => {
    let content = input.trim();
    if (!content || !worker.current || isLoading) return;

    const detectedLanguage = await getLanguageDetector(content);

    if (detectedLanguage !== targetLanguage) {
      const result = await getTranslator(detectedLanguage);

      if (result.needsDownload) {
        setPendingTranslation({ language: detectedLanguage, message: content });
        setInput('');
        return;
      }

      if (result.translator) {
        content = await result.translator.translate(content);
      }
    }

    const userMessage: Message = { role: 'user', content };
    setMessages((prev) => [...prev, userMessage]);
    worker.current.postMessage({ messages: [...messages, userMessage] });
    setInput('');
    setIsLoading(true);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end space-y-4">
      {showDialog && (
        <div
          className="glassmorphic-card w-80 h-96 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          role="dialog"
          aria-label="Chat with on-device assistant"
        >
          <div className="flex justify-between items-center px-4 py-3 border-b border-border-light dark:border-border-dark">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-blue-700 text-white">
                <Sparkles className="h-4 w-4" aria-hidden />
              </span>
              <div className="leading-tight">
                <p className="text-sm font-semibold text-content-light dark:text-content-dark">
                  Ask my résumé
                </p>
                <p className="text-[10px] text-subtext-light dark:text-subtext-dark">
                  SmolLM v2 · on-device
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowDialog(false)}
              className={`inline-flex h-9 w-9 items-center justify-center rounded-md text-content-light dark:text-content-dark hover:bg-card-light dark:hover:bg-card-dark transition-colors ${FOCUS_RING}`}
              aria-label="Close chat"
            >
              <X className="h-4 w-4" aria-hidden />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-background-light/40 dark:bg-background-dark/40">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
                    msg.role === 'user'
                      ? 'bg-primary text-white rounded-br-sm'
                      : 'bg-card-light dark:bg-card-dark text-content-light dark:text-content-dark border border-border-light dark:border-border-dark rounded-bl-sm'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-card-light dark:bg-card-dark text-subtext-light dark:text-subtext-dark border border-border-light dark:border-border-dark rounded-2xl rounded-bl-sm px-3 py-2 text-sm animate-pulse">
                  Thinking…
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-2.5 border-t border-border-light dark:border-border-dark flex gap-2">
            {!modelDownloaded ? (
              <div className="w-full flex flex-col gap-2">
                <button
                  onClick={downloadModel}
                  disabled={isModelLoading}
                  className={`w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary/90 active:scale-[0.98] disabled:opacity-75 disabled:cursor-not-allowed ${FOCUS_RING}`}
                >
                  {isModelLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                      Downloading… {progress > 0 && `${Math.round(progress)}%`}
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4" aria-hidden />
                      Download model
                    </>
                  )}
                </button>
                <p className="text-xs text-center text-subtext-light dark:text-subtext-dark">
                  Required for offline AI chat
                </p>
              </div>
            ) : pendingTranslation ? (
              <div className="w-full flex flex-col gap-2">
                <p className="text-xs text-subtext-light dark:text-subtext-dark text-center">
                  Translation needed for{' '}
                  {pendingTranslation.language?.toUpperCase()} → EN
                </p>
                <button
                  onClick={downloadPendingTranslator}
                  disabled={isTranslatorLoading}
                  className={`w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary/90 active:scale-[0.98] disabled:opacity-75 disabled:cursor-not-allowed ${FOCUS_RING}`}
                >
                  {isTranslatorLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                      Downloading translator…
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4" aria-hidden />
                      Download translator &amp; send
                    </>
                  )}
                </button>
                <button
                  onClick={() => setPendingTranslation(null)}
                  className={`text-xs text-subtext-light dark:text-subtext-dark hover:text-content-light dark:hover:text-content-dark rounded ${FOCUS_RING}`}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <input
                  type="text"
                  value={input}
                  autoFocus
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder={
                    isModelLoading ? 'Initializing…' : 'Ask something…'
                  }
                  disabled={isModelLoading || isLoading || !!pendingTranslation}
                  aria-label="Message"
                  className={`flex-1 rounded-lg border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark px-3 py-2 text-sm text-content-light dark:text-content-dark placeholder:text-subtext-light dark:placeholder:text-subtext-dark transition-all ${FOCUS_RING}`}
                />
                <button
                  onClick={sendMessage}
                  disabled={
                    isModelLoading ||
                    isLoading ||
                    !input.trim() ||
                    !!pendingTranslation
                  }
                  aria-label="Send message"
                  className={`inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white shadow-sm transition-all hover:bg-primary/90 active:scale-[0.95] disabled:opacity-50 disabled:cursor-not-allowed ${FOCUS_RING}`}
                >
                  <SendHorizontal className="h-4 w-4" aria-hidden />
                </button>
              </>
            )}
          </div>
        </div>
      )}

      <button
        onClick={() => setShowDialog((s) => !s)}
        className={`inline-flex h-12 w-12 items-center justify-center rounded-full shadow-lg shadow-primary/30 transition-all duration-200 active:scale-95 ${
          showDialog
            ? 'bg-card-light dark:bg-card-dark text-content-light dark:text-content-dark hover:bg-border-light dark:hover:bg-border-dark border border-border-light dark:border-border-dark'
            : 'bg-primary text-white hover:bg-primary/90'
        } ${FOCUS_RING}`}
        aria-label={showDialog ? 'Close chat' : 'Open chat'}
        aria-expanded={showDialog}
      >
        {showDialog ? (
          <ChevronDown className="h-5 w-5" aria-hidden />
        ) : (
          <MessageSquare className="h-5 w-5" aria-hidden />
        )}
      </button>
    </div>
  );
};

export default Chat;
