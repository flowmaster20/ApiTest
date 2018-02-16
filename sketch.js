var long = [];
var lat = [];
var mag = [];
var name = [];
var depth = [];
var tsunami = [];
var input_long;
var input_lat;
var input_mag;
var map =[];
var x;
var y;
//9650https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2017-12-20
function preload() {
  //var url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson'
  var url = 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2017-12-20'

  earthquakes = loadJSON(url);
}

function setup() {
    noLoop();
  frameRate(1);
  nn = new NeuralNetwork(3, 200, 1);
  createCanvas(360 , 180);
  background(220);
  input_long = select('#input_long');
  input_lat = select('#input_lat');
  input_mag = select('#input_mag');
  // input_long.changed(check(input_long.value(),input_lat.value(),input_mag.value()));
  // input_lat.changed(check(input_long.value(),input_lat.value(),input_mag.value()));
  // input_mag.changed(check(input_long.value(),input_lat.value(),input_mag.value()));
  for (var i = 0; i < 19000; i++) {
    long[i] = round(earthquakes.features[i].geometry.coordinates[0]);
    lat[i] = round(earthquakes.features[i].geometry.coordinates[1])
    mag[i] = earthquakes.features[i].properties.mag;
    tsunami[i] = earthquakes.features[i].properties.tsunami;
    name[i] = earthquakes.features[i].properties.title;
    depth[i] = round(earthquakes.features[i].geometry.coordinates[2]);
  }


  for (var i = 0; i < 19000; i++) {
    var input = [long[i],lat[i],mag[i]];
    var output;
    if(tsunami[i]>0){
      var output = [1];
    }
    else{
      var output = [0];
    }
    nn.train(input, output);
    console.log(i);

  }
}

 function draw() {
//
// for(x = -179;x<180;x++){
//   for(y = -89;y<90;y++){
//     map = check(x,y,2);
//     console.log(x,y);
// }



for(var i = 0;i< 19000;i++){
  if(tsunami[i] > 0){
    translate(180,90);
    fill(0);
    console.log("find",long[i]);
    rect(long[i],lat[i],5,5);
  }
}


  //
  // var c = color(map(depth, 0, 100, 0, 200));
  // fill(c);
  // translate(180 * 4, 90 * 4);
  // rect(0, 0, 10, 10);
  // fill(c);
  // var licznik = 0;
  // for (var i = 0; i < 9600; i++) {
  //   if(tsunami[i]>0&&licznik < 1){
  //     fill(255,0,0,80);
  //     console.log(mag[i],lat[i],long[i],tsunami[i]);
  //     licznik++;
  //   }
  //   ellipse(long[i] * 4, -lat[i] * 4, 2 * mag[i], 2 * mag[i]);
    //text(name[i], long[i] * 4, -lat[i] * 4 - 20);
//  }
  //location.reload(true);
// let inputs = [];
// let outputs = [];
//   for (var i = 0; i < 100; i++) {
//
//       inputs[i] = i
//       outputs[i] =  [ long[i], lat[i] ]
//
//   };
// input_long = select('#input_long');
// input_lat = select('#input_lat');
// input_mag = select('#input_mag');
// check(input_long.value(),input_lat.value(),input_mag.value())

}

function check(_long,_lat,_mag){

  var co = [_long,_lat,_mag];
  var wynik = nn.predict(co);
  console.log(wynik);
    translate(180 , 90);
  if (wynik[0] > 0.5){
    // fill(0);
    // rect(y,x,5,5);
    console.log(x,y);
}

  // createDiv("yes:");
  // createDiv(wynik[0]);
  // createDiv("no:");
  // createDiv(wynik[1]);
}
