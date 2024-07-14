const path = require('path');
const withPWA = require('next-pwa')({
  dest: 'public',
});

const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    domains: ['localhost'],
  },
};

module.exports = withPWA(nextConfig);
