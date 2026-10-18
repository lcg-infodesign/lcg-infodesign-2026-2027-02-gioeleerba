// Palette colori dell'iride
let paletteIride = ['#77bb41', '#7B2CBF', '#FF0054', '#FF9E00', '#785700', '#00BBF9'];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background('#12121A'); 
  noLoop(); // Disegna tutto una volta sola 

  // Griglia 
  let numeroglifi = 100;
  let numerocolonne = 10;
  let numerorighe = 10;

  // Calcolo lo spazio disponibile per ogni singola cella
  let dimColonna = windowWidth / numerocolonne;
  let dimRiga = windowHeight / numerorighe;

  let xCorrente = 0;
  let yCorrente = 0;

  // Ciclo che si ripete tante volte quanto il numero dei glifi
  for (let g = 0; g < numeroglifi; g++) {
    // L'occhio occupa il 75% della dimensione della sua cella della griglia
    let dimensioneBase = min(dimColonna, dimRiga) * 0.75;
    
    // Assegno i valori base al Glifo (coordinate x,y e dimensione)
    mioGlifo(xCorrente + dimColonna / 2, yCorrente + dimRiga / 2, dimensioneBase);
    
    // Sposto la coordinata X a destra per creare il prossimo occhio
    xCorrente = xCorrente + dimColonna;
    
    // Se la X supera la larghezza dello schermo, torno a sinistra e vado alla riga sotto
    if (xCorrente >= windowWidth - 1) {
      xCorrente = 0;
      yCorrente = yCorrente + dimRiga;
    }
  }
}

function draw() {
  // Lasciamo vuoto perché usiamo noLoop() nel setup
}

// FUNZIONE PERSONALIZZATA PER DISEGNARE UN SINGOLO OCCHIO
function mioGlifo(_x, _y, _size) {
  push(); // Salviamo lo stato iniziale del foglio da disegno
  
  // Spostiamo il punto (0,0) al centro della cella corrente
  translate(_x, _y); 
  
  angleMode(DEGREES);
  
  // Ruotiamo randomicamente l'occhio tra -30 e 30 gradi
  rotate(random(-30, 30)); 
  
  // Scegliamo un colore casuale per l'iride che pesca dalla palette iride
  let colIride = random(paletteIride);
  
  // BULBO OCULARE (base bianca)
  stroke(240);// Colore bianco
  strokeWeight(2);
  fill(240); // Colore bianco
  
  let tipoForma = floor(random(3)); // Sceglie randomicamente tra 0, 1 e 2
  
  if (tipoForma === 0) {
    // Ellisse schiacciata
    ellipse(0, 0, _size, _size * 0.55);
  } else if (tipoForma === 1) {
    // Cerchio
    circle(0, 0, _size * 0.75);
  } else {
    // Rombo con quad (x1,y1,x2,y2,x3,y3,x4,y4)
    quad(-_size/2, 0, 0, -_size * 0.35, _size/2, 0, 0, _size * 0.35);
  }
  
  // IRIDE
  let dimIride = _size * random(0.25, 0.5); // Dimensione randomica dell'iride tra 25% e 50% della dimensione dell'occhio
  
  fill(colIride);
  stroke('#12121A');
  strokeWeight(1.5);
  circle(0, 0, dimIride);
  
  // PUPILLA
  let tipoPupilla = floor(random(3)); // Sceglie randomicamente 0, 1 o 2
  fill('#12121A');
  noStroke();
  
  if (tipoPupilla === 0) {
    // Pupilla classica tonda
    circle(0, 0, dimIride * 0.45);
  } else if (tipoPupilla === 1) {
    // Pupilla verticale stile gatto
    ellipse(0, 0, dimIride * 0.18, dimIride * 0.7);
  } else {
    // Pupilla cerchio piccolo/ punto
    circle(0, 0, dimIride * 0.2);
  }
  
  // Un pallino bianco posizionato in alto a sinistra per dare brillantezza
  fill(255);
  circle(-dimIride * 0.2, -dimIride * 0.2, dimIride * 0.2);
  
  // CIGLIA (Presenti solo su alcuni occhi)
  let haCiglia = random() > 0.45; // 55% di possibilità che l'occhio abbia le ciglia
  
  if (haCiglia) {
    stroke(255);
    strokeWeight(2);
    noFill();
    
    // Disegno le ciglia a raggiera con un ciclo
    let numCiglia = floor(random(3, 6));//sceglie a caso tra 3,4 o 5 ciglia da disegnare
    let passo = 120 / (numCiglia + 1);//distanza tra ciglia
    
    for (let i = 1; i <= numCiglia; i++) {
      push();
      // Ruotiamo ogni singola ciglia lungo il bordo superiore
      rotate(180 + i * passo);
      line(_size * 0.48, 0, _size * 0.62, 0);//linea dritta su cui si creano le ciglia che diventaa ruotata per il rotate sopra
      pop();
    }
  }
  
  pop(); // Ripristiniamo il foglio come era in origine
}
