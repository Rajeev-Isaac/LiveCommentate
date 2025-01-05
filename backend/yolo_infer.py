from ultralytics import YOLO

import sys
import os

if len(sys.argv) > 1:
    file_path = sys.argv[1]  # Get the file path from the command line
    normalized_path = os.path.normpath(file_path)  # Normalize to handle slashes
    print(f"File path received: {normalized_path}")
else:
    print("No file path provided.")


# Load the YOLO model
model = YOLO('C:\\Users\\user\\OneDrive\\Desktop\\LiveComm\\LiveCommentary\\last1.pt')

model.predict(normalized_path, save=True)
