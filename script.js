const gombokDiv = document.getElementById('gombok');
let urhajoV = 0;
let meglevoV = 0;
let megnyomottgombok = 0;

start();
function start(){
    let matrix = Array(12);
    for (let i = 0; i < 12; i++) {
        matrix[i] = Array(12);
        for (let j = 0; j < 12; j++) {
            matrix[i][j] = i * 12 + j;
        }
    }
    test();
    gombbetoltes();
};

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
                gomb.onclick = function() {
                    this.classList.add('revealed');
                };
            } else {
                gomb.onclick = function() {
                    this.classList.add('revealed');
                    urhajokiiro();
                };
            }
        
            gombokDiv.appendChild(gomb);
        }
    }
};

function gombnyomas(){
    ++megnyomottgombok
};

function urhajokiiro(){
    ++urhajoV
    meglevoV = ((urhajoV/28)*100);
    document.getElementById("meglevo").innerText = urhajoV;
    document.getElementById("meglevo").style.width = meglevoV + "%";
};