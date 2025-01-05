document.getElementById('uploadForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent the default form submission

    const videoFile = document.getElementById('videoFile').files[0]; // Get the video file

    if (!videoFile) {
        alert('Please select a video file to upload.');
        return;
    }

    const formData = new FormData();
    formData.append('video', videoFile); // Append the video file to the FormData

    try {
        const response = await fetch('http://localhost:5000/api/videos/upload', {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
        if (response.ok) {
            alert('Video uploaded successfully');
            localStorage.setItem('token', data.token);
            window.location.href = `preview.html`;
        } else {
            alert(data.message || 'Upload failed');
        }
    } catch (err) {
        console.error('Error uploading video:', err);
        alert('An error occurred while uploading the video. Please try again.');
    }
});




