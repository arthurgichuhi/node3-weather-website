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
        callback(undefined,'It is currently '+response.body.current.weather_descriptions[0]+
        '.The temprature is '+response.body.current.temperature+
        ' degrees out but it feels like '+response.body.current.feelslike+
        ' degrees. The humidity of the area is '+response.body.current.humidity+
        '% with and '+response.body.current.precip+
        '% chances of rainfall and a cloud cover of '+response.body.current.cloudcover+'%.' )
    }})}


module.exports = forecast