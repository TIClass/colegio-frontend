import { getServerSideSitemap } from 'next-sitemap';
export const getServerSideProps = async (ctx) => {
  const locationParts = ctx.req.headers.host.split('.');
  const subdomain = locationParts[0]

  const urlReferer = ctx.req.headers.referer
  const urlHost = ctx.req.headers.host

  const useToken = `Token ${process.env.TOKEN_GENERIC_API}`
  const url = `${process.env.API_SEO_URL}api/v1/sitemapapi/?proyect_name=${subdomain}`

  const options = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': useToken
    }
  }

  const res = await fetch(url, options)
  const data = await res.json()

  const fields = data.packs.map(item => ({
      loc: `https://${urlHost}${item.url}`,
      lastmod: item.lastmod,
      changefreq: item.changefreq,
      priority: item.priority
  }));

  return getServerSideSitemap(ctx, fields);
};
export default function Site() { }
