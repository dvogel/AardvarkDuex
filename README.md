# Aardvark Duex

![Aardvark Logo](aardvarkhelp.gif)

## Background

In 2005 Rob Brown published the [original Aardvark bookmarklet](http://www.karmatics.com/aardvark/). It pushed the possibilities of the browser experience. In 2005, when IE6 still ruled the web:

  * It allowed users to live-edit the page they were viewing.
  * It had quick edit controls that still rival browser-native editing features.
  * It worked in any web page.

I came to rely on the bookmarklet a lot. Here's a sample of the uses I've found for it:

  * Interactive rough editing with a custom to preview potential changes before committing to re-writing or re-styling in full.
  * Removing an advertisement with distracting content before screenshotting.
  * Saving paper when printing by:
    * Removing needless images (often advertisements) before printing.
    * Reducing a cooking recipe down to a recipe card size.
    * Squeezing specific content to align to a consistent right edge to fit on a page without shrinking everything.
  * Allowing myself to click on something when an IE-tailored website broke z-indexing, covering up a button or link.
  * Removing a break in a news article so that I can copy/paste paragraphs while discussing it with friends.

## Why an Extension?

The bookmarklet model was always a little awkward. It was relying on a somewhat obscure quirk of the way browsers treat URLs and bookmarks. You can see in [old captures of the bookmarklet website](https://web.archive.org/web/20050423235409/http://www.karmatics.com/aardvark/) there used to be a Firefox extension. This allowed faster loading of the bookmarklet by hosting the code inside the extension, rather than a remote website. The original extension was discontinued due to maintenance issues. This is my attempt to revive the extension, thus the name Aardvark _Duex_.

In addition to faster code loading, the extension suits the current browser reality a little better today. Browser extensions have changed _a lot_ since the first extension was published and then discontinued. Security restrictions on mixed content (which are good) have undercut the bookmarklet model. Eschewing obscure technologies like XUL in favor of defined browser UI models has reduced the maintenance burden.

## Licensing

This extension is available under the BSD 3-clause license, with the original code (slightly modified) relicensed with the author's permission. A big thanks for Rob Brown for writing such an inspiring bookmarklet and for his generosity in allowing me to repurpose the code for this extension.

