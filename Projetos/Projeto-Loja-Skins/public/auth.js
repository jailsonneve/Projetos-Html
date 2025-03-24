const auth = firebase.auth();

function loginEmail() {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  auth.signInWithEmailAndPassword(email, senha)
    .then(() => {
      Swal.fire("Sucesso!", "Login realizado com sucesso!", "success")
        .then(() => window.location.href = "index.html");
    })
    .catch((error) => {
      Swal.fire("Erro", error.message, "error");
    });
}

function registrarEmail() {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  auth.createUserWithEmailAndPassword(email, senha)
    .then(() => {
      Swal.fire("Sucesso!", "Usuário cadastrado com sucesso!", "success");
    })
    .catch((error) => {
      Swal.fire("Erro", error.message, "error");
    });
}

function loginGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider)
    .then(() => {
      Swal.fire("Sucesso!", "Login com Google realizado!", "success")
        .then(() => window.location.href = "index.html");
    })
    .catch((error) => {
      Swal.fire("Erro", error.message, "error");
    });
}
