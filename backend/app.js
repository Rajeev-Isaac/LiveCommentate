
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const videoRoutes = require('./routes/videoRoutes');

const { spawn } = require('child_process');

const Video = require('./models/videoModel');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/videos', videoRoutes);
app.use('/uploads', express.static('uploads'));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});


// Route to fetch latest video and run YOLO
app.get('/run-latest', async (req, res) => {
    try {
        const video = await Video.findOne().sort({ createdAt: -1 });
        
        if (!video) {
            return res.status(404).json({ message: 'No videos found' });
        }
        
        function normalizeFilePath(filePath) {
            return filePath.replace(/\\/g, '/');
        }
          
        const filePath = normalizeFilePath(video.filePath)

        // Run Python script with the latest video file path
        const yoloProcess = spawn('python', ['yolo_infer.py', filePath]);

        let output = '';  // For stdout
        let errorOutput = '';  // For stderr

        yoloProcess.stdout.on('data', (data) => {
            output += data.toString();
        });

        yoloProcess.stderr.on('data', (data) => {
            errorOutput += data.toString();
        });

        yoloProcess.on('close', (code) => {
            if (code === 0) {
                res.send(output);
            } else {
                res.status(500).send(errorOutput || `Process exited with code ${code}`);
            }
        });

    } catch (error) {
        console.error('Error fetching latest video:', error.message);
        res.status(500).send('Server error');
    }
});


app.get('/run2', async(req, res) => {

  const video = await Video.findOne().sort({ createdAt: -1 });
        
  if(!video) {
    return res.status(404).json({ message: 'No videos found' });
   }
        
  function normalizeFilePath(filePath) {
    return filePath.replace(/\\/g, '/');
   }
          
  const filePath = normalizeFilePath(video.filePath)

        // Run Python script with the latest video file path
  const vggProcess = spawn('python', ['vgg.py', filePath]);

  let output = ''; // Accumulate stdout data
  let errorOutput = ''; // Accumulate stderr data

  // Collect stdout data
  vggProcess.stdout.on('data', (data) => {
      output += data.toString();
  });

  // Collect stderr data
  vggProcess.stderr.on('data', (data) => {
      errorOutput += data.toString();
  });

  vggProcess.on('close', (code) => {
      if (code === 0) {
          res.send(output); // Send stdout data if successful
      } else {
          res.status(500).send(errorOutput || `Process exited with code ${code}`);
      }
  });
});

app.get('/commentate', async (req, res) => {
    try {

        // Run Python script with the latest video file path
        const yoloProcess = spawn('python', ['gem.py']);

        let output = '';  // For stdout
        let errorOutput = '';  // For stderr

        yoloProcess.stdout.on('data', (data) => {
            output += data.toString();
        });

        yoloProcess.stderr.on('data', (data) => {
            errorOutput += data.toString();
        });

        yoloProcess.on('close', (code) => {
            if (code === 0) {
                res.send(output);
            } else {
                res.status(500).send(errorOutput || `Process exited with code ${code}`);
            }
        });

    } catch (error) {
        console.error('Error fetching latest video:', error.message);
        res.status(500).send('Server error');
    }
});
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
