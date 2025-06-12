'use client';

import { accessTokenAtom } from '@/store';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { useAtomValue } from 'jotai';
import { Dispatch, useRef } from 'react';

export function useSSE(
  url: string,
  onMessage: (message: string) => void,
  setIsConnecting: Dispatch<React.SetStateAction<boolean>>,
  setIsTyping: Dispatch<React.SetStateAction<boolean>>,
) {
  const eventSourceRef = useRef<EventSourcePolyfill | null>(null);

  const accessToken = useAtomValue(accessTokenAtom);

  const connect = () => {
    eventSourceRef.current?.close();

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

    eventSource.onmessage = (e) => {
      const message = e.data;

      onMessage(message);
    };

    eventSource.addEventListener('done', () => {
      console.log('[SSE EventSource] Received answer done');
      setIsConnecting(false);
      setIsTyping(false);
    });

    eventSource.addEventListener('stream-end', () => {
      eventSource.close();
      console.log(
        '[SSE EventSource] Received stream-end event, trying to reconnect',
      );
      connect();
    });

    eventSource.onerror = (e) => {
      console.log('[SSE EventSource] Error', e);

      eventSource.close();
      setTimeout(connect, 3000);
    };

    eventSourceRef.current = eventSource;
  };

  return {
    eventSourceRef,
    connect,
  };
}
