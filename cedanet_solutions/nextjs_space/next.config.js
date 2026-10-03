const path = require('path');

// Next.js 14 inyecta scripts y estilos inline, por eso 'unsafe-inline'.
const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  'upgrade-insecure-requests',
].join('; ');

const securityHeaders = [
  { key: 'Content-Security-Policy', value: contentSecurityPolicy },
  { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: process.env.NEXT_DIST_DIR || '.next',
  output: process.env.NEXT_OUTPUT_MODE,
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
  // Enlaces cortos para dictar o imprimir (cedanet.net/heybee): sin DNS nuevo, la web de Cedanet
  // reenvía a la página de cada producto. Temporales (307) para poder cambiar el destino.
  async redirects() {
    const destinos = {
      heybee: 'https://integ.cedanet.net/hey-bee?src=corto',
      heyrest: 'https://integ.cedanet.net/hey-rest',
      heymed: 'https://integ.cedanet.net/hey-med',
      integ: 'https://integ.cedanet.net/site-web',
    };
    return Object.entries(destinos).flatMap(([corto, destination]) => {
      const conGuion = corto.replace(/^hey/, 'hey-');
      const rutas = conGuion === corto ? [corto] : [corto, conGuion];
      return rutas.map((ruta) => ({ source: `/${ruta}`, destination, permanent: false }));
    });
  },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
  experimental: {
    outputFileTracingRoot: path.join(__dirname, '../'),
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: { formats: ['image/avif', 'image/webp'] },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.output.filename = 'static/chunks/[name]-[contenthash:8].js';
      config.output.chunkFilename = 'static/chunks/[contenthash:16].js';
    }
    return config;
  },
};

module.exports = nextConfig;
