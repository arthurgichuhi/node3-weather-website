const request = require('request')

const geoCode=(address,callback)=>{
const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYXJ0aHVyZ2ljaHVoaSIsImEiOiJjbDNrNnFkaXAwM3BrM3BsbmF0cTJqanpsIn0.xves-W7fL7Wvn7KEY4AIZQ&limit=1'
request({url:geocodeURL,json:true},(error,response)=>{
   if(error){
     callback('Unable to connect to location services',undefined)
   }
   else if(response.body.features.length === 0){
     callback('Unable to find location. Try another search',undefined)
    }
    else{
       callback(undefined,{
           latitude:response.body.features[0].center[0],
           longitude:response.body.features[0].center[1],
           location:response.body.features[0].place_name
       })
    }
})
}
module.exports = geoCode