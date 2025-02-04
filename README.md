## Introduction

This is a blog application built with **Next.js 15**, **React 19**, and **TypeScript**. The application displays a list of blog posts, allows filtering based on categories and favorite status, and provides detailed views for each post. Users can add or remove posts from their favorites, with favorites stored locally in the browser (using `localStorage`). The app is designed to be responsive and functional on both desktop and mobile devices.

The blog's layout and styling were based on the provided design in Figma.

## Features

- **Homepage**: Displays a list of posts fetched from a public API. Each post includes:
  - Title
  - Short Description
  - "See More" button
- **Post Detail Page**: Displays the full content of a post. Includes:
  - A "Back to Posts" button to return to the list of posts.
  - An "Add to Favorites" button to add/remove the post from favorites.
- **Filtering**: Users can filter posts on the homepage by category and by whether they are added to favorites.
- **Favorites**: Users can add/remove posts from the favorites list. The list is stored in `localStorage` for persistence.
- **Responsiveness**: The application works on both desktop and mobile devices.

## Technologies Used

- **Next.js 15**: React framework for server-side rendering and static site generation.
- **React 19**: Frontend JavaScript library.
- **TypeScript**: Type-safe JavaScript.

## Getting Started

### Prerequisites

- **Node.js**: Ensure that you have Node.js installed. If not, [download and install Node.js](https://nodejs.org/).

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/proassist-task.git
   cd proassist-task
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

### Running the Development Server

To start the development server, run one of the following commands:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

This will start the server at `http://localhost:3000`.

### Testing the Application

- Open your browser and visit `http://localhost:3000` to see the result.

## API

The app uses the following public API endpoints from JSONPlaceholder:

- `/posts`: To fetch the list of posts.
- `/posts/{id}`: To fetch details of a specific post.


## Notes

- The application uses **localStorage** to persist the list of favorites between sessions.
- For responsive design, **media queries** and **styled-components** are used.
