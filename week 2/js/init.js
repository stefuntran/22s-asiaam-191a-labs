// declare variables
let zoomLevel = 5;
const mapCenter = [38.4632418,-121.4230084];

// use the variables
const map = L.map('the_map').setView(mapCenter, zoomLevel);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// create a function to add markers
function addMarker(lat,lng,title,message){
    console.log(message)
    L.marker([lat,lng]).addTo(map).bindPopup(`<h2>${title}</h2>`)
    //createButtons(lat,lng,title,message); // new line!!!
    return message
}

// use our marker functions
addMarker(34.06999972,-118.439789907 ,'UCLA, Where I go to school now.')
addMarker(38.4632418,-121.4230084 ,'Herman Leimbach Elementary School. This is where I went K-6.')
addMarker(38.4485,-121.394173578,'Edward Harris Middle School. This is where I went 7th-8th grade.')
addMarker(38.450110,-121.395860,'Monterey Trail High School. This is where I went 9th-12th grade.')
addMarker(38.454182,-121.427177,'Cosumnes River College. This is where I went for community college. I went to all three throughout my two years.')
addMarker(38.540611,-121.489388,'Sacramento City College. This is where I went for community college. I went to all three throughout my two years.')
addMarker(38.662601,-121.126930,'Folsom Lake College. This is where I went for community college. I went to all three throughout my two years.')

 