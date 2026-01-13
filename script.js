// Konfigurasi Grid (berdasarkan koordinat gambar Anda)
const words = [
    { id: 1, word: "JONES", row: 0, col: 7, dir: "v", q: "Siapa orang di samping ini?", img: ["soal1.png"], resultImg: "jawab1.png" },
    { id: 2, word: "BAMBANG", row: 2, col: 1, dir: "h", q: "Selain atlet sepak bola, dia juga berprofesi sebagai hair stylist. Siapakah dia?", img: [] },
    { id: 3, word: "BERUDU", row: 3, col: 6, dir: "h", q: "Lanjut potongan umpasa berikut : 'Padi si menua tempat berteduh ...", img: [] },
    { id: 4, word: "MULUT", row: 2, col: 12, dir: "v", q: "Seenak-enaknya makan di luar, lebih enak makan di ....", img: [] },
    { id: 5, word: "BODAT", row: 2, col: 1, dir: "v", q: "Hewan apakah ini?", img: ["soal5.png"] },
    { id: 6, word: "HABIS", row: 5, col: 0, dir: "h", q: "Sedikit demi sedikit, lama lama menjadi ....", img: [] },
    { id: 7, word: "SEMAUNYA", row: 5, col: 5, dir: "v", q: "Burung terbang dengan ...", img: ["soal7.png"] },
    { id: 8, word: "REMAJA", row: 7, col: 4, dir: "h", q: "Sebelum menjadi katak, anak katak disebut...'", img: ["soal8.png"] },
    { id: 9, word: "HAHAHA", row: 10, col: 2, dir: "h", q: "Salah satu sikap saat orang bahagia", img: [] },
    { id: 10, word: "PARBABA", row: 13, col: 4, dir: "h", q: "Nama desa di Pangururan", img: ["soal10-1.png", "soal10-2.png"] }
];

function createGrid() {
    const grid = document.getElementById('ttsGrid');
    // Membuat grid 15x13 untuk mengakomodasi posisi terjauh (Parbaba di row 13)
    grid.style.gridTemplateRows = "repeat(15, 45px)"; 

    for (let r = 0; r < 15; r++) {
        for (let c = 0; c < 12; c++) {
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
                    targetCell.innerHTML += `<span class="cell-number">${w.id}</span>`;
                    const btn = document.createElement('button');
                    btn.className = 'btn-display';
                    btn.onclick = () => showAnswer(w.id);
                    targetCell.appendChild(btn);
                }
            }
        }
        // Buat Tombol Soal
        const qBtn = document.createElement('button');
        qBtn.innerText = `Soal ${w.id}`;
        qBtn.onclick = () => openModal(w);
        document.getElementById('buttonContainer').appendChild(qBtn);
    });
}

function showAnswer(id) {
    const wData = words.find(x => x.id === id);
    document.getElementById('soundCorrect').play();
    for (let i = 0; i < wData.word.length; i++) {
        let r = wData.dir === 'v' ? wData.row + i : wData.row;
        let c = wData.dir === 'h' ? wData.col + i : wData.col;
        const cell = document.getElementById(`cell-${r}-${c}`);
        const letter = cell.getAttribute('data-letter');
        const num = cell.querySelector('.cell-number')?.innerText || '';
        cell.innerHTML = `<span class="cell-number">${num}</span><span class="pop-in">${letter}</span>`;
    }
}

function openModal(w) {
    const body = document.getElementById('modalBody');
    const footer = document.getElementById('modalFooter');
    footer.innerHTML = '';
    
    let imgsHtml = w.img.map(src => `<img src="${src}" style="width:100%; max-width:200px; margin:5px;">`).join('');
    body.innerHTML = `<h2>Soal ${w.id}</h2><p>${w.q}</p>${imgsHtml}`;

    if (w.id === 1 && w.resultImg) {
        const resBtn = document.createElement('button');
        resBtn.className = 'btn-result';
        resBtn.innerText = "Show Result Image";
        resBtn.onclick = () => {
            body.innerHTML += `<br><img src="${w.resultImg}" class="pop-in" style="width:100%; max-width:200px; margin-top:10px; border:2px solid gold;">`;
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
