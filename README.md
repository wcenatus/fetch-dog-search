# Take-Home Assessment

## Overview

This is a React Vite project for a take-home assessment. The purpose of this project is to evaluate your ability to build a front-end application using modern web development tools and best practices.

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
