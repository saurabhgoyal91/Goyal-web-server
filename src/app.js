const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const publicDirPath = path.join(__dirname,'../public')
app.use(express.static(publicDirPath))

const viewspath=path.join(__dirname,'../template/views')
const partialspath=path.join(__dirname,'../template/partials')
app.set('view engine','hbs')
app.set('views',viewspath)
hbs.registerPartials(partialspath)

app.get('',(req,res)=>{
    res.render('index',{ 
        title:'Saurabh',
        text:'ok'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        helpchahiye:'gudia ko',
        text:'yes'
    })
})
app.get('/about',(req,res)=>{
    res.render('help',{
        title:'gudia',
        text:'no'
    })
})

// app.get('/about',(req,res)=>{
//     res.send('about')
//     })


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (errortest, { latitude, longitude, location }={}) => {
        // if (errortest) {
        //     return res.send({ errortest })
        // }

        forecast(latitude, longitude, (error, forecastData) => {
           
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                
                address: req.query.address,
                location
            })
        })
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'gudia',
        text:'no'
    })
})
app.get('/*',(req,res)=>{
    res.render('404',{
        title:'gudia',
        text:'no'
    })
})
app.listen(3000,()=>{
console.log('server is up')
})