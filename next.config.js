/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers () {
        return [
            {   // all endpoints in app
                source:"/:path*",
                headers:[
                    { key: 'referrer-policy', value:'no-referrer'}
                ]
            }
        ]
    }
}

module.exports = nextConfig
