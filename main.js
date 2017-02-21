const Scanner = require("ble-scanner");

const device = "hci0";

var callback = (packet) => {

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

			console.log(beacon);

		}


	} catch (err) {

		console.log(err);

	}


}


var bleScanner = new Scanner(device, callback);


const rssiCalc = function(packet) {
	let p13 = parseInt(packet[13], 16)
	let rssi = parseInt(packet[14 + p13], 16);
	return (rssi & 0x80) ? -(0x100 - rssi) : rssi;
}
