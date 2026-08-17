export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://www.atayr.com/sitemap.xml', // IMPORTANT: Update with your actual production domain
  }
}
