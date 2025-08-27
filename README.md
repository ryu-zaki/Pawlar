# Pawlar

Pawlar is a cross-platform pet technology application built with **React, Vite, and Capacitor**.  
It helps pet owners manage feeding schedules, track activities, and integrate with smart devices like feeders and doors — all in one ecosystem.  

---

## Features

- **Cross-platform support**: Android, iOS, and Web  
- **Pet profiles**: Manage multiple pets in one place  
- **Smart feeding**: Schedule and monitor feeding times  
- **Smart door tracking**: Monitor when pets go in/out  
- **Reports**: Feeding history and activity logs
- **Push notifications**: Reminders and alerts  

---

## Tech Stack

- **Frontend**: [React](https://react.dev/) + [Vite](https://vitejs.dev/) + [Ionic](https://ionicframework.com/)  
- **Native Bridge**: [Capacitor](https://capacitorjs.com/)  
- **Backend**: [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/)  
- **Database**: (e.g., MongoDB / PostgreSQL — specify once finalized)  

---

## 📂 Project Structure

├── **backend**/ # Node.js + Express backend API 

├── **frontend**/ # React + Vite + Capacitor frontend app  

├── **README.md** # Project documentation


## Frontend (React + Vite + Capacitor)
```bash
cd frontend
npm install # install project dependencies
npm run dev # start Vite dev server
```

## To build for mobile:

```bash
npm run build
npx cap sync # sync web build with native platforms (ios / android)
npx cap open android # open Android project in Android Studio
npx cap open iso # open iOS project in Xcode
```

## Backend (Node + Express)

```bash
cd backend
npm install # install backend dependencies
npm run dev # start Express server in dev mode