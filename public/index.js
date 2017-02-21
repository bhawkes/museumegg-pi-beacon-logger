'use strict';

var lateration = require("lateration");
var Circle = lateration.Circle;
var Vector = lateration.Vector;
var laterate = lateration.laterate;

//var socket = io.connect("192.168.5.120:8081");
var socket = io.connect();

var vm = new Vue({
	el: '#app',
	data: {
		position: {
			x: 100,
			y: 100
		},
		beacons: {
			"2cd0879d64c80a451cf39ecfdd55dee9-28925-47754": {
				// static
				uuid: "2cd0879d64c80a451cf39ecfdd55dee9",
				name: "ice",
				major: 28925,
				minor: 47754,
				x: 515,
				y: 170,
				fill: "aqua",
				// variable
				power: 0,
				rssi: 0,
				lastSeen: 0,
				accuracy: 0,
				circle: new Circle(new Vector(0, 0), 0)
			},
			"2cd0879d64c80a451cf39ecfdd55dee9-35635-47204": {
				uuid: "2cd0879d64c80a451cf39ecfdd55dee9",
				name: "mint",
				major: 35635,
				minor: 47204,
				x: 608,
				y: 42,
				fill: "aquamarine",
				power: 0,
				rssi: 0,
				lastSeen: 0,
				accuracy: 0,
				circle: new Circle(new Vector(0, 0), 0)
			},
			"2cd0879d64c80a451cf39ecfdd55dee9-4681-49931": {
				uuid: "2cd0879d64c80a451cf39ecfdd55dee9",
				name: "blueberry",
				major: 4681,
				minor: 49931,
				x: 675,
				y: 175,
				fill: "rebeccapurple",
				power: 0,
				rssi: 0,
				lastSeen: 0,
				accuracy: 0,
				circle: new Circle(new Vector(0, 0), 0)
			}
		}
	},
	computed: {

	},
	methods: {
		parseBeacon: function(data) {

			var beaconID = `${data.uuid}-${data.major}-${data.minor}`;

			// check if beacon is one of ours
			if (!vm.beacons[beaconID]) {
				console.log(`Unknown beacon: ${beaconID}`);
			} else {

				// update beacon
				vm.beacons[beaconID] = Object.assign(vm.beacons[beaconID], {
					power: data.power,
					rssi: data.rssi,
					lastSeen: Date.now(),
					accuracy: calculateAccuracy(data.power, data.rssi)
				});

				var scaledAccuracy = vm.beacons[beaconID].accuracy * 40;

				if (scaledAccuracy > 150) {
					scaledAccuracy = 150;
				}

				vm.beacons[beaconID].circle = new Circle(new Vector(vm.beacons[beaconID].x, vm.beacons[beaconID].y), scaledAccuracy)

				vm.updatePosition();

			}
		},
		updatePosition: function() {

			console.log("updating position");

			var circles = [];

			for (var beacon in vm.beacons) {
				// if data >
				if (vm.beacons[beacon].circle.radius > 0) {
					circles.push(vm.beacons[beacon].circle);
				}
			}

			if (circles.length >= 3) {
				var lateration = laterate(circles);
				console.log(lateration);
				if (lateration) {
					vm.position = lateration;
				} else {
					////
				}
			}



		}
	},
	ready: function() {
		console.log('vue is ready');

		socket.on('discovery', function(data) {
			vm.parseBeacon(data);
		});
	}
});




function calculateAccuracy(txPower, rssi) {
	if (rssi === 0) {
		return -1.0;
	}

	var ratio = rssi * 1.0 / txPower;
	if (ratio < 1.0) {
		return Math.pow(ratio, 10);
	} else {
		var accuracy = (0.89976) * Math.pow(ratio, 7.7095) + 0.111;
		return accuracy;
	}
}
