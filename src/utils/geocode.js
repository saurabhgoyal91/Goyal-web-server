const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1Ijoic2F1cmFiaGdveWFsOTEiLCJhIjoiY2twZ2YzZmxpMDRoeDJ2cXo2Y3NoOWJjcSJ9.O9JuSaTuQ06Yj0q636OEyw&limit=1'
    request({ url: url, json: true }, (error, response) => {
        callback(response.body)
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (response.body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode