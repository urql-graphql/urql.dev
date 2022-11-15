export const getCanonicalUrl = async (url = '') => {
  let targetUrl: string | null = url;
  while (targetUrl) {
    const response = await fetch(targetUrl, {
      redirect: 'manual',
    });

    if (response.status % 300 < 100) {
      targetUrl = response.headers.get('location') || null;
    } else if (response.status % 200 < 100) {
      return targetUrl;
    }
  }

  return targetUrl;
};
