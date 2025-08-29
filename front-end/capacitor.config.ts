import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'pawlar',
  webDir: 'dist',

  server: {
    url: "http://192.168.0.102:5173",
    cleartext: true
  }
};

export default config;
