/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["s3.ap-southeast-1.amazonaws.com", "storage.geni.mn"],
  },
};

export default nextConfig;
