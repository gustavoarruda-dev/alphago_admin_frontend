import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';

afterEach(() => {
  cleanup();
});

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn(),
  removeItem: vi.fn(),
};

Object.defineProperty(global, 'localStorage', {
  value: localStorageMock,
});

// Recharts (ResponsiveContainer) requires ResizeObserver in the browser.
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

Object.defineProperty(global, 'ResizeObserver', {
  value: ResizeObserverMock,
});

// JSDOM doesn't compute layout, so chart libs may see a 0x0 container and warn.
// Provide a stable non-zero rect to keep test output clean.
Object.defineProperty(HTMLElement.prototype, 'getBoundingClientRect', {
  value() {
    return {
      x: 0,
      y: 0,
      top: 0,
      left: 0,
      right: 1024,
      bottom: 768,
      width: 1024,
      height: 768,
      toJSON() {},
    };
  },
});

// JSDOM doesn't implement HTMLElement.scrollTo. Some components use it to keep
// chat/feed views pinned to the latest content.
Object.defineProperty(HTMLElement.prototype, 'scrollTo', {
  value: vi.fn(),
  writable: true,
});

