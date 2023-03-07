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

function redirect(url: string) {
  const { origin } = new URL(url);

  const body = html`
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta http-equiv="refresh" content="0; URL=${url}" />
        <link rel="canonical" href="${url}" />
        <link rel="preconnect" href="${origin}" crossorigin />
        <title>urql-graphql/urql</title>
      </head>
    </html>
  `;

  return new Response(body, {
    status: 302,
    headers: {
      ...env.HTML_HEADERS,
      'cache-control': env.SHORT_CACHE_CONTROL,
      location: url,
    }
  });
}


router.get('/', async () => {
  return redirect('https://github.com/urql-graphql/urql');
});

router.get('/discord', async () => {
  return redirect('https://discord.gg/NzUrbgz2dP');
});

router.get('/goto/:tag/', gotoHandler);
router.get('/goto/:tag', gotoHandler);

export { router };
