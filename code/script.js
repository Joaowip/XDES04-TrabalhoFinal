document.addEventListener("DOMContentLoaded", function() {
  const userTableBody = document.getElementById("userTableBody");
  const btnNovoUsuario = document.getElementById("btnNovoUsuario");
  let usuarios = [];

  // Função para salvar usuário no array
  function addUser(usuario) {
    usuarios.push(usuario);
    renderUserTable();
  }

  // Função para renderizar a tabela de usuários
  function renderUserTable() {
    userTableBody.innerHTML = "";

    usuarios.forEach((user, index) => {
      const row = userTableBody.insertRow();

      row.innerHTML = `
        <td>${user.matricula}</td>
        <td>${user.nome}</td>
        <td>${user.cpf}</td>
        <td>${user.dataNascimento}</td>
        <td>${user.endereco}</td>
        <td>${user.genero}</td>
        <td>${user.telefone}</td>
        <td>${user.email}</td>
        <td>${user.senha}</td>
        <td>${user.tipo}</td>
        <td>${user.status}</td>
        <td>
          <button onclick="editarUsuario(${index})" class="btn btn-warning btn-sm">Editar</button>
          <button onclick="excluirUsuario(${index})" class="btn btn-danger btn-sm">Excluir</button>
        </td>
      `;
    });
  }

  // Função para abrir o formulário de novo usuário
  btnNovoUsuario.addEventListener("click", function() {
    window.open("cadastrarusuario.html", "_blank");
  });

  // Função para editar usuário
  window.editarUsuario = function(index) {
    alert(`Editar usuário: ${usuarios[index].nome}`);
  };

  // Função para excluir usuário
  window.excluirUsuario = function(index) {
    if (confirm(`Deseja excluir o usuário ${usuarios[index].nome}?`)) {
      usuarios.splice(index, 1);
      renderUserTable();
    }
  };

  // Inicializa a tabela de usuários
  renderUserTable();
  
  // Função para adicionar o usuário na lista ao voltar da página de cadastro
  window.addUser = addUser;
});
