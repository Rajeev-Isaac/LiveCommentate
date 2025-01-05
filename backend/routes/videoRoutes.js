const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');

// Upload video
router.post('/upload', videoController.uploadMiddleware, videoController.uploadVideo);

// Get the latest video (removing the ID-based route)
router.get('/latest', videoController.getLatestVideo);

module.exports = router;
