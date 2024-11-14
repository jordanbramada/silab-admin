module.exports = {
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gecvazcrnffiacnkebev.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/images-dev/**",
      },
    ],
  },
};
