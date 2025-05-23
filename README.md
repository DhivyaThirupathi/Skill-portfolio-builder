# Skill Portfolio Builder

A full-stack web application for creating and managing professional skill portfolios.

## Features

- Create and manage professional portfolios with personal information, skills, projects, and achievements
- Interactive form with validation for adding and editing portfolios
- Responsive gallery view of all portfolios
- Detailed portfolio view with PDF export functionality
- Modern UI built with Angular Material components
- RESTful API backend using Node.js, Express, and MongoDB

## Tech Stack

### Frontend
- Angular 19
- Angular Material
- Angular Flex Layout
- Reactive Forms
- jsPDF (for PDF generation)
- RxJS

### Backend
- Node.js
- Express
- MongoDB
- Mongoose

## Project Structure

```
skill-portfolio-builder/
├── src/                  # Angular frontend
│   ├── app/
│   │   ├── components/   # Angular components
│   │   ├── models/       # TypeScript interfaces
│   │   ├── services/     # Angular services
│   │   ├── shared/       # Shared components/directives
│   │   ├── app.module.ts
│   │   └── ...
│   ├── assets/
│   └── ...
├── server/               # Node.js backend
│   ├── controllers/      # API controllers
│   ├── models/           # MongoDB schemas
│   ├── routes/           # API routes
│   └── server.js         # Express server setup
└── ...
```

## Getting Started

### Prerequisites

- Node.js and npm
- MongoDB

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start MongoDB:
   ```
   mongod
   ```

4. Start the development servers:
   ```
   npm run dev
   ```

This will start both the Angular frontend (on port 4200) and the Express backend (on port 3000).

## API Documentation

### Endpoints

| Method | Endpoint               | Description            | Request Body                        |
|--------|------------------------|------------------------|-------------------------------------|
| POST   | /api/portfolios        | Create portfolio       | Portfolio object                    |
| GET    | /api/portfolios        | Get all portfolios     | -                                   |
| GET    | /api/portfolios/:id    | Get portfolio by ID    | -                                   |
| PUT    | /api/portfolios/:id    | Update portfolio       | Portfolio object                    |
| DELETE | /api/portfolios/:id    | Delete portfolio       | -                                   |

### Portfolio Schema

```javascript
{
  fullName: String (required),
  aboutMe: String (required),
  skills: [String] (required),
  projects: [{
    title: String,
    description: String
  }],
  achievements: String,
  createdAt: Date,
  updatedAt: Date
}
```

## License

This project is licensed under the MIT License.