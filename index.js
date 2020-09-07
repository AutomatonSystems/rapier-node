import {performance} from "perf_hooks";
globalThis.performance = performance;

import * as Rapier from "@dimforge/rapier2d";

// create world and event queue
let world = new Rapier.World(0, 0);
let events = new Rapier.EventQueue(true);
console.log(world, events);

// create two entities on a collision course
let e1 = makeEntity(-1, 0.1, 1, 0, 0.5);
let e2 = makeEntity(1, 0, -1, 0, 0.5);

// handles
console.log(e1.handle(), e2.handle());

// simulate 1 second
for(let i = 0; i < 60; i++){
	world.stepWithEvents(events);

	events.drainContactEvents((handle1, handle2, contactStarted) => {
        console.log("Contact between:", handle1, "and", handle2, ". Started:", contactStarted);
	});

	events.drainProximityEvents((handle1, handle2, prevProximity, newProximity) => {
        console.log("Proximity between: ", handle1, "and", handle2, ". Previous proximity:", prevProximity, "new proximity: ", newProximity);
	});
	  
	let t1 = e1.translation();
	let t2 = e2.translation();
	console.log(`(${t1.x},${t1.y}) (${t2.x},${t2.y})`);
}

console.log("done.");

/**
 *	Util function to make an rigid body entity 
 * 
 * @param {Number} x 
 * @param {Number} y 
 * @param {Number} vx 
 * @param {Number} vy 
 * @param {Number} r 
 */
function makeEntity(x,y,vx,vy,r){
	let bodyDesc = new Rapier.RigidBodyDesc("dynamic");
	bodyDesc.setTranslation(x, y);
	let entity = world.createRigidBody(bodyDesc);
	entity.createCollider(Rapier.ColliderDesc.ball(r));
	entity.applyImpulse(new Rapier.Vector(vx,vy), true);
	return entity;
}