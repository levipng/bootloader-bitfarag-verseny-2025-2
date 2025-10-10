document.addEventListener('DOMContentLoaded', function() {
    const gombokContainer = document.getElementById('gombok');
    const gombokSzama = 144;
    
    for (let i = 0; i < gombokSzama; i++) {
        // Gomb létrehozása
        const gomb = document.createElement('button');
        gomb.textContent = i;
        gomb.id = `gomb-${i}`;
        
        // Kattintás esemény
        gomb.addEventListener('click', function() {
            console.log(`Megnyomtad a ${i} számú gombot`);
        });
        
        // Gomb hozzáadása a containerhez
        gombokContainer.appendChild(gomb);
    }
    
    console.log(`${gombokSzama} gomb generálva sikeresen!`);
});
