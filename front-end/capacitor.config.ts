import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.pawlar.app',
  appName: 'Pawlar',
  webDir: 'dist',
  server: {
    url: "https://pawlar.onrender.com/",
    cleartext: true
  }
};

export default config;
