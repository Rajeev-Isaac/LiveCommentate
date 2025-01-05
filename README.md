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
│   │   └── videoRoutes.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── videoController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── uploads/ (optional, for storing uploaded video files locally if needed)
│   └── package.json
├── frontend/
│   ├── index.html
│   ├── login.html
│   ├── signup.html
│   ├── upload.html
│   ├── scripts/
│   │   ├── signup.js
│   │   ├── login.js
│   │   ├── upload.js
│   └── styles.css
└── README.md
