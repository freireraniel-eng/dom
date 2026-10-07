// ===============
// Elementos DOM
// ===============
const form = document.querySelector("#form-tarefa");
const inputTarefa = document.querySelector("#tarefa");
const contador = document.querySelector("#contador");
const listaTarefas = document.querySelector("#lista-tarefas");

// Resgate das tarefas do localStorage
let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

// Ouvir o evento clique
form.addEventListener("submit", adicionarTarefa);

// Funcoes
function adicionarTarefa(event) {
    event.preventDefault();
    let texto = inputTarefa.value.trim();

    if (texto === "") {
        alert("Digite uma tarefa!");
        return;
    }

    const novaTarefa = {
        id: Date.now(),
        texto: texto,
        concluido: false
    };

    console.log(novaTarefa);

    tarefas.push(novaTarefa);
    salvarTarefa();
    renderizarTarefas();

    inputTarefa.value = "";
    inputTarefa.focus();

}

function salvarTarefa() {
    localStorage.setItem(
        "tarefas",
        JSON.stringify(tarefas)
    );
}

function renderizarTarefas() {
    listaTarefas.innerHTML = "";

    tarefas.forEach(function (tarefa, indice) {
        const linha = document.createElement("tr");

        const colunaNumero = document.createElement("td");
        colunaNumero.textContent = indice + 1;

        const colunaTexto = document.createElement("td");
        colunaTexto.textContent = tarefa.texto;

        if (tarefa.concluido)  {
            colunaTexto.classList.add(
                "text-decoration-line-through",
                "text-muted"
            );
        }
        const colunaStatus = document.createElement("td");
        if (tarefa.concluido) {
            colunaStatus.innerHTML = '<span class="badge text-bg-success">Concluída</span>';
        } else {
            colunaStatus.innerHTML = 
            '<span class="badge text-bg-warning">Pendentes</span';
        }

        const colunaAcoes = document.createElement("td");
        colunaAcoes.classList.add(
            "text-center"
        );
        const botaoConcluir = document.createElement("button");
        botaoConcluir.textContent = tarefa.concluida ? "Reabrir" : "Concluir";
        botaoConcluir.classList.add(
            "btn",
            tarefa.concluido ? "btn-warning" : "btn-success",
            "btn-sm",
            "me-2"
        );
        botaoConcluir.addEventListener(
            "click",
            function() {
                alterarStatus(tarefa.id);
            }
        );

        const botaoEditar = document.createElement("button");
        botaoEditar.textContent = "Editar";
        botaoEditar.classList.add(
            "btn",
            "btn-primary",
            "btn-sm",
            "me-2"
        );
        botaoEditar.addEventListener(
            "click",
            function() {
                editarTarefa(tarefa.id);
            }
        );
        const botaoExcluir = document.createElement("button");

        colunaAcoes.appendChild(botaoConcluir);
        colunaAcoes.appendChild(botaoEditar);
        
        
        linha.appendChild(colunaNumero);
        linha.appendChild(colunaTexto);
        linha.appendChild(colunaStatus);
        linha.appendChild(colunaAcoes);
        
        
        listaTarefas.appendChild(linha);

    });
}

function alterarStatus(id) {
    tarefas.forEach(function (tarefa) {
        if (tarefa.id === id) {
            tarefa.concluido =-!tarefa.concluido;
        }
    });
    salvarTarefa()
    renderizarTarefas()
}

function editarTarefa(id) {
    const tarefa = tarefas.find(function (tarefa) {
        return tarefa.id === id;
    });
    if(!tarefa) {
        return;
    }
    const novoTexto = prompt("Digite um novo texto:", tarefa.texto);
    const texto = novoTexto.trim();

    if (novoTexto === null || novoTexto === "") {
        alert("A tarefa não pode ficar vazia.")
        return;
    }

    texto = novoTexto.trim();
    if (texto === "") {
        alert("A terefa não pode ficar vazia.");
    }
    tarefa.texto = texto;
    salvarTarefa();
    renderizarTarefas()
}

renderizarTarefas()