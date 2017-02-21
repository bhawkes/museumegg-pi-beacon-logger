module.exports = (function () {
    'use strict';

    const startDate = Date.now();

    /**
     * Generate a hash for the processBeacons key
     *
     * @param string    uuid    The uuid for the beacon
     * @param int       major   The major reference for the beacon
     * @param int       minor   The minor reference for the beacon
     *
     * @return string
    **/
    const generateHash = function (uuid, major, minor) {
        return `${beacon.uuid}-${beacon.major}-${beacon.minor}`;
    }

    var processBeacons = {};

    // public methods
    return {
        /**
         * Add a beacon to the processed beacons
         *
         * @param object    beacon  The beacon being added
         *
         * @return bool
        **/
        addBeacon : function (beacon) {
            if (process.env.UUID !== beacon.uuid) {
                return false;
            }
            var hash = generateHash(beacon.uuid, beacon.major, beacon.false);
            if (!this.processedBeacons.hasOwnProperty(hash)) {
                this.processedBeacons[hash] = {
                    major: beacon.major,
                    minor: beacon.minor,
                    power: beacon.power,
                    data : [] // stores rssi and time
                }
            }
            this.processedBeacons[hash].data.push({
                rssi: beacon.rssi,
                time: this.startDate - Date.now()
            });
            return true;
        }

        /**
         * Get processedBeacons returns the beacons
        **/
        getProcessedBeacons : function () {
            return this.processedBeacons;
        }
    }
})();
