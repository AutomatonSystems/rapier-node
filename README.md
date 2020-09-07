# rapier-node
Minimal example of rapier.js working in node to simulate a very basic scene.

## Usage

There are a few hacks to use the @dimforge/rapier2d package directly in node:

* checkout repo
* npm install
* Change @dimforge/rapier2d package.json to allow node esmodule imports:

	To enable node to load the package add the following key/values:
	* `"main": "rapier2d.js"`
	* `"type": "module"`
*  Fix NPE in world.step():

	There seems to be some trouble with how the wasm state gets initialized by node as calling world.step() throws a NPE from `__wbg_now_0aafc2276b5e8d61` (the function name will vary slightly between builds) in `rapier2d_bg.js`, it seems it's trying to read a time from a bad memory address... - however it seems fine to just use optional chaining to ignore it:

		1521: `var ret = getObject(arg0).now();`
	becomes

		1521: `var ret = getObject(arg0)?.now();`
	
	This will probably do something *_horrible_* somewhere else in the code, but in the extremely limited demo here it doesn't seem to be causing trouble...

## Running

With those two issue fixed it is possible to run the code:

`node --experimental-wasm-modules index.js`

You should see console output showing the position of the two entities every tick with additional event logging when they impact and seperate.


