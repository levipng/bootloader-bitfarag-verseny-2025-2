const gombokDiv = document.getElementById('gombok');
let urhajoV = 0;
let meglevoV = 0;
let megnyomottgombok = 0;
let matrix;

start();

function start(){
    initMatrix();
    generalas();
    test();
    gombbetoltes();
}

function initMatrix(){
    matrix = Array(12);
    for (let i = 0; i < 12; i++) {
        matrix[i] = Array(12);
        for (let j = 0; j < 12; j++) {
            matrix[i][j] = i * 12 + j;
        }
    }
}

function generalas(){
    let gen = 0;
    let gena = 0;
    let genb = 0;
    while(gen < 29){
        matrix[Math.floor(Math.random() * 12)][Math.floor(Math.random() * 12)] = 0;
        ++gen;
    }
}

function test(){
    matrix[2][1] = '<img src="0.jpg">';
    matrix[2][3] = '<p>cig</p>';
    matrix[4][4] = '0';
};

function gombbetoltes(){
    for (let i = 0; i < 12; i++) {
        for (let j = 0; j < 12; j++) {
            const gomb = document.createElement('button');
            
            const contentDiv = document.createElement('div');
            contentDiv.className = 'content';
            contentDiv.innerHTML = matrix[i][j];
            
            gomb.appendChild(contentDiv);
            
            if (matrix[i][j]==0){
                gomb.addEventListener('click', function handler(event) {
                    this.classList.add('raketa');
                    this.disabled = true;
                    urhajokiiro();
                    gombnyomas();
                }, { once: true });
            } else {
                gomb.addEventListener('click', function handler(event) {
                    this.classList.add('revealed');
                    this.disabled = true;
                    gombnyomas();
                }, { once: true });
            }
        
            gombokDiv.appendChild(gomb);
        }
    }
};

function gombnyomas(){
    ++megnyomottgombok;
    document.getElementById("lepesek").innerText = "Megtett lépések: " + megnyomottgombok;
};

function urhajokiiro(){
    ++urhajoV
    meglevoV = ((urhajoV/28)*100);
    document.getElementById("meglevo").innerText = urhajoV;
    document.getElementById("meglevo").style.width = meglevoV + "%";
};