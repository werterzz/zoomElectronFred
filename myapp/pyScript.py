import pyautogui
import sys
import time
import os
import subprocess



r = sys.argv[1]
pyautogui.hotkey('f11')
# cmd = 'C:\Users\\tliccmu\\Documents\\zoom-sdk-windows-master\\zoom-sdk-windows-master\\zoom-sdk-windows-master\\bin\\sdk_demo_2017.exe 696956491 zoomtv'
# os.system(r'C:\\Users\\tliccmu\\Documents\\zoom-sdk-windows-master\\zoom-sdk-windows-master\\zoom-sdk-windows-master\\bin\\sdk_demo_2017.exe ' + r + r' zoomtv')
os.system(r'start microsoft-edge:' + r)
# subprocess.call(['C:\Users\\tliccmu\\Documents\\zoom-sdk-windows-master\\zoom-sdk-windows-master\\zoom-sdk-windows-master\\bin\\sdk_demo_2017.exe', 696956491, 'tv'])
# time.sleep(4)
# pyautogui.click('joinMeetingBtn.png')
# time.sleep(5)
# temp=pyautogui.locateOnScreen('insertIDField.png', grayscale=True, confidence=0.9)
# print(temp)
# tempPoint = pyautogui.center(temp)
# pyautogui.click(tempPoint.x,tempPoint.y)
# pyautogui.typewrite(r)
# time.sleep(5)
# pyautogui.click('joinBtn.png')
# time.sleep(8)
# pyautogui.click('joinWithVideoBtn.png')
time.sleep(15)

pyautogui.click(500,500)
pyautogui.hotkey('alt', 'v')
# pyautogui.hotkey('esc')
# time.sleep(1)

# pyautogui.hotkey('alt', 'f')
# pyautogui.moveTo(3839, 1065)

# for leave meeting
# pyautogui.hotkey('alt', 'q')
# pyautogui.hotkey('enter')