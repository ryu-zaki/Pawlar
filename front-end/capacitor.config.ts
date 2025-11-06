import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'Pawlar',
  webDir: 'dist',
  server: {
    url: "https://pawlar.onrender.com/",
    cleartext: true
  },
  plugins: {
    SocialLogin: {
      google: {
        clientId: '824231704072-gsrcn341ikphj2a0n5deb86q4t83qbgr.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      },
    },
  },  
};

export default config;
