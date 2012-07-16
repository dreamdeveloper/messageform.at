# messageform.at

This is the website and subsequent tool to help generate ICU Messageformat style messages.

These can be used with any ICU Messageformat implementations, but are tested specifically with [messageformat.js](https://github.com/slexaxton/messageformat.js).

## Goals

I'd like this to be a resource for people learning how to write well-formatted messages.

I'd also like this to be usable for translators who don't need to know the actual messageformat syntax. It's well thought out for programmers, but unfortunately leaves translators a bit in the dust.

## Running

If you'd like to run this locally, you'll need node.js:

### To install

`git clone git@github.com:SlexAxton/messageform.at.git && cd messageform.at`

### To serve (dev mode)

`make serve`

Then visit http://127.0.0.1:3000/

### To Build

`make`

### To Serve the build

`make install`

Then visit http://127.0.0.1:3000/

## License

Use: [WTFPL](http://sam.zoy.org/wtfpl/)
Contributor: [Dojo Style CLA](http://dojofoundation.org/about/cla)

You agree to these terms by submitting a pull request.
