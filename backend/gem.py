from dotenv import load_dotenv
import os
import google.generativeai as genai

from re2 import shotInfo
from re1 import framesInfo
load_dotenv()

genai.configure(api_key=os.environ["GOOGLE_API_KEY"])

model = genai.GenerativeModel('gemini-pro')

def commentator(outputs):
    commentator_prompt = (
        "## You are a commentator\n"
        "you are given with a cricket shot and sequence of the players detected as ouptut in frames, you have to commentate on it as a real human cricket commentator only based on the given outputs, the frames are usually 30 frames per second, hence if you get 120 frames make the commentary that last only for 4 seconds':\n"
        "outputs: '{}'\n"
        "Commentary:"
    )
    # Compose prompt with the given query
    prompt = commentator_prompt.format(outputs)

    # Use Google Gen AI to generate a response based on the prompt
    response = model.generate_content(prompt)

    # Extract the generated classification from the response
    commentary = response.text.strip()

    return commentary

frame = framesInfo()
shot = shotInfo()
promptInfo = frame + shot
print(commentator(promptInfo))