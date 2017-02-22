module.exports = (function() {
	'use strict';

	/**
	 * Generate a hash for the processBeacons key
	 *
	 * @param int       major   The major reference for the beacon
	 * @param int       minor   The minor reference for the beacon
	 *
	 * @return string
	 **/
	const generateHash = function(major, minor) {
		return `${major}:${minor}`;
	}

	var processedBeacons = {};

	// public methods
	return {
		/**
		 * Add a beacon to the processed beacons
		 *
		 * @param object    beacon  The beacon being added
		 *
		 * @return bool
		 **/
		addBeacon: function(beacon) {
			if (
				typeof beacon !== 'object' ||
				!beacon.hasOwnProperty('uuid') ||
				process.env.UUID !== beacon.uuid
			) {
				return false;
			}
			var hash = generateHash(beacon.major, beacon.minor);
			if (!processedBeacons.hasOwnProperty(hash)) {
				processedBeacons[hash] = {
					major: beacon.major,
					minor: beacon.minor,
					power: beacon.power,
					data: [] // stores rssi and time
				}
			}
			processedBeacons[hash].data.push({
				rssi: beacon.rssi,
				time: Date.now()
			});
			return true;
		},

		/**
		 * Get processedBeacons returns the beacons
		 *
		 * @return array
		 **/
		getProcessedBeacons: function() {
			var beaconData = [];
			Object.keys(processedBeacons).forEach(function(hash) {
				processedBeacons[hash].data.map(function(record) {
					return {
						hash: hash,
						power: processedBeacons[hash].power,
						rssi: record.rssi,
						time: record.time
					}
				}).forEach(item => beaconData.push(item));
				delete processedBeacons[hash];
			});
			return beaconData;
		}
	}
})();
