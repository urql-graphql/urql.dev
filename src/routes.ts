import { Router } from 'tiny-request-router';
import { html } from 'common-tags';

import * as env from './env';
import { RouteHandler } from './types';

import { gotoHandler } from './handlers/gotoHandler';

const router = new Router<RouteHandler>();

router.options('*', async () => {
  return new Response('', {
    status: 200,
    headers: {
      ...env.BASE_HEADERS,
      'cache-control': env.LONG_CACHE_CONTROL,
      'allow': 'OPTIONS, GET, POST'
    }
  });
});

router.get('/', async () => {
  const body = html`
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta http-equiv="refresh" content="0; URL=https://github.com/urql-graphql/urql" />
        <link rel="canonical" href="https://github.com/urql-graphql/urql" />
        <link rel="preconnect" href="https://github.com" crossorigin />
        <title>urql-graphql/urql</title>
      </head>
    </html>
  `;

  return new Response(body, {
    status: 302,
    headers: {
      ...env.HTML_HEADERS,
      'cache-control': env.SHORT_CACHE_CONTROL,
      location: 'https://github.com/urql-graphql/urql',
    }
  });
});

router.get('/goto/:tag/', gotoHandler);
router.get('/goto/:tag', gotoHandler);

export { router };
