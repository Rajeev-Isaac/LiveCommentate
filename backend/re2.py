import re

import requests

def shotInfo():
  url = "http://localhost:5000/run2"
  response = requests.get(url)

  if response.status_code == 200:
      data = response.text 
      #print(data)
  else:
      print(f"Error: {response.status_code}")
      print(response.text)  # Print the raw response if not successful

  match = re.search(r'Most common action in the video: (\w+)', data)

  if match:
      most_common_action = match.group(1)
      #print(f"The most common action in the video is: {most_common_action}")
  else:
      print("No match found")
  return most_common_action