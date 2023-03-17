import error from 'http-errors';
import { html } from 'common-tags';

import * as env from '../env';
import { RouteHandler } from '../types';
import { getCanonicalUrl } from '../utils/getCanonicalUrl';

export const gotoHandler: RouteHandler = async (params) => {
  const tag = params[0];
  console.log(tag);
  if (!tag || typeof tag !== 'string') {
    throw error(400);
  }

  let location: string | null = null

  if (/^\d+$/.test(tag)) {
    location = await getCanonicalUrl(`https://github.com/urql-graphql/urql/issues/${tag}`);
  } else if (tag.startsWith('docs')) {
    location = 'https://formidable.com/open-source/urql/' + tag;
    if (!location.endsWith('/')) location += '/';
  }

  if (!location) {
    throw error(404);
  }

  const body = html`
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta http-equiv="refresh" content="0; URL=${location}" />
        <link rel="canonical" href="${location}" />
        <title>Redirecting...</title>
      </head>
    </html>
  `;

  return new Response(body, {
    status: 302,
    headers: {
      ...env.HTML_HEADERS,
      'cache-control': env.LONG_CACHE_CONTROL,
      location,
    }
  });
};
