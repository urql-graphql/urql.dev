export const BASE_HEADERS = { 'access-control-allow-origin': '*' };

export const HTML_HEADERS = {
  ...BASE_HEADERS,
  'content-type': 'text/html; charset=utf-8',
};

export const CF_CACHE = (caches as any).default;

export const SHORT_CACHE_TTL = 60 * 30; /* 30min */
export const LONG_CACHE_TTL = 60 * 60 * 24 * 365; /* 1y */
export const MAX_BYTE_SIZE = 1024 * 1024 * 2 - 128; /* <2MB */
export const SHORT_CACHE_CONTROL = 'public, s-max-age=600, max-age: 60';
export const LONG_CACHE_CONTROL = 'public, max-age=31536000';
