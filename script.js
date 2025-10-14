const gombokDiv = document.getElementById('gombok');
let urhajoV = 0;
let meglevoV = 0;
let megnyomottgombokV = 0;
let hatralevoV = 0;
let modeV = 0;
let lephetoV = 20;
let matrix;

uj();

function start(){
    MatrixGen();
    generalas();
    gombbetoltes();
};

function uj(){
    urhajoV = 0;
    meglevoV = 0;
    megnyomottgombokV = 0;
    hatralevoV = 0;
    lephetoV = 20;
    gombnyomas();
    urhajokiiro();
    MatrixGen();
    generalas();
    gombbetoltes();
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
                    ++urhajoV
                    urhajokiiro();
                    ++megnyomottgombok;
                    gombnyomas();
                }, { once: true });
            } else {
                gomb.addEventListener('click', function handler(event) {
                    this.classList.add('revealed', 'number');
                    this.disabled = true;
                    ++megnyomottgombokV;
                    gombnyomas();
                }, { once: true });
            }
        
            gombokDiv.appendChild(gomb);
        }
    }
};

function gombnyomas(){
    document.getElementById("lepesek").innerText = "Megtett lépések: " + megnyomottgombokV;
};

function urhajokiiro(){
    meglevoV = ((urhajoV/28)*100);
    document.getElementById("meglevo").innerText = urhajoV;
    document.getElementById("meglevo").style.width = meglevoV + "%";
    if (megnyomottgombokV%4==0 || modeV==1){
        lephetoV=lephetoV+5
        document.getElementById("pluszlepesek").style.display = "flex"
        document.getElementById("pluszlepesek").innerText = lephetoV
    }else{
        document.getElementById("pluszlepesek").style.display = "none"
    }
};

function mode(){
    if (modeV==0){
        modeV=1;
        document.getElementById("jatekmode").innerText = "Normál mód"

        uj();
    }else{
        modeV=0;
        document.getElementById("jatekmode").innerText = "Time Attack mód"

        uj();
    }
};