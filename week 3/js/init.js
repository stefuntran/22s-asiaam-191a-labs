// declare the map


let mapOptions = {"mapCenter": [34.0709,-118.444], "zoomLevel": 5};

const map = L.map('the_map').setView(mapOptions.mapCenter, mapOptions.zoomLevel);

let testString = "hi, this is a test string";
let testCapitalize = testString.toUpperCase()
console.log(testCapitalize);


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

addMarker(37,-122,'home','home land!')
addMarker(32,-118,'work','where i work land!')
addMarker(39,-119,'location 1','random location')
addMarker(36,-120,'location 2','another random location')

// create a function to add markers
function addMarker(lat,lng,title,message){
    console.log(message)
    L.marker([lat,lng]).addTo(map).bindPopup(`<h2>${title}</h2> <h3>${message}</h3>`)
    createButton(lat,lng,title);
    return message
}

function createButton(lat,lng, title){
    const newButton = document.createElement("button");
    newButton.id ="button" + title;
    newButton.innerHTML = title;
    newButton.setAttribute("lat",lat); 
    newButton.setAttribute("lng",lng); 
    newButton.addEventListener('click', function(){
        map.flyTo([lat,lng]);

    })

    document.getElementById("contents").appendChild(newButton);
}   


fetch("lab3.geojson")
    .then(response => {
        return response.json()
    })
    .then(data =>{
        // Basic Leaflet method to add GeoJSON data
        L.geoJSON(data, {
                pointToLayer: (feature, latlng) => { 
                    return L.circleMarker(latlng, {color: feature.properties.color})
                }
            }).bindPopup(layer => {
                return layer.feature.properties.place;
            }).addTo(map);
})