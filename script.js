const API_URL = "https://script.google.com/macros/s/AKfycbyCIK7_dAQPky3S_953ROBhZAkNrtrcI5gZowV5F-aqbhv2qD0CyYKX3OjUjFFbIVc/exec";
const container = document.getElementById("players");
const msg = document.getElementById("msg");

function addPlayer(nome = "", valor = "") {
    const div = document.createElement("div");
    div.className = "player";
    div.innerHTML = `
        <input placeholder="Nome" value="${nome}">
        <input placeholder="Valor" type="number" value="${valor}">
      `;
    container.appendChild(div);
}

function formatDate() {
    const today = new Date();
    const dia = String(today.getDate()).padStart(2, "0");
    const mes = String(today.getMonth() + 1).padStart(2, "0");
    const ano = today.getFullYear();
    return `${dia}/${mes}/${ano}`;
}

async function sendData() {
    const rows = container.querySelectorAll(".player");
    const data = Array.from(rows).map(r => ({
        data: formatDate(),
        nome: r.children[0].value,
        valor: Number(r.children[1].value)
    })).filter(p => p.nome && !isNaN(p.valor));

    if (!data.length) {
        msg.textContent = "⚠️ Preencha pelo menos um jogador.";
        return;
    }

    msg.textContent = "⏳ Enviando...";
    try {
        await fetch(API_URL, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        msg.textContent = "✅ Resultados enviados com sucesso!";
        container.innerHTML = "";
        addPlayer();
        addPlayer();
    } catch (err) {
        msg.textContent = "❌ Erro ao enviar: " + err.message;
      }
}

    //começar o html com 2 campos de jogadores
    addPlayer();
    addPlayer();