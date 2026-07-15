import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

export default defineConfig({
  site: 'https://lukemorrow.me',
  integrations: [sitemap()],
  redirects: {
    '/blog': '/',
    '/blog/welcome-to-my-site': '/',
    '/blog/adding-google-analytics': '/',
  },
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },
});
