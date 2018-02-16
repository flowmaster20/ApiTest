var long = [];
var lat = [];
var mag = [];
var name = [];
var depth = [];
//9650
function preload() {
  var url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson'
  earthquakes = loadJSON(url);
}

function setup() {
  nn = new NeuralNetwork(1, 2000, 1);
  createCanvas(360 * 4, 180 * 4);
  background(255);
}

function draw() {
  noLoop();
  for (var i = 0; i < 9600; i++) {
    long[i] = round(earthquakes.features[i].geometry.coordinates[0]);
    lat[i] = round(earthquakes.features[i].geometry.coordinates[1])
    mag[i] = earthquakes.features[i].properties.mag;
    name[i] = earthquakes.features[i].properties.title;
    depth[i] = round(earthquakes.features[i].geometry.coordinates[2]);
  }
  console.log(name[0], name[1], name[2]);
  var c = color(map(depth, 0, 100, 0, 200));
  fill(c);
  translate(180 * 4, 90 * 4);
  rect(0, 0, 10, 10);
  fill(c);
  for (var i = 0; i < 9600; i++) {
    ellipse(long[i] * 4, -lat[i] * 4, 20 * mag[i], 20 * mag[i]);
    //text(name[i], long[i] * 4, -lat[i] * 4 - 20);
  }
  //location.reload(true);
// let inputs = [];
// let outputs = [];
//   for (var i = 0; i < 100; i++) {
//
//       inputs[i] = i
//       outputs[i] =  [ long[i], lat[i] ]
//
//   };
  for (var i = 0; i < 9600; i++) {
    var input = [i];
var output =  [i * i];
    nn.train(input, output);
  }
  var co = [7];
  var wynik = nn.predict(co);
  console.log(wynik);
  console.log(7*7);
}
