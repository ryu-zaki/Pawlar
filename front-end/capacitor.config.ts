import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.pawlar.app',
  appName: 'Pawlar',
  webDir: 'dist',
  server: {
    url: 'http://192.168.0.107:5173/',
    cleartext: true
  }
};

export default config;
