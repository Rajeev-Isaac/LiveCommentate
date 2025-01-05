# Live Video Commentary

## Project Description
This project generates real-time cricket video commentary. Users can:
- Sign up and log in with a username and password.
- Upload cricket videos and get commentary.

## Directory Structure
project/ <br>
├── backend/ <br>
│   ├── app.js<br>
│   ├── .env<br>
│   ├── models/<br>
│   │   ├── userModel.js <br>
│   │   └── videoModel.js<br>
│   ├── routes/<br>
│   │   ├── authRoutes.js <br>
│   │   └── videoRoutes.js <br>
│   ├── controllers/ <br>
│   │   ├── authController.js <br>
│   │   └── videoController.js <br>
│   ├── middleware/ <br>
│   │   └── authMiddleware.js <br>
│   ├── uploads/  <br>
│   └── package.json <br>
├── frontend/ <br>
│   ├── index.html <br>
│   ├── login.html<br>
│   ├── signup.html<br>
│   ├── upload.html<br>
│   ├── scripts/<br>
│   │   ├── signup.js<br>
│   │   ├── login.js<br>
│   │   ├── upload.js<br>
│   └── styles.css<br>
└── README.md<br>
