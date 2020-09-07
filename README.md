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

## Running

With the packagge.json fixed it is possible to run the code:

`node --experimental-wasm-modules index.js`

You should see console output showing the position of the two entities every tick with additional event logging when they impact and seperate.

## Notes 

The code starts by leaking the `perf_hooks.performance` object onto the global scope, which allows rapier to call it as if we were in a browser context
`
import {performance} from "perf_hooks";
globalThis.performance = performance;
`