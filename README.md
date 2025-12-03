# WTWR (What to Wear?): Back End

The back-end project powers the WTWR (What to Wear?) application by providing a RESTful API, data persistence, and validation for users and clothing items. This server handles data management, error handling, and validation logic for the front-end WTWR app.

## 🧠 Overview

This project was built as part of the Practicum Software Engineering program to learn how to set up and deploy a Node.js + MongoDB back end, build APIs, handle user data securely, and connect it with a client application.

## ⚙️ Technologies Used

- **Node.js** — JavaScript runtime environment for building the back-end server.
- **Express.js** — Framework for handling routes, middleware, and API logic.
- **MongoDB** — NoSQL database used for storing users and clothing items.
- **Mongoose** — ODM (Object Data Modeling) library for MongoDB, managing schemas and validation.
- **Validator** — Library for validating URLs and other data fields in schemas.
- **Celebrate & Joi** — Middleware for validating request data and parameters.
- **ESLint & Prettier** — Tools for linting and consistent code formatting.
- **Nodemon** — Development tool that restarts the server automatically on file changes.
- **Error Handling Middleware** — Centralized handling for 400, 404, and 500-level errors.

## 🚀 Key Features

- Secure user signup and login flow
- Token-based authentication (JWT)
- Protected routes requiring user identity verification
- RESTful API with routes for users and clothing items
- Input validation using Celebrate and Joi
- Mongoose schema validation for all models
- Error handling with appropriate HTTP status codes
- Like and Unlike functionality for clothing items
- Organized MVC architecture (Models, Controllers, Routes)
- Linter setup following the Airbnb JavaScript Style Guide

## 🎥 Project Pitch Video

Please check out my Project 13 pitch video here:

👉 **https://drive.google.com/file/d/17-UwYeM-ptnsbax1O5ulru8_Jt3L-Rx5/view**

This video walks through the key steps, challenges, and improvements made while implementing secure authentication and protected routes in the WTWR backend.

## 🧩 Running the Project

### Installation

Clone the repository and install dependencies:

```bash
npm install

```
