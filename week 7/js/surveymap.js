// declare variables
let mapOptions = {'center': [34.0709,-118.444],'zoom':5}


let yesConcertFirst = L.featureGroup();
let noConcertFirst = L.featureGroup();

let layers = {
    "Yes I would recommend": yesConcertFirst,
    "No I would not recommend": noConcertFirst
}

let circleOptions = {
    radius: 4,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
}

const dataUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS9azmZ8ybZbV4pxV9h5-pUhjI9RYZu8DuYW4VlhDzqE86SaYbPOeg1ITUxZbiGc8U2rHeQGlr4yiEI/pub?output=csv"

// use the variables
const map = L.map('the_map').setView(mapOptions.center, mapOptions.zoom);



let Esri_WorldGrayCanvas = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
    maxZoom: 16
});

Esri_WorldGrayCanvas.addTo(map)


L.control.layers(null,layers).addTo(map)


//L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//}).addTo(map);

L.control.layers(null)

// create a function to add markers
//function addMarker(data){
    // console.log(data)
    // these are the names of our lat/long fields in the google sheets:

    //L.marker([data.lat,data.lng]).addTo(map).bindPopup(`<h2>${data['Where was the concert located at (city, state - eg. Los Angeles, CA)? If it was outside of the U.S. please use (city, country - eg. Tokyo, Japan)']}</h2> <h3>${data['What is the name of your favorite concert? ']}</h3>`)
    //createButtons(data.lat,data.lng,data['Where was the concert located at (city, state - eg. Los Angeles, CA)? If it was outside of the U.S. please use (city, country - eg. Tokyo, Japan)'])
    //return
//}

function addMarker(data){
    if(data['Would you recommend this concert? '] == "Yes"){
        circleOptions.fillColor = "blue"
        yesConcertFirst.addLayer(L.circleMarker([data.lat,data.lng],circleOptions).bindPopup(`<h2>Yes I would recommend</h2>`))
        createButtons(data.lat,data.lng,data['What is the name of a concert you attended?'])
        }
    else{
        circleOptions.fillColor = "red"
        noConcertFirst.addLayer(L.circleMarker([data.lat,data.lng],circleOptions).bindPopup(`<h2>No I would not recommend</h2>`))
        createButtons(data.lat,data.lng,data['What is the name of a concert you attended?'])
    }
    return data
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
    yesConcertFirst.addTo(map) // add our layers after markers have been made
    noConcertFirst.addTo(map) // add our layers after markers have been made  
    let allLayers = L.featureGroup([yesConcertFirst,noConcertFirst]);
    map.fitBounds(allLayers.getBounds());
}

// we will put this comment to remember to call our function later!
loadData(dataUrl)