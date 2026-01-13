// Konfigurasi Grid (berdasarkan koordinat gambar Anda)
/*const words = [
    { id: 1, word: "JONES", row: 0, col: 6, dir: "v", type: "menurun", q: "Siapa orang di samping ini?", img: ["soal1.png"], resultImg: "jawab1.png" },
    { id: 2, word: "BAMBANG", row: 2, col: 1, dir: "h", type: "mendatar", q: "Selain atlet sepak bola, dia juga berprofesi sebagai hair stylist. Siapakah dia?", img: [] },
    { id: 3, word: "BERUDU", row: 3, col: 5, dir: "h", type: "mendatar", q: "Lanjut potongan umpasa berikut : 'Padi si menua tempat berteduh ...", img: [] },
    { id: 4, word: "MULUT", row: 2, col: 10, dir: "v", type: "menurun", q: "Seenak-enaknya makan di luar, lebih enak makan di ....", img: [] },
    { id: 5, word: "BODAT", row: 2, col: 1, dir: "v", type: "menurun", q: "Hewan apakah ini?", img: ["soal5.png"] },
    { id: 6, word: "HABIS", row: 5, col: 0, dir: "h", type: "mendatar", q: "Sedikit demi sedikit, lama lama menjadi ....", img: [] },
    { id: 7, word: "SEMAUNYA", row: 5, col: 4, dir: "v", type: "menurun", q: "Burung terbang dengan ...", img: ["soal7.png"] },
    { id: 8, word: "REMAJA", row: 6, col: 3, dir: "h", type: "mendatar", q: "Sebelum menjadi katak, anak katak disebut...'", img: ["soal8.png"] },
    { id: 9, word: "HAHAHA", row: 8, col: 1, dir: "h", type: "mendatar", q: "Salah satu sikap saat orang bahagia", img: [] },
    { id: 10, word: "PARBABA", row: 12, col: 3, dir: "h", type: "mendatar", q: "Nama desa di Pangururan", img: ["soal10-1.png", "soal10-2.png"] }
];
*/

// Data words tetap sesuai koordinat Anda
const words = [
    // MENDATAR (H)
    { id: 1, word: "BAMBANG", row: 2, col: 1, dir: "h", type: "mendatar", q: "Selain atlet sepak bola, dia juga berprofesi sebagai hair stylist. Siapakah dia?", img: [] },
    { id: 2, word: "BERUDU", row: 3, col: 5, dir: "h", type: "mendatar", q: "Sebelum menjadi katak, anak katak disebut...", img: ["soal8.png"] },
    { id: 3, word: "HABIS", row: 5, col: 0, dir: "h", type: "mendatar", q: "Sedikit demi sedikit, lama lama menjadi ....", img: [] },
    { id: 4, word: "REMAJA", row: 6, col: 3, dir: "h", type: "mendatar", q: "Lanjut potongan umpasa berikut : 'Padi si menua tempat berteduh ...'", img: [] },
    { id: 5, word: "HAHAHA", row: 8, col: 1, dir: "h", type: "mendatar", q: "Salah satu sikap saat orang bahagia", img: [] },
    { id: 6, word: "PARBABA", row: 12, col: 3, dir: "h", type: "mendatar", q: "Nama desa di Pangururan", img: ["soal10-1.png", "soal10-2.png"] },

    // MENURUN (V)
    { id: 7, word: "JONES", row: 0, col: 6, dir: "v", type: "menurun", q: "Siapa orang di samping ini?", img: ["soal1.png"], resultImg: "jawab1.png" },
    { id: 8, word: "BODAT", row: 2, col: 1, dir: "v", type: "menurun", q: "Hewan apakah ini?", img: ["soal5.png"] },
    { id: 9, word: "MULUT", row: 2, col: 10, dir: "v", type: "menurun", q: "Seenak-enaknya makan di luar, lebih enak makan di ....", img: [] },
    { id: 10, word: "SEMAUNYA", row: 5, col: 4, dir: "v", type: "menurun", q: "Burung terbang dengan ...", img: ["soal7.png"] }
];

function createGrid() {
    const grid = document.getElementById('ttsGrid');
    grid.innerHTML = ''; 

    // FIXED: Sesuaikan dengan dimensi 11 Kolom x 13 Baris (index 0-12)
    grid.style.gridTemplateColumns = "repeat(11, 45px)";
    grid.style.gridTemplateRows = "repeat(13, 45px)"; 

    for (let r = 0; r < 13; r++) { // Baris sampai 13
        for (let c = 0; c < 11; c++) { // Kolom sampai 11
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.id = `cell-${r}-${c}`;
            grid.appendChild(cell);
        }
    }

    words.forEach(w => {
        for (let i = 0; i < w.word.length; i++) {
            let row = w.dir === 'v' ? w.row + i : w.row;
            let col = w.dir === 'h' ? w.col + i : w.col;
            let targetCell = document.getElementById(`cell-${row}-${col}`);
            
            if(targetCell) {
                targetCell.classList.add('active');
                targetCell.setAttribute('data-letter', w.word[i]);
                
                if (i === 0) {
                    // Mencegah penumpukan nomor jika kotak adalah persimpangan
                    if (!targetCell.querySelector('.cell-number')) {
                        const numSpan = document.createElement('span');
                        numSpan.className = 'cell-number';
                        numSpan.innerText = w.id;
                        targetCell.appendChild(numSpan);
                    }
                    
                    const btn = document.createElement('button');
                    btn.className = 'btn-display';
                    btn.onclick = (e) => {
                        e.stopPropagation();
                        showAnswer(w.id);
                    };
                    targetCell.appendChild(btn);
                }
            }
        }
        
        // Logika pengisian tombol kategori (Mendatar/Menurun)
        const containerId = w.type === 'mendatar' ? 'containerMendatar' : 'containerMenurun';
        const targetContainer = document.getElementById(containerId);
        if(targetContainer) {
            const qBtn = document.createElement('button');
            qBtn.innerText = w.id;
            qBtn.onclick = () => openModal(w);
            targetContainer.appendChild(qBtn);
        }
    });
}

function showAnswer(id) {
    const wData = words.find(x => x.id === id);
    if (!wData) return;

    document.getElementById('soundCorrect').play();

    for (let i = 0; i < wData.word.length; i++) {
        let r = wData.dir === 'v' ? wData.row + i : wData.row;
        let c = wData.dir === 'h' ? wData.col + i : wData.col;
        const cell = document.getElementById(`cell-${r}-${c}`);
        
        if (cell) {
            const letter = cell.getAttribute('data-letter');
            const numSpan = cell.querySelector('.cell-number');
            const numText = numSpan ? numSpan.innerText : '';

            // Menampilkan huruf tanpa menghapus nomor soal
            cell.innerHTML = `
                ${numText ? `<span class="cell-number">${numText}</span>` : ''}
                <span class="pop-in">${letter}</span>
            `;
        }
    }
}

// Fungsi openModal, handleImageClick, dll tetap sama

// Fungsi openModal diperbesar untuk mendukung banyak gambar
function openModal(w) {
    const body = document.getElementById('modalBody');
    const footer = document.getElementById('modalFooter');
    footer.innerHTML = '';
    
    let imgsHtml = `<div style="display:flex; gap:20px; justify-content:center; flex-wrap:wrap; margin-top:20px;">`;
    w.img.forEach(src => {
        imgsHtml += `<img src="${src}" style="max-height:300px; border-radius:10px; border:3px solid var(--navy-deep);">`;
    });
    imgsHtml += `</div>`;

    body.innerHTML = `
        <div style="color:var(--blue-light); font-weight:bold;">${w.type.toUpperCase()}</div>
        <h2>SOAL NOMOR ${w.id}</h2>
        <p>${w.q}</p>
        ${imgsHtml}
    `;

    // Khusus Soal JONES (ID 7 setelah renumbering)
    if (w.word === "JONES" && w.resultImg) {
        const resBtn = document.createElement('button');
        resBtn.className = 'btn-result';
        resBtn.style.padding = "15px 30px";
        resBtn.style.fontSize = "1.2rem";
        resBtn.innerText = "LIHAT JAWABAN GAMBAR";
        resBtn.onclick = () => {
            body.innerHTML += `<div class="pop-in"><img src="${w.resultImg}" style="max-height:300px; margin-top:20px; border:5px solid gold; border-radius:10px;"></div>`;
            resBtn.remove();
        };
        footer.appendChild(resBtn);
    }

    document.getElementById('modal').style.display = 'block';
}

function handleImageClick() {
    const wrapper = document.getElementById('imageWrapper');
    const audio = document.getElementById('soundAyo');
    wrapper.classList.add('zoomed');
    audio.play();
    audio.onended = () => wrapper.classList.remove('zoomed');
}

function closeModal() { document.getElementById('modal').style.display = 'none'; }
function playWrongSound() { document.getElementById('soundWrong').play(); }

createGrid();
