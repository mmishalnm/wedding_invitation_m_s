import type { NextConfig } from 'next';
const config: NextConfig = {allowedDevOrigins:['0.0.0.0'],serverExternalPackages:['passkit-generator'],outputFileTracingIncludes:{'/api/wallet':['./public/wallet/**/*']}};
export default config;
