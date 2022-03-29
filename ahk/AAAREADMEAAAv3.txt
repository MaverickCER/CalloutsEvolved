CALLOUTS EVOLVED READ ME
--------------------------
Version 2.0.0 September 2020
NOTE: This script is only to be used in conjunction with https://www.calloutsevolved.com.


INSTALLATION:
-------------
1. Move the CalloutsEvolved folder out of the zip file to an easy to reach area on your computer.
2. Double Click on "AutoHotKeyInstaller.exe" and go through the installation process. In version 2.1 this will not be required.
3. After installing AutoHotKey, Double Click on "CalloutsEvolved.AHK".
4. Sign in with your email and password from https://www.calloutsevolved.com. If you do not have an account then please go sign up.
5. After signing in you have completed the installation process.


CONFIGURATION:
--------------
1. As soon as you sign in, you are greeted by 18 different input fields. They are intentionally laid out like the numberpad to the left of your keyboard.
	Note: If you do not have a numberpad you can still trigger the callouts by clicking the keys after the "or" statements above each input.
2. In addition to these 18 input fields, you have a toggle that swaps between "no Shortcuts", "Numberpad Shortcuts", and "Keyboard Shortcuts". 
	This toggle ensures that you can make callouts when you need to, but can turn them off when you want to type normally.
	Typing a shortcut key during "No Shortcuts" will type the key normally.
	Typing a numberpad key during "Keyboard Shortcuts" will also type the key normally. Same for keyboard keys during "Numberpad Shortcuts".
	Typing a keyboard key during "Keyboard Shortcuts" will send the key value to the CalloutsEvolved database and type whatever is in the cooresponding input field.
3. The input fields are quick send messages while playing the game. To send the fastest messages, you want to ensure that the Chat Input matches your key to open the chat and that the Delay is set as follows.
	Set the Delay to "50", fill out another input, ensure that your shortcuts are on, and then try to send the message in game.
	If your message doesn't send at all, then increase the delay by 10 and try again.
	Once the message sends you want to try it 5 more times to ensure that the message will be sent consistently.
4. Each input can be customized and will be sent to your in game chat whenever you type on the key above the input field.


OPERATION:
----------
1. When you first start the script, the toggle will be on "No Shortcuts" by default so that it does not interfere with you trying to launch a game.
2. Once the game is loaded up you can type on the ` key to the left of your 1 key and below your esc key to toggle the system to "Numberpad Shortcuts".
3. While in numberpad shortcuts mode, your numberpad types will be sent to the CalloutsEvolved database and the script will type out whatever text you have in the cooresponding input field.
4. Typing ` again will toggel the system into "Keybaord Shortcut" mode and send keyboard types to the database while typing out whatever text you have in the cooresxponding input field.
5. Typine ` for a 4th time will cycle back to "No Shortcuts" and nothing will be sent to the database and your keys will behave like normal.
6. The input values in this script do not have to match the inputs on CalloutsEvolved but you want them to be related in order to avoid confusion.
	Having a text input set as "absolute" and the CalloutsEvolved text to speech as "pushing" could have some unexpected results.


MANIFEST:
---------
1. AAAREADMEAAA.txt: This document that you are reading now. 
2. ACalloutsEvolved.ahk: The script that should be ran while playing games in order to send keys to the database and send text messages in game as fast as possible.
3. AutoHotKeyInstaller.exe: The windows installer for auto hot key. A freeware program that provides the foundation of this project. 
13 more files that are required to run script. Do not edit any files as such action could result in you permanently deleting your boot drive and having to reinstall a fresh copy of windows.
	You have been warned.


COPYRIGHT LAW:
------------------------------------------
https://www.autohotkey.com/docs/license.htm#GNU_GENERAL_PUBLIC_LICENSE
Unless you read and agree to the copyright laws above and below you cannot redistribute this software. 
While Auto Hot Key is freeware and can be distributed as such but the sounds used in this program are under copyright.
You take any liability when redistributing this software except by directing people to the site above.
This is not a paid service so please request a refund. 
Copyright 2020 All rights reserved. 


TROUBLESHOOTING:
----------------
1. Teammates cannot hear me: Check troubleshooting information on https://www.calloutsevovled.com as this extension does not have any sound.
2. The program doesn't do anything: Ensure that the .ahk file is running, press `, and if that fails try to restart your computer.
3. I changed the files and am now having issues: Redownload the files and start from scratch. Make sure your boot folder still exists as you were warned.
4. I would like this in a different language: Instructions are provided on how to edit scripts, feel free to use google translate. 
5. I cannot figure any of this out: Contact me on reddit with your preferences and I will do my best to help out.


VERSION 0.1 2017
----------------
Discord Bot: 
LevCalls: https://discordapp.com/api/oauth2/authorize?client_id=363079279019556867&permissions=43008&scope=bot
LevCalls2: https://discordapp.com/api/oauth2/authorize?client_id=386168043639668738&permissions=43008&scope=bot
Both Bots are required for completing the Guantlet encounter in the Leviathan Raid. 

VERSION 0.2 2017
----------------
https://drive.google.com/open?id=1PkeHIOft3gcvfWAAeby1Vf60X0gdKj2q
This link is for a ZIP file that contains the software required to turn your keyboard into a soundbaord for audio call outs. 
It also includes all the sound files for the leviathan raid. 
If you need additional sounds then use this site with "George" as the voice: http://www.fromtexttospeech.com

VERSION 0.3 2018
----------------
https://www.jarvis9940.com
This site is no longer functioning properly and without my co-developer I do not beleive that it will be functional anytime soon.
This is why I have built this desktop program. It cannot reach the same ammount of users but at least it can provide some support.

VERSION 1.0 2019
----------------
An earlier version of this program that was not released to the public as it was too costly to get into. 

VERSION 1.1 2019
----------------
Updated software foundation and improved voice to be less robotic. 

UPDATES: 2020
-------------
No voices in PC extension.
Unlimited custimization and support for all encounters.

PLANS: 2021
------------
Remove reliance on AutoHotkey.
Possibly make this a standalone application.