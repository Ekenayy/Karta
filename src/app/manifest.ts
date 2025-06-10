import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Karta',
    short_name: 'Karta',
    description: 'A Progressive Web App built with Next.js',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    scope: '/',
    lang: 'en',
    categories: ['productivity', 'utilities'],
    icons: [
      {
        src: 'icons/icon128.png',
        sizes: '128x128',
        type: 'image/png',
      },
      {
        src: 'icons/icon16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        src: 'icons/icon48.png',
        sizes: '48x48',
        type: 'image/png',
      }
    ],
  }
} 