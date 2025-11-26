'use client';

import { useEffect, useState, useRef } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const targetLanguage = 'en';

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
      console.log(e.data);
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
      console.error('Translator API is not available in this browser');
      setPendingTranslation(null);
      return;
    }

    try {
      setIsTranslatorLoading(true);

      const translator = await Translator.create({
        sourceLanguage: language,
        targetLanguage: targetLanguage,
        monitor(m: any) {
          m.addEventListener('downloadprogress', (progress: any) => {
            const percentComplete = Math.round(progress.loaded * 100);
            console.log(
              `Translator download progress for ${language}: ${percentComplete}%`
            );
          });
        },
      });

      translators.current.set(language, translator);
      setIsTranslatorLoading(false);

      // Now translate and send the message
      const translatedContent = await translator.translate(message);
      const userMessage: Message = { role: 'user', content: translatedContent };
      setMessages((prev) => [...prev, userMessage]);
      worker.current?.postMessage({ messages: [...messages, userMessage] });
      setIsLoading(true);
      setPendingTranslation(null);
    } catch (error) {
      console.error('Error downloading translator:', error);
      setIsTranslatorLoading(false);
      setPendingTranslation(null);
    }
  };

  const sendMessage = async () => {
    let content = input.trim();
    if (!content || !worker.current || isLoading) return;

    const detectedLanguage = await getLanguageDetector(content);
    console.log('Detected language:', detectedLanguage);

    if (detectedLanguage !== targetLanguage) {
      const result = await getTranslator(detectedLanguage);

      if (result.needsDownload) {
        // Set pending translation and prompt user to download
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
      {/* Chat Window */}
      {showDialog && (
        <div className="w-80 h-96 bg-white dark:bg-gray-800 rounded-lg shadow-2xl flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out transform origin-bottom-right">
          <div className="bg-blue-600 p-3 text-white font-semibold flex justify-between items-center shadow-md">
            <div className="flex flex-col">
              <span>SmolLM v2 Chat</span>
            </div>
            <button
              onClick={() => setShowDialog(false)}
              className="p-1 hover:bg-blue-700 rounded-full transition-colors focus:outline-none"
              aria-label="Close chat"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 dark:bg-gray-900">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-2 text-sm shadow-sm ${
                    msg.role === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-600'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-2 text-sm text-gray-500 animate-pulse">
                  Thinking...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex gap-2">
            {!modelDownloaded ? (
              <div className="w-full flex flex-col gap-2">
                <button
                  onClick={downloadModel}
                  disabled={isModelLoading}
                  className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-sm active:scale-95 ${isModelLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
                >
                  {isModelLoading ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Downloading...{' '}
                      {progress > 0 && `${Math.round(progress)}%`}
                    </>
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                      Download Model
                    </>
                  )}
                </button>
                <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                  Required for offline AI chat
                </p>
              </div>
            ) : (
              <>
                {pendingTranslation ? (
                  <div className="w-full flex flex-col gap-2 mb-2">
                    <div className="text-xs text-gray-600 dark:text-gray-400 text-center">
                      Translation needed for{' '}
                      {pendingTranslation?.language?.toUpperCase()} → EN
                    </div>
                    <button
                      onClick={downloadPendingTranslator}
                      disabled={isTranslatorLoading}
                      className={`w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-sm active:scale-95 ${isTranslatorLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
                    >
                      {isTranslatorLoading ? (
                        <>
                          <svg
                            className="animate-spin h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Downloading Translator...
                        </>
                      ) : (
                        <>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                            />
                          </svg>
                          Download Translator & Send
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => setPendingTranslation(null)}
                      className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
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
                        isModelLoading ? 'Initializing...' : 'Type a message...'
                      }
                      disabled={
                        isModelLoading || isLoading || !!pendingTranslation
                      }
                      className="flex-1 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                    <button
                      onClick={sendMessage}
                      disabled={
                        isModelLoading ||
                        isLoading ||
                        !input.trim() ||
                        !!pendingTranslation
                      }
                      className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5"
                      >
                        <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                      </svg>
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setShowDialog(!showDialog)}
        className={`p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
          showDialog
            ? 'bg-gray-200 text-gray-600 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
        aria-label={showDialog ? 'Close chat' : 'Open chat'}
      >
        {showDialog ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        )}
      </button>
    </div>
  );
};

export default Chat;
