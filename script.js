// Globális változók
let matrix = [];
let gombok = [];

// A gombnyomás függvény
function gombnyomas(sor, oszlop) {
    console.log(`Gombnyomás: Sor = ${sor}, Oszlop = ${oszlop}`);
    // Itt lehet további logikát implementálni
}

// Gombok frissítése a mátrix alapján
function frissitGombok() {
    for (let sor = 0; sor < 12; sor++) {
        for (let oszlop = 0; oszlop < 12; oszlop++) {
            if (gombok[sor] && gombok[sor][oszlop]) {
                gombok[sor][oszlop].textContent = matrix[sor][oszlop];
            }
        }
    }
    console.log('Gombok frissítve a mátrix alapján');
}

// Mátrix inicializálása
function inicializalMatrix() {
    for (let sor = 0; sor < 12; sor++) {
        matrix[sor] = [];
        for (let oszlop = 0; oszlop < 12; oszlop++) {
            const sorFormazott = sor.toString().padStart(2, '0');
            const oszlopFormazott = oszlop.toString().padStart(2, '0');
            matrix[sor][oszlop] = `[${sorFormazott}][${oszlopFormazott}]`;
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const buttonGrid = document.getElementById('gombok');
    const totalButtons = 144;
    const columns = 12;
    
    // Mátrix inicializálása
    inicializalMatrix();
    
    // Gombok tömb inicializálása
    for (let i = 0; i < 12; i++) {
        gombok[i] = [];
    }
    
    // Gombok generálása
    for (let i = 0; i < totalButtons; i++) {
        // Sor és oszlop számítás (0-tól indul)
        const sor = Math.floor(i / columns);
        const oszlop = i % columns;
        
        // Gomb létrehozása
        const button = document.createElement('button');
        button.textContent = matrix[sor][oszlop];
        
        // Gomb elmentése a tömbben
        gombok[sor][oszlop] = button;
        
        // ID-k beállítása
        button.setAttribute('data-serial-id', `button-${i}`);
        button.setAttribute('data-state-id', `state-0`);
        button.setAttribute('data-sor', sor);
        button.setAttribute('data-oszlop', oszlop);
        
        // Sortörés minden 12. gomb után
        if (i > 0 && i % columns === 0) {
            buttonGrid.appendChild(document.createElement('br'));
        }
        
        // Kattintás esemény - meghívja a gombnyomas függvényt
        button.addEventListener('click', function() {
            const currentSor = parseInt(this.getAttribute('data-sor'));
            const currentOszlop = parseInt(this.getAttribute('data-oszlop'));
            
            // Meghívjuk a gombnyomas függvényt a sor és oszlop paraméterekkel
            gombnyomas(currentSor, currentOszlop);
            
            // Állapot váltás (opcionális)
            const currentState = parseInt(this.getAttribute('data-state-id').split('-')[1]);
            const newState = (currentState + 1) % 3;
            this.setAttribute('data-state-id', `state-${newState}`);
        });
        
        // Gomb hozzáadása
        buttonGrid.appendChild(button);
    }
    
    console.log(`${totalButtons} gomb generálva sikeresen!`);
    
    // Példa: frissítés 5 másodperc után
    setTimeout(function() {
        // Mátrix módosítása példaként
        for (let sor = 0; sor < 12; sor++) {
            for (let oszlop = 0; oszlop < 12; oszlop++) {
                matrix[sor][oszlop] = `[${sor}][${oszlop}]`;
            }
        }
        frissitGombok();
    }, 5000);
});
