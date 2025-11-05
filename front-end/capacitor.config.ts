import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'capacitor_prac',
  webDir: 'dist',
  server: {
    url: "http://10.221.198.148:5173",
    cleartext: true
  }
};

export default config;
