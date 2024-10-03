/** @type {import('next').NextConfig} */
const nextConfig = {
    env:{
        BASE_URL: process.env.BASE_URL,
        JWT_SECRET: process.env.JWT_SECRET,
    }
}

module.exports = nextConfig
