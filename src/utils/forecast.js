const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = "https://api.darksky.net/forecast/1ed1352be7ddba6d970135e60fd71f62/" + latitude + "," + longitude + "?units=si";

    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback(error, undefined);
        } else if (body.error) {
            callback(body.error, undefined);
        } else {
            const temp = body.currently.temperature;
            const precPercent = body.currently.precipProbability;
            callback(undefined, body.daily.data[0].summary +
                " It is currently " + temp +
                " degrees out. The high today is " + body.daily.data[0].temperatureHigh +
                " with a low of " + body.daily.data[0].temperatureLow +
                ". There is a " + precPercent + "% chance of rain.");
        }
    })
}

module.exports = forecast;