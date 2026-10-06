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

// Funçoes
function adicionarTarefa() {
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

    inputTarefa.value = "";
    inputTarefa.focus();

}

function salvarTarefa() {
    localStorage.setItem(
        "tarefas",
        JSON.stringify(tarefas)
    );
}