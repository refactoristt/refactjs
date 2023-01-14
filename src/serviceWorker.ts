import {DEBUG} from "./config";

declare const self: ServiceWorkerGlobalScope;

const RE_CACHE_FIRST_ASSETS = /[\da-f]{20}.*\.(js|css|woff2?|svg|png|jpg|jpeg|tgs|json|wasm)$/;
const ACTIVATE_TIMEOUT = 3000;

self.addEventListener('install', (e) => {
  if (DEBUG) {
    // eslint-disable-next-line no-console
    console.log('ServiceWorker installed');
  }

  // Activate worker immediately
  e.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (e) => {
  if (DEBUG) {
    // eslint-disable-next-line no-console
    console.log('ServiceWorker activated');
  }

});

self.addEventListener('fetch', (e: FetchEvent) => {
  const { url } = e.request;

  return false;
});

self.addEventListener('push', () => {});
self.addEventListener('notificationclick', () => {});
self.addEventListener('message', (event) => {

});
