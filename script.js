const escolas = [
    {
        nome: "Colégio Santa Ana & Noesa",
        bairro: "Vila Alice",
        nivel: "Ensino Médio",
        vagas: [
            { nome: "Técnico de Saúde", qtd: 12 },
            { nome: "Técnico de Informática 11ª", qtd: 7 },
            { nome: "Técnico de Informática 12ª", qtd: 5 },
            { nome: "Técnico de Informática 13ª", qtd: 2 },
            { nome: "Contabilidade e Gestão", qtd: 5 }
        ]
    },
    {
        nome: "Kibangas",
        bairro: "Vila Alice",
        nivel: "Ensino Médio",
        vagas: [
            { nome: "Informática", qtd: 8 },
            { nome: "Gestão Empresarial", qtd: 15 },
            { nome: "Contabilidade", qtd: 10 }
        ]
    },
    {
        nome: "Santa Catarina",
        bairro: "São Paulo",
        nivel: "Ensino Médio",
        vagas: [
            { nome: "Informática", qtd: 0 },
            { nome: "Gestão Empresarial", qtd: 4 }
        ]
    },
    {
        nome: "São Benedito",
        bairro: "Rangel",
        nivel: "Ensino Médio",
        vagas: [
            { nome: "Informática", qtd: 20 },
            { nome: "Contabilidade", qtd: 12 }
        ]
    },
    {
        nome: "São Domingos",
        bairro: "Rangel",
        nivel: "Secundário",
        vagas: [
            { nome: "7ª Classe", qtd: 30 },
            { nome: "8ª Classe", qtd: 30 },
            { nome: "9ª Classe", qtd: 15 },
            { nome: "Direito (10ª–12ª)", qtd: 10 },
            { nome: "Ciências Físicas", qtd: 8 }
        ]
    },
    {
        nome: "Nossa Senhora da Luz",
        bairro: "Rangel",
        nivel: "Primário",
        vagas: [
            { nome: "1ª Classe", qtd: 40 },
            { nome: "2ª Classe", qtd: 23 },
            { nome: "3ª Classe", qtd: 12 },
            { nome: "4ª Classe", qtd: 10 },
            { nome: "5ª Classe", qtd: 2 },
            { nome: "6ª Classe", qtd: 12 }
        ]
    },
    {
        nome: "Cantinho do Lazer",
        bairro: "Vila Alice",
        nivel: "Creche",
        vagas: [
            { nome: "Berçário", qtd: 5 },
            { nome: "Maternal", qtd: 3 }
        ]
    }
];

const lista = document.getElementById("lista-escolas");
const modal = document.getElementById("modal");
const modalConfirmacao = document.getElementById("modalConfirmacao");
const msgConfirmacao = document.getElementById("msgConfirmacao");

function render(bairro = "") {
    lista.innerHTML = "";
    escolas
        .filter(e => !bairro || e.bairro === bairro)
        .forEach((e, i) => {
            const total = e.vagas.reduce((s, v) => s + v.qtd, 0);
            lista.innerHTML += `
                <div class="card">
                    <h3>${e.nome}</h3>
                    <p>${e.bairro} • ${e.nivel}</p>
                    <p><strong>${total} vagas disponíveis</strong></p>
                    <button onclick="abrir(${i})">Ver detalhes</button>
                </div>
            `;
        });
}

function abrir(i) {
    const e = escolas[i];
    document.getElementById("modalTitulo").innerText = e.nome;
    document.getElementById("modalSubtitulo").innerText = `${e.bairro} • ${e.nivel}`;

    const vagasDiv = document.getElementById("listaVagas");
    const select = document.getElementById("cursoSelect");
    vagasDiv.innerHTML = "";
    select.innerHTML = "<option value=''>Selecione</option>";

    e.vagas.forEach(v => {
        vagasDiv.innerHTML += `
            <div class="vaga">
                <span>${v.nome}</span>
                <span class="qtd">${v.qtd}</span>
            </div>
        `;
        if (v.qtd > 0) {
            select.innerHTML += `<option>${v.nome}</option>`;
        }
    });

    modal.style.display = "block";
}

document.querySelector(".fechar").onclick = () => modal.style.display = "none";
document.getElementById("btnFiltrar").onclick = () =>
    render(document.getElementById("bairro").value);

document.getElementById("formulario").onsubmit = e => {
    e.preventDefault();

    const nome = document.getElementById("nomeAluno").value;
    const curso = document.getElementById("cursoSelect").value;

    msgConfirmacao.innerHTML = `
        <strong>Aluno:</strong> ${nome}<br>
        <strong>Curso / Classe:</strong> ${curso}<br><br>
        A sua pré-matrícula foi registada com sucesso.<br>
        Compareça à escola em até <strong>72 horas, para validar presencialmente a sua matrícula</strong>.
    `;

    modal.style.display = "none";
    modalConfirmacao.style.display = "block";
    e.target.reset();
};

document.getElementById("btnOk").onclick = () =>
    modalConfirmacao.style.display = "none";

window.onclick = e => {
    if (e.target === modal || e.target === modalConfirmacao) {
        modal.style.display = "none";
        modalConfirmacao.style.display = "none";
    }
};

render();
