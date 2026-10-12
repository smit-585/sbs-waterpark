export const siteConfig = {
  name: 'SBS Water Park',
  tagline: 'Fun. Adventure. Memories.',
  // [LOGO]: Web path pointing to your logo in client/public/images/
  logoUrl: '/assets/logo1.png',
  phone: '+919890137030',
  whatsapp: '+918459663672',
  email: 'sbswaterpark585@gmail.com',
  instagram: '@sbswaterpark',
  instagramUrl: 'https://www.instagram.com/sbswaterpark',
  address: 'Pulgaon, Wardha District, Maharashtra, India',
  mapsUrl: 'https://maps.app.goo.gl/UEGQasKHPbP8dd8H6?g_st=iw',
  timings: '11:00 AM – 4:00 PM',
  apiUrl: (() => {
    let url = (import.meta.env.VITE_API_URL || '/api').trim().replace(/\/+$/, '');
    if (url.startsWith('http') && !url.endsWith('/api')) {
      url = `${url}/api`;
    }
    return url;
  })(),
};
