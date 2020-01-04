
combine: aardvarkBookmarkletStub.js aardvarkStrings.js aardvarkUtils.js aardvarkDBox.js aardvarkCommands.js aardvarkMain.js
	cat aardvarkBookmarkletStub.js aardvarkStrings.js aardvarkUtils.js aardvarkDBox.js aardvarkCommands.js aardvarkMain.js > aardvarkCombined.js

build: combine

