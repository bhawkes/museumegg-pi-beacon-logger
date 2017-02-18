var noble = require('noble');


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

noble.on('stateChange', (state) => {
	if (state === "poweredOn") {
		noble.startScanning([], true);

		noble.on('discover', (peripheral) => {




			if ((((peripheral || {}).advertisement || {}).manufacturerData || "").length === 25) {

				var beaconData = peripheral.advertisement.manufacturerData;

				var beacon = {
					uuid: beaconData.slice(4, 20).toString('hex'),
					major: beaconData.readUInt16BE(20),
					minor: beaconData.readUInt16BE(22),
					power: beaconData.readInt8(24),
					rssi: peripheral.rssi
				}

				if (beacons[`${beacon.uuid}-${beacon.major}-${beacon.minor}`]) {

					var name = beacons[`${beacon.uuid}-${beacon.major}-${beacon.minor}`].name

					console.log(`${beacon.uuid}-${beacon.major}-${beacon.minor} (${name})`, beacon.power, beacon.rssi);
				} else {
					console.log(`${beacon.uuid}-${beacon.major}-${beacon.minor} (not known)`, beacon.power, beacon.rssi);
				}

			}
		});
	}

});
