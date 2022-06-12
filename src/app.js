const path = require('path')
const express = require ('express')
const hbs = require ('hbs')
const forecast = require('./utils/forecast')
const geoCode = require('./utils/geocode')

const app = express()

//Define paths for express config
const publicdirectorypath=path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup static directory to serve
app.use(express.static(publicdirectorypath))

//Setup handlebars and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.get('',(req,res)=>{
    res.render('index',{title:'Weather App',name:'Arthur Gichuhi'})
})
app.get('/about',(req,res)=>{
    res.render('about',{title:'About',name:'Arthur Gichuhi'})
})
app.get('/help',(req,res)=>{
    res.render('help',{title:'Help',name:'Arthur Gichuhi'})
})

// app.get('',(req,res)=>{
//     res.send("Hello Express")
// })
// app.get('/help',(req,res)=>{
//     res.send("Help Page")
// })
// app.get('/about',(req,res)=>{
//     res.send("About Page")
// })
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({error:'You must provide an address'})
    }
        geoCode(req.query.address,(error,{latitude,longitude,location}={})=>{
            if(error){
                return( res.send({error}))
            }
            forecast(latitude,longitude,(error,forecastData)=>{
                if(error){
                    return res.send({error})
                }
                res.send({
                    forecast:forecastData,
                    location,
                    address:req.query.address
                })
            })
        })
    
    // res.send({
    //     forecast:'Its snowing in Philadelphia',
    //     location: 'Philadeplia',
    //     address: req.query.address
    // })
})
app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }
    res.send({products:[]})
})

app.get('/help/*',(req,res)=>{
    res.render('error',{title:'Help',message:'Help Article Not Found',name:'Arthur Gichuhi'})
})
app.get('*',(req,res)=>{
    res.render('error',{title:"404 Page Error",message:'Page not Found',name:'Arthur Gichuhi'})
})
app.listen(3000,()=>{
    console.log("Server started on port 3000")
})