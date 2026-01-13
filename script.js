// Konfigurasi Grid (berdasarkan koordinat gambar Anda)
const words = [
    { id: 1, word: "JONES", row: 0, col: 7, dir: "v", q: "Siapa orang di samping ini?", img: "soal1.png" },
    { id: 2, word: "BAMBANG", row: 2, col: 1, dir: "h", q: "Selain atlet sepak bola, dia juga berprofesi sebagai hair stylist. Siapakah dia?", img: "" },
    { id: 3, word: "BERUDU", row: 3, col: 6, dir: "h", q: "Lanjut potongan umpasa berikut : 'Padi si menua tempat berteduh ...", img: "" },
    { id: 4, word: "MULUT", row: 2, col: 12, dir: "v", q: "Seenak-enaknya makan di luar, lebih enak makan di ....", img: "" },
    { id: 5, word: "BODAT", row: 2, col: 1, dir: "v", q: "Hewan apakah ini?", img: "soal5.png" },
    { id: 6, word: "HABIS", row: 5, col: 0, dir: "h", q: "Sedikit demi sedikit, lama lama menjadi ....", img: "" },
    { id: 7, word: "SEMAUNYA", row: 5, col: 5, dir: "v", q: "Burung terbang dengan ...", img: "soal7.png" },
    { id: 8, word: "REMAJA", row: 7, col: 4, dir: "h", q: "Sebelum menjadi katak, anak katak disebut...'", img: "soal8.png" },
    { id: 9, word: "HAHAHA", row: 10, col: 2, dir: "h", q: "Salah satu sikap saat orang bahagia", img: "" },
    { id: 10, word: "PARBABA", row: 13, col: 4, dir: "h", q: "Nama desa di Pangururan", img: "soal10.png" }
];

const gridContainer = document.getElementById('ttsGrid');
const buttonContainer = document.getElementById('buttonContainer');

// 1. Inisialisasi Grid Kosong (14 baris x 13 kolom)
function createGrid() {
    for (let r = 0; r < 14; r++) {
        for (let c = 0; c < 13; c++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.id = `cell-${r}-${c}`;
            gridContainer.appendChild(cell);
        }
    }

    words.forEach(w => {
        for (let i = 0; i < w.word.length; i++) {
            let row = w.dir === 'v' ? w.row + i : w.row;
            let col = w.dir === 'h' ? w.col + i : w.col;
            let targetCell = document.getElementById(`cell-${row}-${col}`);
            targetCell.classList.add('active');
            targetCell.setAttribute('data-letter', w.word[i]);

            // Tambah nomor soal di awal kata
            if (i === 0) {
                const numSpan = document.createElement('span');
                numSpan.className = 'cell-number';
                numSpan.innerText = w.id;
                targetCell.appendChild(numSpan);

                // Tambah tombol display (hover)
                const btn = document.createElement('button');
                btn.className = 'btn-display';
                btn.innerText = 'SHOW';
                btn.onclick = () => showAnswer(w.id);
                targetCell.appendChild(btn);
            }
        }
        
        // Buat Tombol Soal
        const qBtn = document.createElement('button');
        qBtn.innerText = `Soal ${w.id}`;
        qBtn.onclick = () => openModal(w);
        buttonContainer.appendChild(qBtn);
    });
}

// 2. Fungsi Menampilkan Jawaban
function showAnswer(wordId) {
    const wordData = words.find(w => w.id === wordId);
    document.getElementById('soundCorrect').play();

    for (let i = 0; i < wordData.word.length; i++) {
        let row = wordData.dir === 'v' ? wordData.row + i : wordData.row;
        let col = wordData.dir === 'h' ? wordData.col + i : wordData.col;
        let targetCell = document.getElementById(`cell-${row}-${col}`);
        
        if (!targetCell.innerText || targetCell.innerText === 'SHOW') {
            const letter = targetCell.getAttribute('data-letter');
            // Mempertahankan nomor jika ada
            const num = targetCell.querySelector('.cell-number')?.innerText || '';
            targetCell.innerHTML = `<span class="cell-number">${num}</span><span class="pop-in">${letter}</span>`;
        }
    }
}

// 3. Fungsi Modal Soal
function openModal(w) {
    const modal = document.getElementById('modal');
    const body = document.getElementById('modalBody');
    let content = `<h4>Soal Nomor ${w.id}</h4><p>${w.q}</p>`;
    if (w.img) {
        content += `<img src="${w.img}" style="max-width:100%; margin-top:10px;">`;
    }
    body.innerHTML = content;
    modal.style.display = "block";
}

function closeModal() {
    document.getElementById('modal').style.display = "none";
}

function playWrongSound() {
    document.getElementById('soundWrong').play();
}

// Jalankan
createGrid();

// Tambahkan fungsi ini di bagian bawah script.js Anda

function handleImageClick() {
    const wrapper = document.getElementById('imageWrapper');
    const audio = document.getElementById('soundAyo');

    // 1. Tambahkan class zoom
    wrapper.classList.add('zoomed');

    // 2. Putar audio
    audio.currentTime = 0; // Mulai dari awal jika diklik lagi
    audio.play();

    // 3. Saat audio selesai, kembalikan ke kondisi awal
    audio.onended = function() {
        wrapper.classList.remove('zoomed');
    };
}

// Pastikan fungsi createGrid() tetap ada di atas atau bawah fungsi ini
