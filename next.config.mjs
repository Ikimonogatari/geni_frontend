/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "s3.ap-southeast-1.amazonaws.com",
      "storage.geni.mn",
      "s3.qpay.mn",
      "qpay.mn",
      "vix-public.s3.ap-southeast-1.amazonaws.com",
    ],
  },
};

export default nextConfig;
