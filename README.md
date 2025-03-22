# Fetch Dog Search

## Overview

This is a React Vite project built for Fetch. The application fetches dog data from an API and provides an interactive search and filtering experience. Users can filter through available dogs based on various criteria such as breed, age, and location.

## Tech Stack

- **React** (with Vite)
- **TypeScript**
- **Tailwind / MUI Joy**
- **React Context**

## Getting Started

### Prerequisites

Have the following installed on your machine:

- Node.js
- npm

### Installation

Install dependencies:

```sh
npm install
```

Create a .env file can enter the following variable:

```sh
VITE_API_BASE_URL=https://frontend-take-home-service.fetch.com
```

### Running the Application

To start the development server, run:

```sh
npm run dev
```

This will start a local development server at `http://localhost:5173/` (default Vite port).

## Project Structure

```

├── components/   # Reusable UI components
├── pages/        # Route-specific components
├── hooks/        # Custom hooks
├── context/      # Context providers
├── assets/       # Static assets like images
├── styles/       # Global styles
├── App.tsx       # Main application entry
├── main.tsx      # React DOM entry point
```

## Features

- Login: Login using HTTPOnly Cookies from the backend
- Filtering: Filter Dogs by Breed, ZipCodes, Age
- Sorting: Sorting by Breed, Age, Name

## Build for Production

To create a production build, run:

```sh
npm run build
```

Build will be in the `dist/` folder.

## Notes

- Will not work in Incognito.
- Ensure responsiveness and accessibility.
- Document any assumptions or trade-offs you made.
