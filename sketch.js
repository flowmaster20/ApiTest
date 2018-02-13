
function preload() {
  var url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson'
  earthquakes = loadJSON(url);
}

function setup() {

  createCanvas(360*4, 180*4);
  background(255);
}

function draw() {

  var long = round(earthquakes.features[1].geometry.coordinates[0]);
  var lat = round(earthquakes.features[1].geometry.coordinates[1])
  var mag = earthquakes.features[0].properties.mag;
  var name = earthquakes.features[0].properties.title;
  var depth = round(earthquakes.features[1].geometry.coordinates[2])
var c = color(map(depth,0,100,0,200));
  fill(c);
  translate(180*4, 90*4);
  rect(0, 0, 10, 10);
   fill(c);
  ellipse(long*4, -lat*4, 20*mag, 20*mag);
  text(name, long*4,-lat*4-20);
  for(var i = 0;i<100000000;i++){
  var r = 100000000 - i;
    var tekst = i;
  }
  location.reload(true);

}
