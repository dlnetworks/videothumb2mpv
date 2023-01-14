# videothumb2mpv

## What is it?
A browser userscript that will allow you to open videos in external player mpv by simply clicking on a thumbnail.

## How it works?
It simply replaces video thumbnail hyperlinks on a page, changing their protocol from https:// to mpv://.

## Supported sites

* YouTube

## Prerequisites
* Any modern web browser that supports extensions 
* [mpv media player](https://mpv.io/)
* [yt-dlp](https://github.com/yt-dlp/yt-dlp)
* Userscript manager, such as [Violentmonkey](https://violentmonkey.github.io/), [Greasemonkey](https://www.greasespot.net/) or [Tampermonkey](https://www.tampermonkey.net/)

## Installation

1. Clone this repository
2. Create a script in your browser userscript manager and paste contents of userscript.js from this repository
3. Make sure the userscript is enabled
4. Install mpv. make sure the mpv url handler was also registered with the system (this happens automatically on macos)

## Limitations
* Cookies are not passed in any way, hence private vidoes (subscriber only) won't play

## Known bugs
Video urls are not updated on the page unless the url in the address bar changes. for example if you are choosing different categories using the buttons (chips) at the top of the main youtube page.

## Notes
Tested and confirmed working in the following setups:
* GNU/Linux with Xorg, Mozilla Firefox, Violentmonkey
* Windows 32-bit, Chrome, Tampermonkey
* Windows 64-bit, Firefox, Violentmonkey
* Macos, any browser that supports extensions/userscripts
