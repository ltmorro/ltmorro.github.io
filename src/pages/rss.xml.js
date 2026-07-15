import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const projects = await getCollection('projects', ({ data }) => !data.draft);
  const adventures = await getCollection('adventures', ({ data }) => !data.draft);

  const items = [
    ...projects.map((entry) => ({ entry, base: '/projects' })),
    ...adventures.map((entry) => ({ entry, base: '/adventures' })),
  ]
    .sort((a, b) => b.entry.data.date.valueOf() - a.entry.data.date.valueOf())
    .map(({ entry, base }) => ({
      title: entry.data.title,
      description: entry.data.excerpt,
      pubDate: entry.data.date,
      link: `${base}/${entry.id}/`,
    }));

  return rss({
    title: 'Luke Morrow',
    description: 'Projects, writing, and outdoor adventures from Luke Morrow.',
    site: context.site,
    items,
  });
}
