/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images:{
    domains:["help.twitter.com","randomuser.me","firebasestorage.googleapis.com" , "cdn.pixabay.com" ,"images.unsplash.com","lh3.googleusercontent.com" ,"i0.wp.com","assets-varnish.triblive.com","cdn.cms-twdigitalassets.com" ]
  }
}

module.exports = nextConfig
