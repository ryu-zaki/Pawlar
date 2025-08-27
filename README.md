# Pawlar

Pawlar is a cross-platform pet technology application built with **React, Vite, and Capacitor**.  
It helps pet owners manage feeding schedules, track activities, and integrate with smart devices like feeders and doors — all in one ecosystem.  

---

## Features

- **Cross-platform support**: Android, iOS, and Web  
- **Pet profiles**: Manage multiple pets in one place  
- **Smart feeding**: Schedule and monitor feeding times  
- **Smart door tracking**: Monitor when pets go in/out  
- **Reports**: Feeding history, activity logs, and insights  
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

cd frontend
npm install
npm run dev

## To build for mobile:

npm run build
npx cap sync
npx cap open android   # or ios

## Backend (Node + Express)

cd backend
npm install
npm run dev