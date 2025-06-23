# AngularApiMaster

An Angular application that demonstrates proficiency in working with
APIs, including data fetching, error handling, authentication, optimization, and
environment configuration.

Live URL: [https://vb-angular-api-mastery.netlify.app/](https://vb-angular-api-mastery.netlify.app/)

## 📌 Table of Contents

- [🚀 Getting Started](#-getting-started)
- [🛠️ Tech Stack](#-tech-stack)
- [📦 Setup & Run Instructions](#-setup-run-instructions)
- [💻 Running the Application](#-running-the-application)
- [📋 Approach](#-approach)
- [📸 Screenshots](#-screenshots)
- [🚀 Deployment](#-deployment)
- [👤 Author](#-author)

## 🚀 Getting Started

This project is built using Angular, SCSS, Typescript and hosted on Netlify.

## 🛠️ Tech Stack

- Angular
- Typescript
- SCSS
- Jest

## 📦 Setup & Run Instructions

Clone the repository and run the command:

```sh
git clone https://github.com/victorbruce/angular-api-master
cd angular-api-master
```

Now, run the command:
`npm install` to install all the dependencies for the application

### Running the Application

#### Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

#### Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

#### Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

#### Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## 📸 Screenshots

N/A

## 📋 Approach

- Created an API Client Service to handle all HTTP CRUD operations and caching.
- Implemented authentication with a mock AuthService storing tokens and user IDs in localStorage.
- Built PostService for managing posts state and enforcing user-based permissions (e.g., delete).
- Developed components for listing, creating, editing, and viewing post details.
- Added server-side pagination using Typicode’s _page and _limit query params.
- Ensured only post creators can edit or delete their posts via user ID checks.
- Integrated real-time form validation and user feedback in forms.
- Wrote comprehensive unit tests for services and components.
- Deployed the application to Netlify for live access.

## 🚀 Deployment

Netlify

## 👤 Author

Victor Bruce
