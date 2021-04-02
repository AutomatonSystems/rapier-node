# rapier-node
Minimal example of rapier.js working in node (v14) to simulate a very basic scene.

## Usage

* `npm install`
* `node index.js`

You should see console output showing the position of the two entities every tick with additional event logging when they impact and seperate.

## Notes

There are a few hacks required to use the @dimforge/rapier2d-compat package directly in node, they just involve setting up a few enviroment properties that are expected they can be seen at the top of index.js.

The @dimforge/rapier2d package can be used instead of the compat version, but requires a webpack configuration to build.
