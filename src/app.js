const path = require('path')
const weather = require('./weather')
const hbs = require('hbs')
const express = require('express')

const app = express()

//paths for express reference
const dynamicPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

//code to deliver static contents
app.use(express.static(dynamicPath))


/*
****************CODE TO GET DYNAMIC WEB PAGE USING HBS***************
*/
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

app.get('', (req, res) => {
    res.render('index', {
        title:'HBS content',
        name:'Bibin Thomas'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        name:'Bibin Thomas'
    })
})


app.get('/help', (req,res) => {
    res.render('help',{
        title:'help scree',
        name:'bibin'
    })
})

app.get('/weather',(req, res) => {

    if(!req.query.address){
        return res.send({
            error:'please provide address and try'
        })
    }
    weather.processLocation(req.query.address, (error, callbackWoid)=>{
        if(error!= undefined){
            return res.send({
                error:error
            })
        }
        weather.getWeatherInfo(callbackWoid, (error, callbackWeather) => {
            
            if(error != undefined){
                return res.send({
                    error:'error occured while fetching weather info'
                })
            }

            res.send({
                location:req.query.address,
                weatherInfo:callbackWeather.weather_state_name
            })


        })
    })
    
})

app.get('*', (req,res) => {
    res.render('404')
})


/*
*************** CODE TO GET THE STATIC HTML FILES BELOW*************************


//app.use(express.static(dynamicPath))

 /* app.get('',(req,res) => {
    console.log('hello! welcome to express')
    //res.send("heloo there")
    res.sendFile(path.join(dynamicPath + '/index.html'))
}) 

 app.get('/about', (req,res) => {
    res.sendFile(path.join(dynamicPath + '/about.html'))
    
})  */

/*
in the abve example, two ways we can deliver about.html file

1. without app.get() call. In this method, we will use app.use() to take all htm files from the path specified
. then localhost:3000/about.html will give the response only if there exist a file named about.html.
please note that you need to specify the '.html' part in the url. IT is not url based. it is directly fetching the html

2. without specifiying the 'html' part in url here you need app.get() method. here we use res.sendFile()
to deliver the file. URL would be localhost:3000/about
*/

app.listen(3000,() =>{
    console.log('server up on port 3000')
} )