import re


import requests

def framesInfo():
    url = "http://localhost:5000/run-latest"
    response = requests.get(url)

    if response.status_code == 200:
        data = response.text 
        #print(data)
    else:
        print(f"Error: {response.status_code}")
        print(response.text)  # Print the raw response if not successful

    # Regular expression to capture frame number and detections (without time in ms)
    pattern = r'frame (\d+).+?(\d+)\s([a-zA-Z\-]+(?:\s[a-zA-Z\-]+)*),\s*(\d+)?\s*([a-zA-Z\-]+(?:\s[a-zA-Z\-]+)*),?'

    matches = re.findall(pattern, data)

    # Prepare the result in the desired format
    output = []
    com = ''
    for match in matches:
        frame = match[0]
        detection_1 = match[1] + ' ' + match[2]
        detection_2 = (match[3] if match[3] else '') + (' ' + match[4] if match[4] else '')

        result = f"Frame {frame}: {detection_1}"
        if detection_2.strip():
            result += ', ' + detection_2.strip()

        output.append(result)

    # Display the results
    for line in output:
        com = com + line + '\n'
        #print(line)
    return com
