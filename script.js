const gombokDiv = document.getElementById('gombok');
let modeV = 0;
let matrix;

let urhajoV = 0;
let meglevoV = 0;
let megnyomottgombokV = 0;
let hatralevoV = 0;
let lephetoV = 20;
let bealloV = 0;

uj();

function uj(){
    urhajoV = 0;
    meglevoV = 0;
    megnyomottgombokV = 0;
    hatralevoV = 0;
    lephetoV = 20;
    bealloV = 0;

    gombnyomas();
    urhajokiiro();
    MatrixGen();
    generalas();
    szamolas();
    gombbetoltes();
    plusz();
};

function MatrixGen(){
    matrix = Array(12);
    for (let i = 0; i < 12; i++) {
        matrix[i] = Array(12);
        for (let j = 0; j < 12; j++) {
            matrix[i][j] = i * 12 + j;
        }
    }
};

function generalas(){
  // biztos alapállapot
  for (let i = 0; i < 12; i++) {
    for (let j = 0; j < 12; j++) {
      matrix[i][j] = 1;
    }
  }

  const shapes = [
    // I
    [[0,0],[0,1],[0,2],[0,3]],
    // O
    [[0,0],[0,1],[1,0],[1,1]],
    // T
    [[0,1],[1,0],[1,1],[1,2]],
    // L
    [[0,0],[1,0],[2,0],[2,1]],
    // J (mirror L)
    [[0,1],[1,1],[2,1],[2,0]],
    // S
    [[0,1],[0,2],[1,0],[1,1]],
    // Z
    [[0,0],[0,1],[1,1],[1,2]]
  ];

  function rotateShape(shape, r) {
    // r = 0..3, rotate 90deg r times around origin
    return shape.map(([x,y])=>{
      let nx = x, ny = y;
      for (let k=0;k<r;k++){
        [nx,ny] = [ny, -nx];
      }
      return [nx,ny];
    });
  }

  function canPlace(coords){
    // coords: array of [r,c]
    for (const [r,c] of coords){
      if (r<0||r>=12||c<0||c>=12) return false;
      // check 3x3 neighborhood for existing ship cell (0)
      for (let dr=-1; dr<=1; dr++){
        for (let dc=-1; dc<=1; dc++){
          const rr = r+dr, cc = c+dc;
          if (rr>=0 && rr<12 && cc>=0 && cc<12){
            if (matrix[rr][cc] === 0) return false;
          }
        }
      }
    }
    return true;
  }

  function place(coords){
    for (const [r,c] of coords) matrix[r][c] = 0;
  }

  const MAX_RESTARTS = 100;
  const MAX_TRIES_PER_SHAPE = 600;
  let restartCount = 0;

  outer:
  while (restartCount < MAX_RESTARTS) {
    // ha újra kell próbálni, resetelődik a mátrix
    for (let i = 0; i < 12; i++) for (let j = 0; j < 12; j++) matrix[i][j] = 1;

    let okAll = true;

    for (let s = 0; s < shapes.length; s++){
      let placed = false;
      for (let attempt = 0; attempt < MAX_TRIES_PER_SHAPE; attempt++){
        const rot = Math.floor(Math.random()*4);
        const shapeR = rotateShape(shapes[s], rot);

        // bounding box
        let minR = Infinity, minC = Infinity, maxR = -Infinity, maxC = -Infinity;
        for (const [x,y] of shapeR){
          if (x < minR) minR = x;
          if (y < minC) minC = y;
          if (x > maxR) maxR = x;
          if (y > maxC) maxC = y;
        }
        const height = maxR - minR + 1;
        const width  = maxC - minC + 1;

        const baseR = Math.floor(Math.random() * (12 - height + 1));
        const baseC = Math.floor(Math.random() * (12 - width + 1));

        const coords = shapeR.map(([x,y]) => [ baseR + (x - minR), baseC + (y - minC) ]);

        if (canPlace(coords)){
          place(coords);
          placed = true;
          break;
        }
      }

      if (!placed){
        okAll = false;
        restartCount++;
        continue outer; // restart teljes elhelyezés
      }
    }

    if (okAll) break; // siker
  }

  // ha nagyon sok restart után sem sikerült, eseti fallback: szórt pontok (ritkán lesz szükséges)
  if (restartCount >= MAX_RESTARTS){
    for (let i = 0; i < 12; i++) for (let j = 0; j < 12; j++) matrix[i][j] = 1;
    let count = 0;
    while (count < 28){
      const x = Math.floor(Math.random()*12);
      const y = Math.floor(Math.random()*12);
      if (matrix[x][y] !== 0){
        matrix[x][y] = 0;
        count++;
      }
    }
  }
}


function szamolas() {
  const sor = matrix.length;
  const oszlop = matrix[0].length;

  // dist mátrix létrehozása
  const dist = [];
  for (let i = 0; i < sor; i++) {
    dist[i] = [];
    for (let j = 0; j < oszlop; j++) {
      if (matrix[i][j] === 0) dist[i][j] = 0;
      else dist[i][j] = Infinity;
    }
  }

  // Ismételjük, amíg nem változik semmi
  let valtozott = true;
  while (valtozott) {
    valtozott = false;
    for (let i = 0; i < sor; i++) {
      for (let j = 0; j < oszlop; j++) {
        if (dist[i][j] === 0) continue;

        let min = dist[i][j];
        if (i > 0) min = Math.min(min, dist[i - 1][j] + 1);
        if (i < sor - 1) min = Math.min(min, dist[i + 1][j] + 1);
        if (j > 0) min = Math.min(min, dist[i][j - 1] + 1);
        if (j < oszlop - 1) min = Math.min(min, dist[i][j + 1] + 1);

        if (min < dist[i][j]) {
          dist[i][j] = min;
          valtozott = true;
        }
      }
    }
  }

  // visszaírás az eredeti mátrixba
  for (let i = 0; i < sor; i++) {
    for (let j = 0; j < oszlop; j++) {
      matrix[i][j] = dist[i][j];
    }
  }
}


function gombbetoltes(){
    gombokDiv.innerHTML = '';
    for (let i = 0; i < 12; i++) {
        for (let j = 0; j < 12; j++) {
            const gomb = document.createElement('button');
            const contentDiv = document.createElement('div');
            contentDiv.className = 'content';
            contentDiv.innerHTML = matrix[i][j];
            
            gomb.appendChild(contentDiv);
            
            if (matrix[i][j]==0){
                contentDiv.innerHTML = '<img src="img/rocket.png">';
                gomb.addEventListener('click', function handler(event) {
                    this.classList.add('revealed', 'raketa');
                    this.disabled = true;
                    --lephetoV;
                    ++megnyomottgombokV;
                    gombnyomas();
                    ++urhajoV
                    urhajokiiro();
                    plusz();
                }, { once: true });
            } else {
                gomb.addEventListener('click', function handler(event) {
                    this.classList.add('revealed', 'number');
                    this.disabled = true;
                    --lephetoV;
                    ++megnyomottgombokV;
                    gombnyomas();
                    plusz();
                }, { once: true });
            }
        
            gombokDiv.appendChild(gomb);
        }
    }
};

function gombnyomas(){
    document.getElementById("lepesek").innerText = "Megtett lépések: " + megnyomottgombokV;
    if(modeV==1){document.getElementById("hatralevolepesek").innerText = "Hátralévő lépések: " + lephetoV;}
};

function urhajokiiro(){
    meglevoV = ((urhajoV/28)*100);
    document.getElementById("meglevo").innerText = urhajoV;
    document.getElementById("meglevo").style.width = meglevoV + "%";
};

function plusz(){
    if (urhajoV%4==0 && urhajoV!=0 && modeV==1 && bealloV!=urhajoV){
        lephetoV=lephetoV+5
        document.getElementById("pluszlepesek").innerText = `+5 lépés`
        document.getElementById("pluszlepesek").style.display = "flex"
        bealloV = urhajoV;
        document.getElementById("hatralevolepesek").innerText = "Hátralévő lépések: " + lephetoV;
    }else{
        document.getElementById("pluszlepesek").style.display = "none"
    }
}

function mode(){
    if (modeV==0){
        modeV=1;
        document.getElementById("jatekmode").innerText = "Normál mód"
        document.getElementById("hatralevolepesek").style.display="flex"
        document.getElementById("hatralevolepesek").innerText = "Hátralévő lépések: " + lephetoV;
        uj();
    }else{
        modeV=0;
        document.getElementById("jatekmode").innerText = "Time Attack mód"
        document.getElementById("hatralevolepesek").style.display="none"
        uj();
    }
};

(function () {
  function applyGombokWidth() {
    var gombok = document.getElementById('gombok');
    if (!gombok) return;
    var w = gombok.getBoundingClientRect().width;
    var els = document.querySelectorAll('.match-gombok-width');
    els.forEach(function (el) {
      el.style.maxWidth = w + 'px';
    });
  }

  window.addEventListener('load', applyGombokWidth);
  window.addEventListener('resize', applyGombokWidth);

  var target = document.getElementById('gombok');
  if (target && window.MutationObserver) {
    var mo = new MutationObserver(function () {
      setTimeout(applyGombokWidth, 30);
    });
    mo.observe(target, {childList: true, subtree: true, attributes: true});
  }
})();
