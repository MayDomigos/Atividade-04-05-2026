let ips = []; // Array para armazenar os endereços
let editandoIndex = null;

const ipForm = document.getElementById('ipForm');
const ipTableBody = document.getElementById('ipTableBody');
const ipInput = document.getElementById('ipInput');
const descricaoInput = document.getElementById('descricaoInput');
const btnSalvar = document.getElementById('btnSalvar');

// Função para renderizar a tabela
function renderizarTabela() {
    ipTableBody.innerHTML = '';
    
    ips.forEach((item, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.ip}</td>
            <td>${item.descricao}</td>
            <td>
                <span class="btn-editar" onclick="prepararEdicao(${index})">Editar</span>
                <span class="btn-excluir" onclick="excluirIP(${index})">Excluir</span>
            </td>
        `;
        ipTableBody.appendChild(tr);
    });
}

// Adicionar ou Atualizar IP
ipForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const novoIP = {
        ip: ipInput.value,
        descricao: descricaoInput.value
    };

    if (editandoIndex !== null) {
        ips[editandoIndex] = novoIP;
        editandoIndex = null;
        btnSalvar.innerText = 'Adicionar';
    } else {
        ips.push(novoIP);
    }

    ipForm.reset();
    renderizarTabela();
});

// Excluir IP
function excluirIP(index) {
    if (confirm("Deseja realmente excluir este endereço?")) {
        ips.splice(index, 1);
        renderizarTabela();
    }
}

// Preparar para Editar
function prepararEdicao(index) {
    const item = ips[index];
    ipInput.value = item.ip;
    descricaoInput.value = item.descricao;
    editandoIndex = index;
    btnSalvar.innerText = 'Atualizar';
}