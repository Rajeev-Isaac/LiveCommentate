const Video = require('../models/videoModel');
const multer = require('multer');

// Configure Multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory to save uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /mp4|avi|mkv|webm/; // Allowed file types
    const extname = fileTypes.test(file.originalname.toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('Only video files are allowed!'));
    }
  },
});

exports.uploadMiddleware = upload.single('video');

// Upload video to the server and save it in the database
exports.uploadVideo = async (req, res) => {
  const filePath = req.file ? req.file.path : null;

  if (!filePath) {
    return res.status(400).json({ message: 'No video file uploaded' });
  }

  try {
    const video = await Video.create({
      title: req.file.originalname,
      filePath,
      userId: req.user ? req.user._id : '64b5f5cb80cb6700194d47e1',
    });

    res.status(201).json({
      message: 'Video uploaded successfully',
      video: {
        _id: video._id.toString(),
        title: video.title,
        filePath: `http://localhost:5000/${video.filePath}`,
      },
    });
  } catch (error) {
    console.error('Error in uploadVideo:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Fetch the latest video (no ID required)
exports.getLatestVideo = async (req, res) => {
  try {
    const video = await Video.findOne().sort({ createdAt: -1 });

    if (!video) {
      return res.status(404).json({ message: 'No videos found' });
    }

    function normalizeFilePath(filePath) {
      return filePath.replace(/\\/g, '/');
  }
  
  video.filePath = normalizeFilePath(video.filePath)
    res.status(200).json({
      video: {
        _id: video._id.toString(),
        title: video.title,
        filePath: `http://localhost:5000/${video.filePath}`,
        commentary: 'Generated commentary will appear here',
      },
    });
  } catch (error) {
    console.error('Error fetching latest video:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
