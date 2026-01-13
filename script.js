const words = [
    // MENDATAR (H)
    { id: "h1", displayNo: 1, word: "BAMBANG", row: 2, col: 1, dir: "h", type: "mendatar", q: "Selain atlet sepak bola, dia juga berprofesi sebagai hair stylist. Siapakah dia?", img: [] },
    { id: "h2", displayNo: 2, word: "BERUDU", row: 3, col: 5, dir: "h", type: "mendatar", q: "Sebelum menjadi katak, anak katak disebut...", img: ["soal8.png"] },
    { id: "h3", displayNo: 3, word: "HABIS", row: 5, col: 0, dir: "h", type: "mendatar", q: "Sedikit demi sedikit, lama lama menjadi ....", img: [] },
    { id: "h4", displayNo: 4, word: "REMAJA", row: 6, col: 3, dir: "h", type: "mendatar", q: "Lanjut potongan umpasa berikut : 'Padi si menua tempat berteduh ...'", img: [] },
    { id: "h5", displayNo: 5, word: "HAHAHA", row: 8, col: 1, dir: "h", type: "mendatar", q: "Salah satu sikap saat orang bahagia", img: [] },
    { id: "h6", displayNo: 6, word: "PARBABA", row: 12, col: 3, dir: "h", type: "mendatar", q: "Nama desa di Pangururan", img: ["soal10-1.png", "soal10-2.png"] },

    // MENURUN (V)
    { id: "v7", displayNo: 7, word: "JONES", row: 0, col: 6, dir: "v", type: "menurun", q: "Siapa orang di samping ini?", img: ["soal1.png"], resultImg: "jawab1.png" },
    { id: "v8", displayNo: 1, word: "BODAT", row: 2, col: 1, dir: "v", type: "menurun", q: "Hewan apakah ini?", img: ["soal5.png", "soal5-2.png"] },
    { id: "v9", displayNo: 8, word: "MULUT", row: 2, col: 10, dir: "v", type: "menurun", q: "Seenak-enaknya makan di luar, lebih enak makan di ....", img: [] },
    { id: "v10", displayNo: 9, word: "SEMAUNYA", row: 5, col: 4, dir: "v", type: "menurun", q: "Burung terbang dengan ...", img: ["soal7.png"] }
];

function createGrid() {
    const grid = document.getElementById('ttsGrid');
    grid.innerHTML = '';
    grid.style.gridTemplateColumns = "repeat(11, 45px)";
    grid.style.gridTemplateRows = "repeat(13, 45px)";

    for (let r = 0; r < 13; r++) {
        for (let c = 0; c < 11; c++) {
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
                // Simpan data huruf (bisa tumpang tindih, tidak masalah)
                targetCell.setAttribute(`data-${w.dir}`, w.word[i]);

                if (i === 0) {
                    if (!targetCell.querySelector('.cell-number')) {
                        const numSpan = document.createElement('span');
                        numSpan.className = 'cell-number';
                        numSpan.innerText = w.displayNo;
                        targetCell.appendChild(numSpan);
                    }
                    
                    // Logika tombol: Jika sudah ada tombol, kita jadikan dia menu pilihan
                    let btn = targetCell.querySelector('.btn-display');
                    if (!btn) {
                        btn = document.createElement('button');
                        btn.className = 'btn-display';
                        targetCell.appendChild(btn);
                        btn.ids = [w.id]; // Simpan ID dalam array
                    } else {
                        btn.ids.push(w.id); // Tambah ID kedua (persimpangan)
                    }

                    btn.onclick = (e) => {
                        e.stopPropagation();
                        if (btn.ids.length > 1) {
                            showChoiceMenu(btn.ids, targetCell);
                        } else {
                            showAnswer(btn.ids[0]);
                        }
                    };
                }
            }
        }
        
        // Tombol Soal di Sidebar
        const containerId = w.type === 'mendatar' ? 'containerMendatar' : 'containerMenurun';
        const qBtn = document.createElement('button');
        qBtn.innerText = w.displayNo;
        qBtn.onclick = () => openModal(w);
        document.getElementById(containerId).appendChild(qBtn);
    });
}

// Menu Pilihan jika 1 kotak punya 2 jawaban (Mendatar/Menurun)
function showChoiceMenu(ids, cell) {
    // Hapus menu lama jika ada
    const oldMenu = document.querySelector('.choice-menu');
    if (oldMenu) oldMenu.remove();

    const menu = document.createElement('div');
    menu.className = 'choice-menu';
    
    ids.forEach(id => {
        const wData = words.find(x => x.id === id);
        const opt = document.createElement('div');
        opt.innerText = wData.type.toUpperCase();
        opt.onclick = () => {
            showAnswer(id);
            menu.remove();
        };
        menu.appendChild(opt);
    });

    cell.appendChild(menu);
}

function showAnswer(id) {
    const wData = words.find(x => x.id === id);
    document.getElementById('soundCorrect').play();

    for (let i = 0; i < wData.word.length; i++) {
        let r = wData.dir === 'v' ? wData.row + i : wData.row;
        let c = wData.dir === 'h' ? wData.col + i : wData.col;
        const cell = document.getElementById(`cell-${r}-${c}`);
        
        const letter = wData.word[i];
        // Cari span huruf untuk arah ini, atau buat baru
        let letterSpan = cell.querySelector(`.letter-${wData.dir}`);
        if (!letterSpan) {
            letterSpan = document.createElement('span');
            letterSpan.className = `letter-text pop-in letter-${wData.dir}`;
            cell.appendChild(letterSpan);
        }
        letterSpan.innerText = letter;
    }
}

function openModal(w) {
    const body = document.getElementById('modalBody');
    const footer = document.getElementById('modalFooter');
    footer.innerHTML = '';
    
    let imgsHtml = `<div class="modal-image-container">`;
    w.img.forEach(src => {
        imgsHtml += `<img src="${src}" class="modal-img-large">`;
    });
    imgsHtml += `</div>`;

    body.innerHTML = `
        <div class="modal-label">${w.type.toUpperCase()} - NOMOR ${w.displayNo}</div>
        <div class="modal-question-text">${w.q}</div>
        ${imgsHtml}
    `;

    if (w.resultImg) {
        const resBtn = document.createElement('button');
        resBtn.className = 'btn-result';
        resBtn.innerText = "LIHAT JAWABAN GAMBAR";
        resBtn.onclick = () => {
            body.innerHTML += `<div class="pop-in"><img src="${w.resultImg}" class="modal-img-large" style="border:5px solid gold;"></div>`;
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
