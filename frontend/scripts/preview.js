window.onload = async () => {
  const params = new URLSearchParams(window.location.search);
  const videoId = params.get('id');

  // Fetch video only if videoId is present in the URL
  if (videoId) {
    try {
      const response = await fetch(`http://localhost:5000/api/videos/latest`);
      const data = await response.json();

      if (response.ok) {
        const videoPlayer = document.getElementById('videoPlayer');
        videoPlayer.src = data.video.filePath;
      } else {
        alert('Failed to load video.');
      }
    } catch (error) {
      console.error('Error loading video:', error);
    }
  }

  // Fetch commentary
  try {
    const response = await fetch('http://localhost:5000/commentate');
    const data = await response.text(); // Corrected here: Added `()` to `.text`

    document.getElementById('commentaryText').innerText = data;
  } catch (error) {
    alert('Error fetching commentary');
    console.error('Error fetching commentary:', error);
    document.getElementById('commentaryText').innerText = 'Failed to load commentary.';
  }
};
