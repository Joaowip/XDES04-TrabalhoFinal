let agendamentos = JSON.parse(localStorage.getItem("agendamentos")) || [];

// Função para salvar agendamentos no localStorage
function salvarAgendamentos() {
    localStorage.setItem("agendamentos", JSON.stringify(agendamentos));
}

// Função para atualizar a tabela de atendimentos na página principal
function atualizarTabela() {
    const tabela = document.getElementById("atendimentos-tabela");
    if (!tabela) return;

    tabela.innerHTML = "";
    agendamentos.forEach((agendamento, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${agendamento.cliente}</td>
            <td>${agendamento.data}</td>
            <td>${agendamento.hora}</td>
            <td>${agendamento.servico}</td>
            <td>${agendamento.valor.toFixed(2)}</td>
            <td>${agendamento.barbeiro}</td>
            <td>${agendamento.pagamento}</td>
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

// Função para editar agendamento
function editarAgendamento(index) {
    const agendamento = agendamentos[index];
    localStorage.setItem("agendamentoEdicao", JSON.stringify({ agendamento, index }));
    window.location.href = "cadastrar_atendimento.html";
}

// Função para remover agendamento
function removerAgendamento(index) {
    if (confirm("Deseja realmente excluir este agendamento?")) {
        agendamentos.splice(index, 1);
        salvarAgendamentos();
        atualizarTabela();
    }
}

// Inicialização da página ao carregar
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("atendimento-form");
    if (form) {
        const edicao = JSON.parse(localStorage.getItem("agendamentoEdicao"));
        if (edicao) {
            // Preenche os campos para edição
            const { agendamento, index } = edicao;
            form.cliente.value = agendamento.cliente;
            form.data.value = agendamento.data;
            form.hora.value = agendamento.hora;
            form.servico.value = agendamento.servico;
            form.valor.value = agendamento.valor;
            form.barbeiro.value = agendamento.barbeiro;
            form.pagamento.value = agendamento.pagamento;

            form.addEventListener("submit", (event) => {
                event.preventDefault();

                // Atualiza o agendamento existente
                const atualizado = {
                    cliente: form.cliente.value,
                    data: form.data.value,
                    hora: form.hora.value,
                    servico: form.servico.value,
                    valor: parseFloat(form.valor.value),
                    barbeiro: form.barbeiro.value,
                    pagamento: form.pagamento.value,
                };

                agendamentos[index] = atualizado;
                salvarAgendamentos();
                alert("Atendimento atualizado com sucesso!");
                localStorage.removeItem("agendamentoEdicao");
                window.location.replace("atendimentos.html");
            });
        } else {
            form.addEventListener("submit", (event) => {
                event.preventDefault();

                // Adiciona novo agendamento
                const novoAgendamento = {
                    cliente: form.cliente.value,
                    data: form.data.value,
                    hora: form.hora.value,
                    servico: form.servico.value,
                    valor: parseFloat(form.valor.value),
                    barbeiro: form.barbeiro.value,
                    pagamento: form.pagamento.value,
                };

                agendamentos.push(novoAgendamento);
                salvarAgendamentos();
                alert("Atendimento cadastrado com sucesso!");
                form.reset();
                window.location.href = "atendimentos.html";
            });
        }
    }

    // Atualiza a tabela de atendimentos, se aplicável
    atualizarTabela();

    // Filtrar atendimentos
    const btnFiltrar = document.getElementById("btn-filtrar");
    if (btnFiltrar) {
        btnFiltrar.addEventListener("click", () => {
            const filtroCliente = document.getElementById("filter-cliente").value.toLowerCase();
            const filtroData = document.getElementById("filter-data").value;
            const filtroServico = document.getElementById("filter-servico").value;
            const filtroBarbeiro = document.getElementById("filter-barbeiro").value.toLowerCase();

            const resultados = agendamentos.filter((agendamento) => {
                const clienteMatch = filtroCliente ? agendamento.cliente.toLowerCase().includes(filtroCliente) : true;
                const dataMatch = filtroData ? agendamento.data === filtroData : true;
                const servicoMatch = filtroServico ? agendamento.servico === filtroServico : true;
                const barbeiroMatch = filtroBarbeiro ? agendamento.barbeiro.toLowerCase().includes(filtroBarbeiro) : true;
                return clienteMatch && dataMatch && servicoMatch && barbeiroMatch;
            });

            atualizarTabelaComFiltro(resultados);
        });
    }

    // Limpar filtros
    const btnLimparFiltro = document.getElementById("btn-limpar-filtro");
    if (btnLimparFiltro) {
        btnLimparFiltro.addEventListener("click", () => {
            document.getElementById("filter-form").reset();
            atualizarTabela();
        });
    }
});

// Atualiza a tabela com resultados filtrados
function atualizarTabelaComFiltro(resultados) {
    const tabela = document.getElementById("atendimentos-tabela");
    tabela.innerHTML = "";
    resultados.forEach((agendamento, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${agendamento.cliente}</td>
            <td>${agendamento.data}</td>
            <td>${agendamento.hora}</td>
            <td>${agendamento.servico}</td>
            <td>${agendamento.valor.toFixed(2)}</td>
            <td>${agendamento.barbeiro}</td>
            <td>${agendamento.pagamento}</td>
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
