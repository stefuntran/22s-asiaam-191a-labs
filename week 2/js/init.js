console.log("Javascript test :)")
// JavaScript const variable declaration
const map = L.map('the_map').setView([34.0709, -118.444], 15); 

// Leaflet tile layer, i.e. the base map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map); 

//JavaScript let variable declaration to create a marker
let marker = L.marker([34.0709, -118.444]).addTo(map) 
        .bindPopup('Math Sciences 4328 aka the Technology Sandbox<br> is the lab where I work in ')
        .openPopup();


//let marker2 = L.marker([38.456848, -121.410759]).addTo(map) 
        //.bindPopup('Cosumnes River College<br> is the community college I attended before transferring to UCLA ')
        //.openPopup();

function my_first_function(){
    console.log('hi');
}

my_first_function()

function add_marker(lat,lng, popup){
    L.marker([lat,lng]).addTo(map) 
        .bindPopup(popup)
        //.openPopup();
}

add_marker(38.456848,-121.410759,'Hello marker form function')