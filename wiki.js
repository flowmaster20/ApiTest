// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Wikipedia
// Edited Video: https://youtu.be/RPz75gcHj18

let searchUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=';
//strona ujednoznaczniajaca
let contentUrl = 'https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&titles=';
//zasob strony

let userInput;

function setup() {
  noCanvas();
  userInput = select('#userinput'); //pobarnie danyc z textboxa
  userInput.changed(goWiki(userInput.value())); //po zmianie tekstu zacznij szukac
}

function goWiki(term) {
  let url = searchUrl + term;
  loadJSON(url, gotSearch, 'jsonp'); //pobraniue strony ujednoznaczniajccej
}


function gotSearch(data) { //uruchamia sie po otrzymaniu danych
  console.log(data);
  let len = data[1].length;
  let index = floor(random(len)); //wybranie losowego tytulu z listy
  let title = data[1][index];
  title = title.replace(/\s+/g, '_'); //zastap spacje podloga
  createDiv(title); //wyjatek do pliku html
  console.log('Querying: ' + title);
  let url = contentUrl + title;
  loadJSON(url, gotContent, 'jsonp');
}

function gotContent(data) {
  let page = data.query.pages;
  let pageId = Object.keys(data.query.pages)[0];
  console.log(pageId);
  let content = page[pageId].revisions[0]['*'];
  console.log(content);
  let wordRegex = /\b\w{4,}\b/g; //wyarzenie regularne na znalezienie pojedynczego slowa
  let words = content.match(wordRegex); //znajdowanie rzeczy pasujacych do wyrazenia regularnego
  let word = random(words); //losowe slowo posrod znalezionych
  goWiki(word); //wyszukaj artykol o tym slowie
  console.log(word);
}
