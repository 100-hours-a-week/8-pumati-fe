'use client';

import { accessTokenAtom } from '@/store';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { useAtomValue } from 'jotai';
import { useRef, useState } from 'react';

export function useSSE(
  url: string,
  onMessage: (message: string) => void,
  onError: () => void,
) {
  const eventSourceRef = useRef<EventSourcePolyfill | null>(null);

  const [isConnecting, setIsConnecting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isError, setIsError] = useState(false);

  const accessToken = useAtomValue(accessTokenAtom);

  const connect = () => {
    eventSourceRef.current?.close();

    if (isError) {
      setIsError(false);
    }

    setIsConnecting(true);

    const eventSource = new EventSourcePolyfill(url, {
      headers: accessToken
        ? {
            Authorization: `Bearer ${accessToken}`,
          }
        : undefined,
      withCredentials: true,
    });

    eventSource.onopen = () => {
      console.log('[SSE EventSource] Opened');
      setIsConnecting(false);
    };

    eventSource.addEventListener('typing', () => {
      setIsTyping(true);
    });

    eventSource.onmessage = (e) => {
      const message = e.data;

      onMessage(message);
    };

    eventSource.addEventListener('done', () => {
      console.log('[SSE EventSource] Received answer done');
      setIsConnecting(false);
      setIsTyping(false);
      setIsLoading(false);
    });

    eventSource.addEventListener('timeout', () => {
      eventSource.close();
      console.log(
        '[SSE EventSource] Received timeout event, trying to reconnect',
      );
      connect();
    });

    eventSource.onerror = (e) => {
      console.log('[SSE EventSource] Error', e);

      eventSource.close();
      setIsError(true);
      onError();
    };

    eventSourceRef.current = eventSource;
  };

  return {
    eventSourceRef,
    isConnecting,
    isTyping,
    setIsTyping,
    isLoading,
    setIsLoading,
    isError,
    connect,
  };
}
