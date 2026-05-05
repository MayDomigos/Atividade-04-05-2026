async function buscarIP() {
    const ip = document.getElementById('ipInput').value;
    const tabela = document.getElementById('resultadoTabela');
    const corpo = document.getElementById('tabelaCorpo');
    
    // Usando uma API que NÃO precisa de token para testar agora
    const url = `https://ipapi.co/${ip}/json/`;

    try {
        const resposta = await fetch(url);
        if (!resposta.ok) throw new Error('IP não encontrado ou limite excedido');
        
        const dados = await resposta.json();

        corpo.innerHTML = '';

        const campos = {
            "IP": dados.ip,
            "Cidade": dados.city,
            "Região": dados.region,
            "País": dados.country_name,
            "Organização": dados.org
        };

        for (const [campo, valor] of Object.entries(campos)) {
            const linha = `<tr><td><strong>${campo}</strong></td><td>${valor || 'N/A'}</td></tr>`;
            corpo.innerHTML += linha;
        }

        tabela.style.display = 'table';

    } catch (erro) {
        alert("Erro: " + erro.message);
    }
}