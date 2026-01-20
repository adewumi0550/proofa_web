import { useEffect, useRef, useState } from 'react';

type WebSocketStatus = 'connecting' | 'connected' | 'disconnected' | 'error';

interface UseSocketOptions {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onMessage?: (data: any) => void;
    onError?: (error: Event) => void;
    url?: string;
    token?: string;
}

export function useSocket({ onMessage, onError, url, token }: UseSocketOptions) {
    const [status, setStatus] = useState<WebSocketStatus>('disconnected');
    const socketRef = useRef<WebSocket | null>(null);

    // Keep latest callbacks in refs to avoid re-connecting on callback change
    const onMessageRef = useRef(onMessage);
    const onErrorRef = useRef(onError);

    useEffect(() => {
        onMessageRef.current = onMessage;
        onErrorRef.current = onError;
    }, [onMessage, onError]);

    useEffect(() => {
        if (!url || !token) return;

        // Construct URL with query param for auth if needed, or stick to headers if proxy allows (WS usually needs query params)
        const wsUrl = new URL(url);
        wsUrl.searchParams.append('token', token);

        const ws = new WebSocket(wsUrl.toString());
        socketRef.current = ws;

        setTimeout(() => setStatus('connecting'), 0);

        ws.onopen = () => {
            console.log('WebSocket connected');
            setStatus('connected');
        };

        ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                if (onMessageRef.current) onMessageRef.current(data);
            } catch (e) {
                console.error('Failed to parse WS message', e);
            }
        };

        ws.onerror = (error) => {
            console.error('WebSocket error', error);
            setStatus('error');
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if (onErrorRef.current) onErrorRef.current(error as any);
        };

        ws.onclose = () => {
            console.log('WebSocket disconnected');
            setStatus('disconnected');
        };

        return () => {
            ws.close();
            socketRef.current = null;
        };
    }, [url, token]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sendMessage = (data: any) => {
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            socketRef.current.send(JSON.stringify(data));
        } else {
            console.warn('Cannot send message, WebSocket is not open');
        }
    };

    return { status, sendMessage };
}
