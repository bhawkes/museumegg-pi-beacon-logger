// var lateration = require("lateration");
// var Circle = lateration.Circle;
// var Vector = lateration.Vector;
// var laterate = lateration.laterate;
//
// // The beacons
// var beacons = [
// 	new Circle(new Vector(0, 1), 5.89),
// 	new Circle(new Vector(4, 7), 4.62),
// 	new Circle(new Vector(4, 5), 2.73)
// ];
//
// // Laterating
// var position = laterate(beacons);
//
//
// console.log(position);


var Bleacon = require('bleacon');

Bleacon.startScanning();


Bleacon.on('discover', function(bleacon) {
	// ...
	//console.log(bleacon);

	let id = `${bleacon.uuid}-${bleacon.major}-${bleacon.minor}`;

	console.log(beacons[id].name);

});


var beacons = {
	"2cd0879d64c80a451cf39ecfdd55dee9-28925-47754": {
		uuid: "2cd0879d64c80a451cf39ecfdd55dee9",
		name: "ice",
		major: 28925,
		minor: 47754,
		measuredPower: false,
		rssi: false,
		accuracy: 0,
		proximity: false
	},
	"2cd0879d64c80a451cf39ecfdd55dee9-35635-47204": {
		uuid: "2cd0879d64c80a451cf39ecfdd55dee9",
		name: "mint",
		major: 35635,
		minor: 47204,
		measuredPower: false,
		rssi: false,
		accuracy: 0,
		proximity: false
	},
	"2cd0879d64c80a451cf39ecfdd55dee9-4681-49931": {
		uuid: "2cd0879d64c80a451cf39ecfdd55dee9",
		name: "blueberry",
		major: 4681,
		minor: 49931,
		measuredPower: false,
		rssi: false,
		accuracy: 0,
		proximity: false
	}
};


setInterval(() => {
	console.log(beacons[0].name, beacons[0].measuredPower, beacons[0].rssi, beacons[0].accuracy);
	console.log(beacons[1].name, beacons[1].measuredPower, beacons[1].rssi, beacons[1].accuracy);
	console.log(beacons[2].name, beacons[2].measuredPower, beacons[2].rssi, beacons[2].accuracy);
}, 1000000);
