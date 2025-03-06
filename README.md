# MovieManage

A Netflix clone built with Angular 19

## Project Overview

This project is a Netflix-inspired streaming platform that demonstrates modern Angular development practices.

## Tech Stack

- **Frontend:** Angular 19
- **Backend:** Node.js Express server

## Project Structure

```
movie-manage/
├── src/                 # Angular application source
├── server/              # Express backend
├── README.md            # This file
└── package.json         # Project dependencies
```

## Installation

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

### Setup Instructions

1. Clone the repository:

   ```
   git clone https://github.com/rivershertz/movie-manage.git
   cd movie-manage
   ```

2. Install frontend dependencies:

   ```
   npm install
   ```

3. Install backend dependencies:
   ```
   cd server
   npm install
   cd ..
   ```

## Running the Application

### Start the backend server:

```
cd server
npm start
```

The server will run on http://localhost:3000 by default.

### Start the Angular application:

In a new terminal window:

```
npm start
```

The application will be available at http://localhost:4200.

## Features

- **Search Component**: Netflix-inspired search input with autofocus
- **Sorting**: Custom sorting function for content listings
- **Favorites**: You can and remove movies from favorites

## Development Notes

- Use signals for reactive state management
- The router-outlet is styled to fit between header and footer
