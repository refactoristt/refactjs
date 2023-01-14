import { DEBUG } from '../config';
import { IS_ANDROID, IS_IOS, IS_SERVICE_WORKER_SUPPORTED } from './environment';

type WorkerAction = {
  type: string;
  payload: Record<string, any>;
};

function handleWorkerMessage(e: MessageEvent) {
  const action: WorkerAction = e.data;
  if (!action.type) return;
  const payload = action.payload;
  switch (action.type) {
    case 'focusMessage':
      break;
    case 'playNotificationSound':
      break;
    case 'share':
      break;
  }
}

function subscribeToWorker() {
  navigator.serviceWorker.removeEventListener('message', handleWorkerMessage);
  navigator.serviceWorker.addEventListener('message', handleWorkerMessage);
  // Notify web worker that client is ready to receive messages
}

if (IS_SERVICE_WORKER_SUPPORTED) {
  window.addEventListener('load', async () => {
    try {
      if (!navigator.serviceWorker.controller) {
        const registrations = await navigator.serviceWorker.getRegistrations();
        if (registrations.length) {
          if (DEBUG) {
            // eslint-disable-next-line no-console
            console.log('[SW] Hard reload detected, re-enabling Service Worker');
          }
          await Promise.all(registrations.map((r) => r.unregister()));
        }
      }

      await navigator.serviceWorker.register(new URL('../serviceWorker.ts', import.meta.url));

      if (DEBUG) {
        // eslint-disable-next-line no-console
        console.log('[SW] ServiceWorker registered');
      }

      await navigator.serviceWorker.ready;

      if (navigator.serviceWorker.controller) {
        if (DEBUG) {
          // eslint-disable-next-line no-console
          console.log('[SW] ServiceWorker ready');
        }
        subscribeToWorker();
      } else {
        if (DEBUG) {
          // eslint-disable-next-line no-console
          console.error('[SW] ServiceWorker not available');
        }

        if (!IS_IOS && !IS_ANDROID) {
          //Service worker is disabled here
        }
      }
    } catch (err) {
      if (DEBUG) {
        // eslint-disable-next-line no-console
        console.error('[SW] ServiceWorker registration failed: ', err);
      }
    }
  });
  window.addEventListener('focus', async () => {
    await navigator.serviceWorker.ready;
    subscribeToWorker();
  });
}
