# Real Estate App (Expo + Appwrite)

A modern Real Estate mobile application built while learning React Native with Expo, OAuth authentication, and backend integration using Appwrite.

This project demonstrates how to build a full-stack mobile app with authentication, database management, and clean UI using Tailwind-style utilities.

## Features

1. Google OAuth Authentication
2. User login & logout
3. Browse and explore properties
4. Search properties
5. Property details with images
6. Responsive mobile UI using NativeWind
7. Fast performance with Expo

## What I Learned

- How OAuth works (Google Sign-In flow)
- Integrating authentication with Appwrite (BaaS)
- Managing backend (database, collections, relations)
- Building scalable UI using NativeWind (Tailwind CSS for React Native)
- Handling async data fetching and state
- Structuring a real-world React Native app
- Loading and managing custom fonts in Expo using useFonts

## Tech Stack

- **Frontend**: React Native (Expo)
- **Styling**: NativeWind (Tailwind CSS)                                              
- **Backend**: Appwrite
- **Authentication**: Google OAuth via Appwrite
- **Navigation**: Expo Router

## Authentication Flow

1. User clicks Login with Google
2. OAuth request is sent via Appwrite
3. User selects Google account
4. Appwrite handles authentication
5. Session is created and stored
6. User is logged into the app

## Project Setup

### 1️⃣ Clone the repository

```bash
git clone <https://github.com/Altamash-khn/real-estate-app.git>
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Environment Variables

Create a `.env` file and add your credentials:

```env
EXPO_PUBLIC_APPWRITE_PROJECT_ID=YOUR_API_KEY
EXPO_PUBLIC_APPWRITE_PROJECT_NAME=YOUR_API_KEY
EXPO_PUBLIC_APPWRITE_ENDPOINT=YOUR_API_KEY
EXPO_PUBLIC_APPWRITE_DATABASE_ID=YOUR_API_KEY
EXPO_PUBLIC_APPWRITE_AGENTS_COLLECTION_ID=YOUR_API_KEY
EXPO_PUBLIC_APPWRITE_GALLERIES_COLLECTION_ID=YOUR_API_KEY
EXPO_PUBLIC_APPWRITE_REVIEWS_COLLECTION_ID=YOUR_API_KEY
EXPO_PUBLIC_APPWRITE_PROPERTIES_COLLECTION_ID=YOUR_API_KEY
```

> ⚠️ Make sure to replace these values with your **own keys**.

---

### 4️⃣ Run the app

```bash
npx expo start
```
