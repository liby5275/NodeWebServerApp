const request = require('request')

const processLocation = (location, callback) => {
    const urlTogetWoeid = 'https://www.metaweather.com/api/location/search/?query=' + location

    request({ url: urlTogetWoeid, json: true }, (error, response) => {
        if (error) {
            console.log('error occured. please check your URL');
            callback('error occured. please check your URL',undefined)
        } else if (response.body.length === 0) {
            console.log('location not found! please enter a valid locaton')
            callback('location not found! please enter a valid locaton',undefined)
        }
        else {
            const dataJson = response.body;
            const woeid = dataJson[0].woeid
            callback(undefined,woeid)
        }
    })

}



const getWeatherInfo = (woeid, callback) => {
    console.log(woeid)
    const url = 'https://www.metaweather.com/api/location/' + woeid

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('error occured', undefined)
        } else {
            const dataJson = response.body
            callback(undefined, dataJson.consolidated_weather[0])
        }
    })

}

module.exports = {
    processLocation: processLocation,
    getWeatherInfo: getWeatherInfo
}