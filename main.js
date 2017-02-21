process.env.UUID = "2cd0879d64c80a451cf39ecfdd55dee9";

const Scanner = require("ble-scanner");
const CsvWriter = require('csv-write-stream');
const ProcessBeacon = require("./lib/ProcessBeacon.js");
const fs = require('fs');
const exec = require('child_process').exec;
// Bluetooth device name
const device = "hci0";

const start = Date.now();
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
			ProcessBeacon.addBeacon(beacon);
		}
	} catch (err) {
		console.error(err);
	}
}
// Initialise scan

var x = setTimeout(function (beacon) {
	bleScanner.destroy();
	var writer = CsvWriter();
	writer.pipe(fs.createWriteStream(`./tmp/${start}.csv`));
	ProcessBeacon.getProcessedBeacons().forEach(item => writer.write(item));
	writer.end();
	exec(`obexftp -b A0:99:9B:07:D4:60 -p ./tmp/${start}.csv`, function(err, stdout, stderr) {
		console.log(arguments);
	});
}, 60000);

var bleScanner = new Scanner(device, callback);
