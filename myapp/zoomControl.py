import pyautogui
import sys
import time
import os
import subprocess

r = sys.argv[1]

if r == "video":
    pyautogui.hotkey('alt', 'v')
elif r == "sound":
    pyautogui.hotkey('alt', 'a')
elif r == "galleryview":
    pyautogui.hotkey('alt', 'f2')
elif r == "speakerview":
    pyautogui.hotkey('alt', 'f1')