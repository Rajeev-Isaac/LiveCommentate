import sys
import os
import cv2
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import img_to_array
from collections import Counter

import io
# Set the default encoding to 'utf-8'


if len(sys.argv) > 1:
    file_path = sys.argv[1]  # Get the file path from the command line
    normalized_path = os.path.normpath(file_path)  # Normalize to handle slashes
    print(f"File path received: {normalized_path}")
else:
    print("No file path provided.")


sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# Load the trained model
model_path = "C:\\Users\\user\\Downloads\\vgg16_cricket_model.keras"
model = load_model(model_path)

# Define class names (from your model's training)
class_names = ['sweep', 'cover', 'defense', 'pull', 'lofted', 'late_cut', 'hook', 'flick', 'straight', 'square_cut']

# Function to preprocess the input frame/image
def preprocess_frame(frame):
    frame_resized = cv2.resize(frame, (224, 224))  # Resize to model input size
    frame_array = img_to_array(frame_resized)  # Convert to numpy array
    frame_array = np.expand_dims(frame_array, axis=0)  # Add batch dimension
    frame_array = frame_array / 255.0  # Normalize pixel values
    return frame_array

# Function to predict action for a given frame
def predict_action(frame, model, class_names):
    frame_array = preprocess_frame(frame)
    
    # Debugging: Check the shape of the frame being passed to the model
    print(f"Processed frame shape: {frame_array.shape}")

    predictions = model.predict(frame_array)
    predicted_class_idx = np.argmax(predictions, axis=1)  # Get the index of the max prediction
    predicted_class = class_names[predicted_class_idx[0]]  # Map the index to class label

    # Debugging: Log prediction results
    print(f"Predicted class index: {predicted_class_idx[0]}")
    print(f"Predicted class label: {predicted_class}")
    
    return predicted_class

# Function to classify actions in a video
def classify_video_actions(video_path, model, class_names):
    cap = cv2.VideoCapture(video_path)  # Open the video file
    frame_idx = 0
    actions = []  # Store actions for each frame

    while True:
        success, frame = cap.read()  # Read a frame
        if not success:
            break  # Exit if no more frames

        # Debugging: Check if the frame is valid
        if frame is None:
            print("Error: Failed to capture frame.")
            continue

        # Debugging: Show the frame
        cv2.imshow('Video Frame', frame)  # Display the frame to visually check it
        cv2.waitKey(1)  # Display frame for 1 ms

        # Predict action for the current frame
        action = predict_action(frame, model, class_names)
        actions.append(action)  # Store the predicted action
        frame_idx += 1

    cap.release()  # Release video capture object
    cv2.destroyAllWindows()  # Close any OpenCV windows
    return actions

# Example usage: Predict actions for a video
video_path = normalized_path # Replace with actual video path
actions = classify_video_actions(video_path, model, class_names)

# Print predicted actions for each frame
print("Predicted actions for each frame:", actions)

# Optionally, get the most common action in the video (majority vote)
most_common_action = Counter(actions).most_common(1)[0][0]
print("Most common action in the video:", most_common_action)