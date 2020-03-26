const request = require('request')

const geoURL1 = "https://api.mapbox.com/geocoding/v5/mapbox.places/"
const geoURL2 = ".json?access_token=pk.eyJ1IjoiYm9uaW1vbSIsImEiOiJjazdvZzZia3AwN2d2M2ZwcHV2bnAxaTBiIn0.avtciTc9lhcvBmAsZhzXMQ&limit=1"
const darkSkyURL = "https://api.darksky.net/forecast/3adac060efd1d8c9cfebb8e6adadfb6a/"

function geocode(address, result) {
    getTemp("MapBox", geoURL1 + encodeURIComponent(address) + geoURL2, ({features} = {}) => {
        const obj = features[0]
        result({
            "latitude": obj ? obj.center[1] : undefined,
            "longitude": obj ? obj.center[0] : undefined,
            "place": obj ? obj.place_name : undefined
        })
    })
}

function forecast(lat, lng, result) {
    const nxtUrl = darkSkyURL + lat + "," + lng + "?units=si"
    getTemp("DarkSky", nxtUrl, (res) => result(res.currently.summary + " with temp " + res.currently.temperature))
}

function getTempForAddress(add, result) {
    geocode(add, ({latitude, longitude, place}) => {
        forecast(latitude, longitude, (temp) => result({place, temp}))
    })
}

function getTemp(tag, url, result) {
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            console.log("unable to connect -> " + tag)
        } else if (body.error) {
            console.log(body.error + " -> " + tag)
        } else {
            result(body)
        }
    })
}

module.exports = {geocode, forecast, getTempForAddress}