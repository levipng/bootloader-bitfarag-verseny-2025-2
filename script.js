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
    for(let a = 0;a<27;++a){
        while(1){
            let b = Math.floor(Math.random() * 12)
            let c = Math.floor(Math.random() * 12)
            if (matrix[b][c]!=0){
                matrix[b][c] = 0;
                break;
            }
        }
    }
};

function szamolas(){
    // Multi-source BFS (4-neighbor) to compute distance to nearest 0
    const rows = matrix.length;
    const cols = matrix[0].length;

    // dist: -1 = unvisited
    const dist = Array.from({ length: rows }, () => Array(cols).fill(-1));
    const q = [];

    // enqueue all zeros
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (matrix[i][j] === 0) {
                dist[i][j] = 0;
                q.push([i, j]);
            }
        }
    }

    const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
    let head = 0;
    while (head < q.length) {
        const [r, c] = q[head++];
        for (const [dr, dc] of dirs) {
            const nr = r + dr;
            const nc = c + dc;
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && dist[nr][nc] === -1) {
                dist[nr][nc] = dist[r][c] + 1;
                q.push([nr, nc]);
            }
        }
    }

    // write back distances (preserve zeros)
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (dist[i][j] >= 0) matrix[i][j] = dist[i][j];
        }
    }
};

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
