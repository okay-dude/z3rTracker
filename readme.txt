To download/install:

1. Go to the releases table.

2. Download source file zip.

3. Unzip into a folder.

------

How to run:

1. Open index.html in a web browser. 
   In windows, this usually can be down by right clicking -> Open With -> Some Web Browser

2. The browser will likely warn you that the page is trying to open a pop-up. Allow this pop up to be created.
   You may have to refresh the page if it warns you about the pop-up. It will open the tracker in a new window.

3. Click Choose File and find the config.json file and open it

4. Select whatever options you care about

5. OK DUDE

------

Note:

After you load the tracker, the map and text boxes may not be positioned ideally for you. You can move the boxes around by dragging the title or green box. You can zoom with +/-. The blue box will change the dimension of the boxes when you click and drag it.

After positioning things for your set up, click SAVE in the top right. This will start a download for an updated config file. Next time load this config file instead so you don't have to go through this process again. Any changes to the map will be saved as well.

------

Auto tracking only tracks chests that you opened that are also not in dungeons. It will mark the text boxes off for you so you don't have to. Obviously if you do not pick up an item (i.e from catfish), it will not mark it off automatically.

------

I do not recommend using most of the location text box trackers unless you also use auto-tracking. It will likely be overwhelming to track.

If you refresh the page on accident somehow, it shouldn't lose any progress (it autosaves every 5 seconds). 

If you need to save your current progress and close the tab/browser, you should click the save button. This will download a config.json file that you can load later with your current progress.

If you accidently close the browser tab, you will lose everything if you have not downloaded a save state. Unfortunately, this can't really be fixed without hosting the tracker on a webserver since localstorage doesn't persist when running the file locally. 

------

Only tested this on chrome on windows. Good luck with other browsers. I'm pretty sure some stuff will be broken with Firefox (it does not support the zoom css property).

------

Auto-tracking Resources:

http://usb2snes.com/ - has links to all auto tracking resources

https://skarsnik.github.io/QUsb2snes/ - qusb2snes (it works with emulator and sd2snes).

https://github.com/RedGuyyyy/sd2snes/releases - firmware (if you are using sd2snes)

https://drive.google.com/drive/folders/1_ej-pwWtCAHYXIrvs5Hro16A1s9Hi3Jz - snes9x 1.6x with lua scripting support
