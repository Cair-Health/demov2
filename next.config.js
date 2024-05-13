/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    webpack: (cfg) => {
        cfg.experiments = { ...cfg.experiments, topLevelAwait: true };
        return cfg;
    },
}

module.exports = nextConfig
