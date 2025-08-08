const isProd = process.env.NODE_ENV === 'production';

const baseConfig = {
  output: 'export',
  distDir: 'dist',
  images: {
    unoptimized: true,
  },
};

let nextConfig = baseConfig;

if (isProd) {
  const withNextJsObfuscator = require("nextjs-obfuscator")(
    /* obfuscatorOptions */ {},
    /* pluginOptions */ {}
  );
  nextConfig = withNextJsObfuscator(baseConfig);
}

module.exports = nextConfig;