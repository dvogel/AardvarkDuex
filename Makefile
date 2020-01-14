build: aardvarkCombined.js logo

logo-54.gif: aardvarkhelp.gif
	convert-im6 aardvarkhelp.gif -crop 54x54+0+0 +repage logo-54.gif

logo-48.jpg: logo-54.gif
	convert-im6 logo-54.gif -scale 48x48 +repage logo-48.jpg

logo-32.jpg: logo-54.gif
	convert-im6 logo-54.gif -scale 32x32 +repage logo-32.jpg

logo: logo-32.jpg logo-48.jpg logo-54.gif

aardvarkCombined.js: aardvarkBookmarkletStub.js aardvarkStrings.js aardvarkUtils.js aardvarkDBox.js aardvarkCommands.js aardvarkMain.js
	cat aardvarkBookmarkletStub.js aardvarkStrings.js aardvarkUtils.js aardvarkDBox.js aardvarkCommands.js aardvarkMain.js > aardvarkCombined.js

clean:
	rm -f aardvarkCombined.js logo-32.gif logo-54.gif
