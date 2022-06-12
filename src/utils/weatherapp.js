const request = require ('request')
const geoCode = require('./geocode')
const forecast = require('./forecast')

geoCode('Nairobi',(error,data)=>{
  console.log(data)
})
forecast(36.81667,-1.28333,(error,data)=>{
  console.log(data)
})
