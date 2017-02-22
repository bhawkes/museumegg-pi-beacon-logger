process.env.UUID = "2cd0879d64c80a451cf39ecfdd55dee9";

const Scanner = require("ble-scanner");
const CsvWriter = require('csv-write-stream');
const ProcessBeacon = require("./lib/ProcessBeacon.js");
const fs = require('fs');
const exec = require('child_process').exec;
// Bluetooth device name
const device = "hci0";

var start = Date.now();

var bleScanner;

var scanning = false;
var logging = false;
var docking = false;

const startBeacon = {
	// ice
	hash: "749e340821f18928138894c23ff6d3de-28925-47754",
	rssiTrigger: -50
}

const finishBeacon = {
	// blueberry
	hash: "749e340821f18928138894c23ff6d3de-4681-49931",
	rssiTrigger: -50
}


/**
 * Given a packet from an iBeacon, determine the RSSI reading
 *
 * @param array 	packet
 *
 * @return int
 **/
const rssiCalc = function(packet) {
	let p13 = parseInt(packet[13], 16)
	let rssi = parseInt(packet[14 + p13], 16);
	// Return a signed version of the rssi
	return (rssi & 0x80) ? -(0x100 - rssi) : rssi;
}

/**
 * Callback for the Scanner function, generate beacon objects and send these
 * to be processed
 *
 * @param array 	Packet 	The packet data from the iBeacon
 *
 **/
const callback = (packet) => {
		try {
			if (packet.length === 45) {
				var rssi = rssiCalc(packet);
				packet = Buffer.from(packet.join(""), "hex");
				var beacon = {
					uuid: packet.slice(23, 39).toString('hex'),
					major: packet.readUInt16BE(39),
					minor: packet.readUInt16BE(41),
					power: packet.readInt8(43),
					rssi: rssi
				}

				if (scanning && !docking) {

					if (!logging) {

						if (`${beacon.uuid}-${beacon.major}-${beacon.minor}` === startBeacon.hash && beacon.rssi > startBeacon.rssiTrigger) {
							console.log("START LOGGING", beacon.rssi);
							logging = true;
						}

					} else {

						ProcessBeacon.addBeacon(beacon);
						process.stdout.write(".");

						if (`${beacon.uuid}-${beacon.major}-${beacon.minor}` === finishBeacon.hash && beacon.rssi > finishBeacon.rssiTrigger) {
							logging = false;
							console.log("FINISH LOGGING", beacon.rssi);
							finishScanning();
						}

					}

				}

			}
		} catch (err) {
			console.error(err);
		}
	}
	// Initialise scan

const startScanning = () => {
	bleScanner = new Scanner(device, callback);
	start = Date.now();
	scanning = true;
	logging = false;
	docking = true;


	setTimeout(function() {
		docking = false;
	}, 5000);
}

const finishScanning = () => {
	//bleScanner.destroy();
	docking = true;

	var timeEnd = Date.now();

	var writer = CsvWriter();
	writer.pipe(fs.createWriteStream(`./tmp/${timeEnd}.csv`));
	ProcessBeacon.getProcessedBeacons().forEach(item => writer.write(item));
	writer.end();
	console.log("SENDING TO MACHINE");
	exec(`obexftp -b A0:99:9B:07:D4:60 -p tmp/${timeEnd}.csv`, function(err, stdout, stderr) {
		//console.log(arguments);
		console.log("SENT TO MACHINE");
		setTimeout(function() {
			docking = false;
		}, 5000);
	});
}


startScanning();
