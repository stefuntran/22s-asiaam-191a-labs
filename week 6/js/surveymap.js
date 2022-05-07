// declare variables
let mapOptions = {'center': [34.0709,-118.444],'zoom':5}

// use the variables
const map = L.map('the_map').setView(mapOptions.center, mapOptions.zoom);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// create a function to add markers
function addMarker(data){
    // console.log(data)
    // these are the names of our lat/long fields in the google sheets:
    L.marker([data.lat,data.lng]).addTo(map).bindPopup(`<h2>${data['Where was the concert located at (city, state - eg. Los Angeles, CA)? If it was outside of the U.S. please use (city, country - eg. Tokyo, Japan)']}</h2> <h3>${data['What is the name of your favorite concert? ']}</h3>`)
    createButtons(data.lat,data.lng,data['Where was the concert located at (city, state - eg. Los Angeles, CA)? If it was outside of the U.S. please use (city, country - eg. Tokyo, Japan)'])
    return
}

function createButtons(lat,lng,title){
    const newButton = document.createElement("button"); // adds a new button
    newButton.id = "button"+title; // gives the button a unique id
    newButton.innerHTML = title; // gives the button a title
    newButton.setAttribute("lat",lat); // sets the latitude 
    newButton.setAttribute("lng",lng); // sets the longitude 
    newButton.addEventListener('click', function(){
        map.flyTo([lat,lng]); //this is the flyTo from Leaflet
    })
    const spaceForButtons = document.getElementById('placeForButtons')
    spaceForButtons.appendChild(newButton);//this adds the button to our page.
}

//const placeForButtons = document.getElementById('placeButtons');


const dataUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRQeddvkVQKRIKoSiSxowONwQscTXo-JfMcm93PdJ9dFYuY4Tlp-vvQ504C_-pkoVKDLH2vsWvDSgGm/pub?output=csv"

function loadData(url){
    Papa.parse(url, {
        header: true,
        download: true,
        complete: results => processData(results)
        
    })
}


function processData(results){
    console.log(results) //for debugging: this can help us see if the results are what we want
    results.data.forEach(data => {
        console.log(data) // for debugging: are we seeing each data correctly?
        addMarker(data)
    
    })
}

// we will put this comment to remember to call our function later!
loadData(dataUrl)