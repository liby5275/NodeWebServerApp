
var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
    targetUrl = 'https://www.metaweather.com/api/location/search/?query=',
    targetUrl2 = 'https://www.metaweather.com/api/location/'
//https://www.metaweather.com/api/location/search/?query=london


const weatherLoc = document.querySelector('form')
const searchValue = document.querySelector('input')
const message1 = document.querySelector('#message1')
const message2 = document.querySelector('#message2')
const message3 = document.querySelector('#message3')

weatherLoc.addEventListener('submit',(e) => {
    e.preventDefault()

    const loc = searchValue.value
    console.log('location is ' +loc)

    fetch('/weather?address='+loc).then((response) => {
        response.json().then((data) => {
            console.log(data)
            if(data.error != undefined) {
                message1.textContent = 'No location named '+ loc + ' found. Please try another'
                message2.textContent =''
                message3.textContent =''
            } else {
            message1.textContent = 'Its '+ data.weatherInfo + ' in '+loc
            message2.textContent ='Min Temperature: ' + data.minTemp 
            message3.textContent ='Max Temperature: ' + data.maxTemp
            }
        })
    })

    /*
    below code is directly accessing the json from the real time environment.
    So, we are not calling the local url here

    fetch(proxyUrl + targetUrl + loc).then((response) =>{
        response.json().then((data) => {
            if(data.length === 0){
                console.log('error occured while fetching woied. invalid location')
                message1.textContent = 'No location named '+ loc + ' found. Please try another'
                message2.textContent =''
                message3.textContent =''
            } else{
                const woeid = data[0].woeid
                console.log(woeid)
                fetch(proxyUrl + targetUrl2 +woeid).then((response) => {
                    response.json().then((data) => {
                        console.log(data.consolidated_weather[0])
                        message1.textContent = 'Its '+ data.consolidated_weather[0].weather_state_name + ' in '+loc
                        message2.textContent ='Min Temperature: ' + data.consolidated_weather[0].min_temp 
                        message3.textContent ='Max Temperature: ' + data.consolidated_weather[0].max_temp
                    })
                })
            }
        })
    }) 
    */

})

 