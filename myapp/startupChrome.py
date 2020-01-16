import pyautogui

pyautogui.moveTo(3839, 1065)

import os

cmd = 'cd ..\\zoom-sdk-electron'
os.system(cmd)
cmd = 'run_demo_win.bat'
os.system(cmd)