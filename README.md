🎓 StudentHub API

A Student Management REST API built with Node.js, Express.js & MongoDB

<p align="center">
  A simple, structured, and beginner-friendly backend project for managing student records through RESTful API endpoints.
</p>

<p align="center">
  ![Node.js](https://img.shields.io/badge/Node.js-22%2B-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
  ![Express.js](https://img.shields.io/badge/Express.js-Backend-000000?style=for-the-badge&logo=express&logoColor=white)
  ![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
</p>

📌 About the Project

StudentHub API is a Student Management System backend developed as part of the Ostad Full Stack Web Development with JavaScript (MERN) & AI course.

It provides RESTful API endpoints to create, retrieve, update, and delete student records stored in MongoDB.

✨ Features

➕ Create new student records

📋 Retrieve all students

🔍 Retrieve a specific student by ID

✏️ Update existing student information

🗑️ Delete student records

☁️ MongoDB Atlas database integration

🔐 Environment variable configuration

⚡ Express.js-powered REST API

🛠️ Technologies Used

Technology

Purpose

Node.js

JavaScript runtime

Express.js

Backend framework

MongoDB Atlas

Cloud database

Mongoose

MongoDB object modeling

dotenv

Environment variable management

Nodemon

Development server utility

📂 Project Structure

Ostad-Module-12-Assignment/
├── models/
│   └── Student.js
├── public/              # Frontend files, if included
├── .env                 # Private environment variables
├── .gitignore
├── package.json
├── package-lock.json
├── server.js
└── README.md

⚙️ Installation & Setup

1. Clone the repository

git clone https://github.com/Soumik-Riyan-Madhu/Ostad-Module-12-Assignment.git

2. Navigate to the project directory

cd Ostad-Module-12-Assignment

3. Install dependencies

npm install

4. Configure environment variables

Create a .env file in the root directory:

PORT=5000
MONGO_URI=your_mongodb_connection_string

Replace your_mongodb_connection_string with your own MongoDB connection string. Never publish database credentials or your .env file.

5. Start the server

npm start

If a development script is configured, you can use:

npm run dev

The API will run at:

http://localhost:5000

🔗 API Documentation

Base URL: http://localhost:5000

Method

Endpoint

Description

GET

/

Check API status

POST

/students

Create a student

GET

/students

Get all students

GET

/students/:id

Get a student by ID

PUT

/students/:id

Update a student

DELETE

/students/:id

Delete a student

📝 Example: Create a Student

Request

POST /students
Content-Type: application/json

Request Body

{
  "name": "Rahim Ahmed",
  "email": "rahim@example.com",
  "age": 18,
  "department": "Computer Science"
}

The server should return the created student record if the request succeeds.

📋 Example: Get All Students

GET /students

Returns the student records stored in the database.

✏️ Example: Update a Student

PUT /students/STUDENT_ID
Content-Type: application/json

{
  "name": "Rahim Ahmed",
  "email": "rahim.updated@example.com",
  "age": 19,
  "department": "Software Engineering"
}

Replace STUDENT_ID with a valid MongoDB document ID.

🗑️ Example: Delete a Student

DELETE /students/STUDENT_ID

Replace STUDENT_ID with the ID of the student you want to delete.

Note: Request fields, response formats, and error handling depend on the implementation in server.js and models/Student.js.

🧪 Testing

You can test the API using Postman or another HTTP client.

Start the server.

Send requests to the endpoints listed above.

For POST and PUT requests, select Body → raw → JSON in Postman.

Check the returned responses and verify changes in MongoDB.

🔒 Security Notes

Keep .env out of version control.

Never commit database passwords, API keys, or other secrets.

Keep node_modules/ out of Git using .gitignore.

Use your own environment variables when running the project.

🎯 Learning Objectives

This project demonstrates practical experience with:

Creating a REST API using Express.js

Connecting Node.js applications to MongoDB

Defining schemas and models with Mongoose

Implementing CRUD operations

Handling HTTP requests and JSON data

Managing environment variables

Testing API endpoints

👨‍💻 Author

Soumik Riyan Madhu

Student developer | Learning Full Stack Web Development

GitHub: @Soumik-Riyan-Madhu

📚 Course

Ostad | Full Stack Web Development with JavaScript (MERN) & AI

Created for educational and learning purposes.

<p align="center">
  ⭐ If you find this project useful, consider giving the repository a star!
</p>
