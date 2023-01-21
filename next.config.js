/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images:{
    domains:["help.twitter.com","images.unsplash.com","i0.wp.com","assets-varnish.triblive.com","cdn.cms-twdigitalassets.com" ]
  }
}

module.exports = nextConfig
