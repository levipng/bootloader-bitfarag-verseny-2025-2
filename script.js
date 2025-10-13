let matrix = Array(12);
for (let i = 0; i < 12; i++) {
    matrix[i] = Array(12);
    for (let j = 0; j < 12; j++) {
        matrix[i][j] = i * 12 + j;
    }
}
matrix[2][1] = '<img src="0.jpg">';
matrix[2][3] = '<p>cig</p>';

const gombokDiv = document.getElementById('gombok');

for (let i = 0; i < 12; i++) {
    for (let j = 0; j < 12; j++) {
        const gomb = document.createElement('button');
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'content';
        contentDiv.innerHTML = matrix[i][j];
        
        gomb.appendChild(contentDiv);
        
        gomb.onclick = function() {
            this.classList.add('revealed');
        };
        
        gombokDiv.appendChild(gomb);
    }
}

let meglevoV = 70;
document.getElementById("progress").style.width = value + "%";
document.getElementById("progress").textContent = value + "%";