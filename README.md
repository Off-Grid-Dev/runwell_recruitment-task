# Runwell Recruitment Task

A modern, responsive React/Next.js app for managing posts/messages, built as a technical recruitment task. The app demonstrates CRUD operations, state management, and a mobile-friendly UI using Tailwind CSS.

## Features

### Core
- **Display all posts**: View a list of all posts/messages with title, content, and timestamps.
- **Create post**: Add a new post with title and description. Creation and update dates are tracked.
- **Edit post**: Update the title and description of an existing post. Edit timestamps are updated.
- **Delete post**: Remove a post from the list, with confirmation on mobile.
- **Form validation**: Title and description are required for both create and edit.
- **State management**: Posts are stored in React state and persisted to localStorage.

### UI/UX
- **Responsive design**: Fully mobile-friendly layout. On mobile, forms and options slide up from the bottom as drawers.
- **Tailwind CSS**: All styling is done with Tailwind utility classes.
- **Modals/Drawers**: Create/edit forms and mobile options use animated modals/drawers.
- **Animations**: Smooth slide-up/slide-down transitions for modals on mobile.

### Bonus (Partially Implemented)
- **Delete confirmation popup**: On mobile, deleting a post prompts for confirmation.
- **Sorting/filtering**: UI elements for sorting and searching posts are present (logic not implemented).
- **Mock data**: App loads with mock data if no posts are found in localStorage.

## Project Structure

- `app/` - Main Next.js app directory
  - `components/` - All React components (Header, Main, posts, layout, etc.)
  - `mockData/` - Initial mock post data
  - `globals.css` - Tailwind and global styles
  - `types.ts` - Shared TypeScript interfaces and prop types
- `public/assets/` - SVG icons and images

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Run the development server**
   ```bash
   npm run dev
   ```
3. **Open the app**
   Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Development Notes
- All TypeScript interfaces are centralized in `app/types.ts`.
- Tailwind classes are organized for clarity, with mobile and desktop variants separated.
- All functions and components are documented with JSDoc comments.
- No backend is required; all data is stored in localStorage.

## To Do / Bonus
- Sorting and filtering logic for posts
- Pagination or infinite scroll
- Backend API and React Query integration
- README improvements and more usage examples

---

_Last updated: 2025-06-08_
