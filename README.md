# Data Visualization Platform

A responsive web application for data visualization and analysis with Firebase authentication and interactive charts.

## Features

- **Firebase Authentication** - Google OAuth and email/password authentication
- **Interactive Charts** - Data visualization using Chart.js
- **Responsive Design** - Optimized for all screen sizes with desktop-first approach
- **Screens** - Dashboard screen, Silde-over card interaction, Details screen, Variable selection interaction, sign in and sign up screens
- **State Management** - Redux Toolkit for application state
- **Modern UI** - Styled with styled-components

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd data-viz-platform
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
VITE_FIREBASE_API_KEY=AIzaSyBXCKkhucY8bfuTYOsQSH17uW6clS7jyAU
VITE_FIREBASE_AUTH_DOMAIN=data-viz-platform-f5e44.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=data-viz-platform-f5e44
VITE_FIREBASE_STORAGE_BUCKET=data-viz-platform-f5e44.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=1078737055984
VITE_FIREBASE_APP_ID=1:1078737055984:web:e1db9b17f862c36f441235
```

### 4. Start Development Server

```bash
npm run dev
```

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Styled Components
- **State Management**: Redux Toolkit
- **Charts**: Chart.js with react-chartjs-2
- **Authentication**: Firebase Auth
- **Routing**: React Router
- **Build Tool**: Vite

## Project Structure

```
  src/
  ├── components/ # Reusable UI components
  │ ├── auth/ # Authentication components
  │ ├── dashboard/ # Dashboard-specific components
  │ └── header/ # Header components
  ├── firebase/ # Firebase configuration
  ├── hooks/ # Custom React hooks
  ├── slices/ # Redux slices
  ├── styles/ # Shared styles
  └── types/ # TypeScript type definitions
```

## Responsive Design

The application uses a **desktop-first responsive approach** with standardized breakpoints:

- **Large Desktop**: 1440px+ (Default styles)
- **Desktop**: 1024px - 1440px
- **Tablet**: 768px - 1024px
- **Mobile**: 480px - 768px
- **Small Mobile**: < 480px

## Known Limitations

- Uses dummy data for visualization (no backend integration)
- Network error states not implemented due to mock data usage

## Development Time

Approximately **6 hours** total development time, including:

- Firebase authentication setup
- Responsive design implementation
- Chart integration and styling
- State management setup

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request
