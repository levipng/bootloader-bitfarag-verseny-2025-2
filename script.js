const gombokDiv = document.getElementById('gombok');
let urhajoV = 0;
let meglevoV = 0;
let megnyomottgombok = 0;
let matrix;

start();

function start(){
    initMatrix();
    generalas();
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
                    urhajokiiro();
                    gombnyomas();
                }, { once: true });
            } else {
                gomb.addEventListener('click', function handler(event) {
                    this.classList.add('revealed', 'number');
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