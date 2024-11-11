document.addEventListener("DOMContentLoaded", function() {
  const userTableBody = document.getElementById("userTableBody");
  const btnNovoUsuario = document.getElementById("btnNovoUsuario");

  // Exemplo de dados de usuários
  let usuarios = [
    { matricula: "001", nome: "João Silva", cpf: "12345678901", nascimento: "01-01-1990", endereco: "Rua A, 123", genero: "Masculino", telefone: "11987654321", email: "joao@exemplo.com", senha: "Senha@123", tipo: "Barbeiro", status: "Ativo" },
    // Adicione mais usuários aqui
  ];

  // Função para formatar CPF e Telefone
  function formatCPF(cpf) {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }

  function formatTelefone(telefone) {
    return telefone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  }

  // Renderiza a tabela de usuários
  function renderTable() {
    userTableBody.innerHTML = "";

    usuarios.forEach((user, index) => {
      const row = userTableBody.insertRow();

      row.innerHTML = `
        <td>${user.matricula}</td>
        <td>${user.nome}</td>
        <td>${formatCPF(user.cpf)}</td>
        <td>${user.nascimento}</td>
        <td>${user.endereco}</td>
        <td>${user.genero}</td>
        <td>${formatTelefone(user.telefone)}</td>
        <td>${user.email || "-"}</td>
        <td>
          <input type="password" value="${user.senha}" readonly style="border: none; background: none;">
          <button onclick="togglePassword(${index})" class="btn btn-sm btn-outline-secondary">👁️</button>
        </td>
        <td>${user.tipo || "Barbeiro"}</td>
        <td>
          <div style="width: 20px; height: 20px; background-color: ${user.status === "Ativo" ? "green" : "red"}; border-radius: 50%;"></div>
        </td>
        <td>
          <button onclick="editarUsuario(${index})" class="btn btn-warning btn-sm">Editar</button>
          <button onclick="excluirUsuario(${index})" class="btn btn-danger btn-sm">Excluir</button>
        </td>
      `;
    });
  }

  // Função para alternar a visibilidade da senha
  window.togglePassword = function(index) {
    const passwordInput = userTableBody.rows[index].cells[8].querySelector("input");
    passwordInput.type = passwordInput.type === "password" ? "text" : "password";
  };

  // Funções de edição e exclusão de usuário
  window.editarUsuario = function(index) {
    // Aqui você pode abrir um formulário de edição em uma nova aba ou modal com os dados do usuário
    alert(`Editar usuário: ${usuarios[index].nome}`);
  };

  window.excluirUsuario = function(index) {
    if (confirm(`Deseja excluir o usuário ${usuarios[index].nome}?`)) {
      usuarios.splice(index, 1);
      renderTable();
    }
  };

  // Ação do botão para abrir nova aba para cadastro de usuário
  btnNovoUsuario.addEventListener("click", function() {
    window.open("cadastrar_usuario.html", "_blank");
  });

  // Renderiza a tabela na inicialização
  renderTable();
});

document.addEventListener("DOMContentLoaded", function() {
  const clientTableBody = document.getElementById("clientTableBody");
  const btnNovoCliente = document.getElementById("btnNovoCliente");

  // Exemplo de dados de clientes
  let clientes = [
    { nome: "Ana Souza", cpf: "12345678901", nascimento: "15-06-1985", telefone: "11987654321", fidelidade: "Não" },
    // Adicione mais clientes conforme necessário
  ];

  // Função para formatar CPF e Telefone
  function formatCPF(cpf) {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }

  function formatTelefone(telefone) {
    return telefone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  }

  // Renderiza a tabela de clientes
  function renderClientTable() {
    clientTableBody.innerHTML = "";

    clientes.forEach((client, index) => {
      const row = clientTableBody.insertRow();

      row.innerHTML = `
        <td>${client.nome}</td>
        <td>${formatCPF(client.cpf)}</td>
        <td>${client.nascimento}</td>
        <td>${formatTelefone(client.telefone)}</td>
        <td>${client.fidelidade || "Não"}</td>
        <td>
          <button onclick="editarCliente(${index})" class="btn btn-warning btn-sm">Editar</button>
          <button onclick="excluirCliente(${index})" class="btn btn-danger btn-sm">Excluir</button>
        </td>
      `;
    });
  }

  // Funções de edição e exclusão de cliente
  window.editarCliente = function(index) {
    // Aqui você pode abrir um formulário de edição em uma nova aba ou modal com os dados do cliente
    alert(`Editar cliente: ${clientes[index].nome}`);
  };

  window.excluirCliente = function(index) {
    if (confirm(`Deseja excluir o cliente ${clientes[index].nome}?`)) {
      clientes.splice(index, 1);
      renderClientTable();
    }
  };

  // Ação do botão para abrir nova aba para cadastro de cliente
  btnNovoCliente.addEventListener("click", function() {
    window.open("cadastrar_cliente.html", "_blank");
  });

  // Renderiza a tabela de clientes na inicialização
  renderClientTable();
});
