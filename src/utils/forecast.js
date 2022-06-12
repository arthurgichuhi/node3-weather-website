const request = require('request')

const forecast=(latitude,longitude,callback)=>{
const url = 'http://api.weatherstack.com/current?access_key=1792dc5c67b18b55838cd97d98a9bc66&query='+latitude+','+longitude+'&units=m'
request({url, json:true},(error, response)=>{
     if(error){
     callback('Unable to connect to location services',undefined)
   }
   else if(response.body.error){
     callback('Unable to find location. Try another search',undefined) 
   }
    else{
        callback(undefined,response.body.current.weather_descriptions[0]+
        '.It is currently '+response.body.current.temperature+
        ' degrees out')
    }})}


module.exports = forecast