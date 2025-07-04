# Habilin Frontend

The frontend application for the Habilin project, built with React, TypeScript, and Vite.

## Tech Stack

- **React 19** - Modern React with latest features
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **Lucide React** - Beautiful icon library
- **SWC** - Fast TypeScript/JavaScript compiler

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── router/        # Routing configuration
├── lib/           # Utility libraries
├── utils/         # Helper functions
├── assets/        # Static assets
├── wrapper/       # Layout wrapper components
├── App.tsx        # Main application component
├── main.tsx       # Application entry point
└── index.css      # Global styles
```

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Navigate to the frontend directory
3. Install dependencies:

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## Features

- Modern React 19 with TypeScript
- Responsive design with Tailwind CSS
- Client-side routing with React Router
- Component-based architecture
- ESLint and Prettier for code quality
- Fast development with Vite and SWC
- Optimized production builds

## Development Guidelines

### Code Style

This project uses ESLint and Prettier for consistent code formatting. Run the following commands to maintain code quality:

```bash
# Check and fix linting issues
npm run lint

# Format code
npm run format
```

### TypeScript

The project is fully typed with TypeScript. Make sure to:

- Add proper type annotations
- Avoid using `any` type
- Leverage TypeScript's strict mode features

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment.
