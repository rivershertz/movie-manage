# Movie Collection Manager - Angular Task

## Overview

You are tasked with creating a "Movie Collection Manager" web application that allows users to browse, search, and organize their favorite movies. The application should have a fun, user-friendly interface and demonstrate your Angular skills.

## Requirements

Complete this task in approximately 6 hours. The application should showcase the following Angular concepts:

### Routes & Lazy Loading

- Create the following routes:
  - `/dashboard` - Main dashboard showing movie stats √
  - `/movies` - List of all movies √
  - `/movies/:id` - Movie details page √
  - `/favorites` - User's favorite movies √
  - `/categories` - Movie categories
- Implement lazy loading for all feature modules √

### Empty States

- Create appropriate empty states for:
  - When no movies are found in a search √
  - When the favorites list is empty √
  - When a category contains no movies

### Pipes

- Create custom pipes:
  - `RuntimePipe` - Formats movie runtime from minutes to hours and minutes (e.g., 142 → "2h 22m")
  - `RatingPipe` - Transforms a numeric rating to stars (e.g., 4.5 → "★★★★½")

### Directives

- Create the following directives:
  - `HighlightDirective` - Highlights a movie card when hovered
  - `ForbiddenGenreDirective` - Adds a visual indicator for age-restricted content

### Class Inheritance

- Create a base `MediaItem` class that both `Movie` and `TvShow` classes inherit from (for future expansion)
- Implement shared properties and methods in the base class

### HTTP Requests

- Fetch movie data from a mock API or public movie API
- Implement proper error handling
- Show loading indicators during HTTP requests

### State Management

- Implement a simple state management solution:
  - Store user's favorite movies
  - Track recently viewed movies
  - Save filter/sort preferences

## Deliverables

- A functional Angular application meeting all the above requirements
- Clean, well-documented code
- README file with setup instructions

## Bonus Challenges (if time allows)

- Implement a dark/light theme toggle
- Add animation transitions between routes
- Create unit tests for your components or services

3. Begin by designing your data models and service architecture
