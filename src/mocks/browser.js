import { setupWorker } from 'msw';
import { handlers } from './handlers';

// Setup the service worker for the browser
export const worker = setupWorker(...handlers);
