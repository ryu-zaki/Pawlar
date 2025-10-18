import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'capacitor_prac',
  webDir: 'dist',
  server: {
<<<<<<< HEAD
    url: "http://192.168.123.214:5173/",
=======
    url: "http://192.168.123.150:5173",
>>>>>>> 0a491ce22c835a948e117f7484cd750eb05353b6
    cleartext: true
  }
};

export default config;
