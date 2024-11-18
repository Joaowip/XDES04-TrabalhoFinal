let agendamentos = JSON.parse(localStorage.getItem("agendamentos")) || [];

// Salvar agendamentos no localStorage
function salvarAgendamentos() {
    localStorage.setItem("agendamentos", JSON.stringify(agendamentos));
}

// Adicionar novo agendamento
function adicionarAgendamento(agendamento) {
    agendamentos.push(agendamento);
    salvarAgendamentos();
}

// Atualizar tabela de agendamentos
function atualizarTabela() {
    const tabela = document.getElementById("agendamentos-tabela");
    if (!tabela) return;

    tabela.innerHTML = "";
    agendamentos.forEach((agendamento, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${agendamento.nome}</td>
            <td>${agendamento.data}</td>
            <td>${agendamento.hora}</td>
            <td>${agendamento.descricao}</td>
            <td>
                <div class="botoes">
                    <button class="edit-btn" onclick="editarAgendamento(${index})">Editar</button>
                    <button class="delete-btn" onclick="removerAgendamento(${index})">Excluir</button>
                </div>
            </td>
        `;
        tabela.appendChild(row);
    });
}

// Editar agendamento
function editarAgendamento(index) {
    const agendamento = agendamentos[index];
    localStorage.setItem("agendamentoEdicao", JSON.stringify(agendamento));
    window.location.href = "cadastrar_agendamento.html"; // Redireciona para a página de cadastro
}

// Remover agendamento
function removerAgendamento(index) {
    if (confirm("Deseja realmente excluir este agendamento?")) {
        agendamentos.splice(index, 1); // Remove o agendamento
        salvarAgendamentos(); // Atualiza o localStorage
        atualizarTabela(); // Atualiza a tabela
    }
}

// Filtrar agendamentos
function filtrarAgendamentos() {
    const filtroNome = document.getElementById("filter-nome").value.toLowerCase();
    const filtroData = document.getElementById("filter-data").value;

    const resultados = agendamentos.filter(agendamento => {
        const nomeMatch = filtroNome ? agendamento.nome.toLowerCase().includes(filtroNome) : true;
        const dataMatch = filtroData ? agendamento.data === filtroData : true;
        return nomeMatch && dataMatch;
    });

    atualizarTabelaComFiltro(resultados);
}

// Atualizar tabela com resultados filtrados
function atualizarTabelaComFiltro(resultados) {
    const tabela = document.getElementById("agendamentos-tabela");
    tabela.innerHTML = "";
    resultados.forEach((agendamento, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${agendamento.nome}</td>
            <td>${agendamento.data}</td>
            <td>${agendamento.hora}</td>
            <td>${agendamento.descricao}</td>
            <td>
                <div class="botoes">
                    <button class="edit-btn" onclick="editarAgendamento(${index})">Editar</button>
                    <button class="delete-btn" onclick="removerAgendamento(${index})">Excluir</button>
                </div>
            </td>
        `;
        tabela.appendChild(row);
    });
}

// Eventos
document.addEventListener("DOMContentLoaded", () => {
    // Carregar os agendamentos do localStorage ao carregar a página
    agendamentos = JSON.parse(localStorage.getItem("agendamentos")) || [];
    atualizarTabela();

    const form = document.getElementById("agendamento-form");
    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            const novoAgendamento = {
                nome: form.nome.value,
                data: form.data.value,
                hora: form.hora.value,
                descricao: form.descricao.value,
            };

            // Se existe um agendamento sendo editado, atualiza a lista
            const agendamentoEdicao = JSON.parse(localStorage.getItem("agendamentoEdicao"));
            if (agendamentoEdicao) {
                const index = agendamentos.findIndex(a => a.nome === agendamentoEdicao.nome && a.data === agendamentoEdicao.data);
                if (index !== -1) {
                    agendamentos[index] = novoAgendamento; // Atualiza o agendamento na lista
                    salvarAgendamentos();
                    localStorage.removeItem("agendamentoEdicao"); // Remove o item de edição
                    alert("Agendamento atualizado com sucesso!");
                }
            } else {
                // Adiciona o novo agendamento
                adicionarAgendamento(novoAgendamento);
                alert("Agendamento cadastrado com sucesso!");
            }

            // Limpa o formulário e redireciona para a lista
            form.reset();
            window.location.href = "agendamentos.html"; // Redireciona para a página de listagem
        });
    }

    const btnFiltrar = document.getElementById("btn-filtrar");
    if (btnFiltrar) {
        btnFiltrar.addEventListener("click", filtrarAgendamentos);
    }

    const btnLimparFiltro = document.getElementById("btn-limpar-filtro");
    if (btnLimparFiltro) {
        btnLimparFiltro.addEventListener("click", () => {
            document.getElementById("filter-form").reset();
            atualizarTabela(); // Atualiza a tabela quando o filtro é limpo
        });
    }

    // Preenche o formulário de edição, se necessário
    const agendamentoEdicao = JSON.parse(localStorage.getItem("agendamentoEdicao"));
    if (agendamentoEdicao && form) {
        form.nome.value = agendamentoEdicao.nome;
        form.data.value = agendamentoEdicao.data;
        form.hora.value = agendamentoEdicao.hora;
        form.descricao.value = agendamentoEdicao.descricao;
    }
});
