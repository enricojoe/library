# Dummy Library API

This project is a Dummy Library API built using Express.js. It serves as a basic template for creating RESTful APIs and includes comprehensive API documentation accessible via Swagger at `http://localhost:5000/api-docs`.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)

## Installation

To get started, clone the repository and install the necessary dependencies:

```bash
git clone https://github.com/enricojoe/library.git
cd library
npm install
```

## Usage

Before start the server, seed the database using dummy data using following command:

```bash
npm run seed
```

Then, to start the server, run the following command:

```bash
npm start
```

## API Documentation

API documentation is generated using Swagger. Once the server is running, you can access the documentation at `http://localhost:5000/api-docs`. This provides a detailed interface to explore and test the API endpoints.

## Project Structure

The project follows a simple and modular structure:

```css
library/
├── db/
│   ├── models/
│   ├── seeder/
├── src/
│   ├── handlers/
│   ├── routers/
├── tests/
├── .env
├── .gitignore
├── app.js
├── package.json
├── package-lock.json
├── server.js
├── README.md
└── swagger_option.js
```


- **models/**: Defines the data models (e.g., for a database).
- **seeder/**: Seed database using predefined dummy data
- **handlers/**: Handles the request processing and responses.
- **routers/**: Defines the API routes.
- **app.js**: The main application file where the Express app is configured
- **server.js**:  The file to configure web server and start the server.
- **swagger_option.js**: Swagger configuration file for API documentation.
