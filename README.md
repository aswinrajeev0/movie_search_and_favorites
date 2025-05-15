# MERN Movie Search Application

A full-stack web application that allows users to search for movies using the OMDB API and save their favorites. Built with the MERN stack (minus MongoDB, using server-side storage instead).

## 📋 Features

- **Movie Search**: Search for movies using the OMDB API with debounced input
- **Favorites Management**: Add/remove movies to favorites with a heart icon
- **Responsive Design**: Clean and intuitive UI that works on multiple devices
- **Server-side Storage**: Favorites stored on the server without requiring user authentication

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router
- Axios for API requests
- Redux for state management
- Tailwind CSS for styling

### Backend
- Node.js
- Express.js
- File-based storage for favorites
- OMDB API integration

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or later)
- npm or yarn
- OMDB API key (get one from [https://www.omdbapi.com/](https://www.omdbapi.com/))

### Installation

1. Clone the repository
```bash
git clone https://github.com/aswinrajeev0/movie_search_and_favorites.git
cd movie_search_and_favorites
```

2. Install dependencies for both frontend and backend
```bash
# Install backend dependencies
cd api
npm install
cd ..

# Install frontend dependencies
cd frontend
npm install
cd ..
```

3. Create a `.env` file in the root of your backend and frontend folder
Backend `.env`
```
OMDB_API_KEY=your_api_key_here
PORT=5000
ALLOWED_ORIGINS=your_front_end_url
```
Frontend `.env`

```
VITE_BASE_URL=your_host_url
```

4. Start the development server
```bash
# Run backend server
cd api
npm run dev
cd ..

# Run frontend server
cd frontend
npm run server
cd ..
```

5. Open your browser and navigate to `http://localhost:5173`

## 📝 API Endpoints

### Movie Search
- **GET** `/api/movies/search?query={searchTerm}&page={pageNumber}`
  - Description: Searches for movies using the OMDB API
  - Query Parameters: `query` (required) - The movie title to search for
  - Page Number default 1
  - Response: Array of movie objects

### Favorites Management
- **GET** `/api/movies/favorites`
  - Description: Retrieves all favorite movies
  - Response: Array of favorite movie objects

- **POST** `/api/movies/toggle-favorite`
  - Description: Adds or remove a movie to/from favorites
  - Request Body: Movie object to add
    Unique clientId stored in the local storage
  - Response: Updated array of favorite movies

## 💡 Implementation Details

### Debounced Search
The search functionality implements debouncing to prevent excessive API calls while the user is typing. This improves performance and reduces the risk of hitting API rate limits.

### Server-side Storage
Instead of using MongoDB, the application uses a file-based approach to store favorites. This simplifies the setup process while still demonstrating the core functionality.

### Error Handling
Comprehensive error handling is implemented on both the frontend and backend to ensure a smooth user experience.

## 🌐 Deployment

The application is deployed //todo.

## ✨ Bonus Features Implemented

- **Pagination**: Search results are paginated to handle large numbers of movies
- **UI/UX Improvements**: Added loading states, error messages, and animations
- **Responsive Design**: Fully responsive layout that works on mobile, tablet, and desktop

## 🔄 Project Structure

The project follows a standard MERN stack structure with separate directories for frontend and backend:

```
mern-movie-search/
├── frontend/               # Frontend React application
│   ├── public/
│   ├── src/
│   │   ├── api/            # axios instance
│   │   ├── assets/         # axios instance
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── redux/          # State management
│   │   ├── types/          # Typescript common types
│   │   ├── services/       # API service functions
│   │   ├── utils/          # Utility functions
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   └── index.html
│   └── package.json
├── api/                    # Backend Node.js/Express application
│   └── storage/            # Favorites storage
│   └── src/                # typescript src folder
│        ├── controllers/   # Route controllers
│        ├── routes/        # API routes
│        ├── shared/        # Global constants
│        ├── types/         # Typescript types
│        ├── utils/         # Utility functions
│        └── app.js         # Entry point
├── .env                    # Environment variables
├── .gitignore
├── package.json
└── README.md
```