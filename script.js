let senhaSecreta = "";
let entradaAtual = "";
let tentativasRestantes = 6;
let jogoEncerrado = false;

const visor = document.getElementById("visor");
const mensagem = document.getElementById("mensagem");
const historico = document.getElementById("historico");
const spanTentativas = document.getElementById("tentativas-restantes");
const btnReiniciar = document.getElementById("btn-reiniciar");

// Gera uma senha de 4 dígitos sem repetição
function gerarSenha() {
  const numeros = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  let senha = "";
  for (let i = 0; i < 4; i++) {
    const indiceAleatorio = Math.floor(Math.random() * numeros.length);
    senha += numeros.splice(indiceAleatorio, 1)[0];
  }
  return senha;
}

function iniciarJogo() {
  senhaSecreta = gerarSenha();
  entradaAtual = "";
  tentativasRestantes = 6;
  jogoEncerrado = false;

  visor.textContent = "----";
  visor.style.color = "#04d361";
  mensagem.textContent = "";
  historico.innerHTML = "";
  spanTentativas.textContent = tentativasRestantes;
  btnReiniciar.classList.add("hidden");
}

function digitar(numero) {
  if (jogoEncerrado || entradaAtual.length >= 4) return;
  entradaAtual += numero;
  atualizarVisor();
}

function limpar() {
  if (jogoEncerrado) return;
  entradaAtual = "";
  atualizarVisor();
}

function atualizarVisor() {
  visor.textContent = entradaAtual.padEnd(4, "-");
}

function verificarSenha() {
  if (jogoEncerrado) return;

  if (entradaAtual.length < 4) {
    mensagem.style.color = "#fba94c";
    mensagem.textContent = "Digite 4 números antes de confirmar!";
    return;
  }

  tentativasRestantes--;
  spanTentativas.textContent = tentativasRestantes;
  registrarTentativa(entradaAtual);

  if (entradaAtual === senhaSecreta) {
    mensagem.style.color = "#04d361";
    mensagem.textContent = "🔓 Cofre aberto! Parabéns!";
    finalizarJogo();
  } else if (tentativasRestantes === 0) {
    mensagem.style.color = "#e53935";
    mensagem.textContent = `🚨 Bloqueado! A senha era ${senhaSecreta}.`;
    visor.style.color = "#e53935";
    finalizarJogo();
  } else {
    mensagem.style.color = "#e1e1e6";
    mensagem.textContent = "Senha incorreta! Veja as dicas abaixo.";
    entradaAtual = "";
    atualizarVisor();
  }
}

function registrarTentativa(palpite) {
  const item = document.createElement("li");
  item.classList.add("tentativa-item");

  const label = document.createElement("span");
  label.textContent = `Tentativa ${6 - tentativasRestantes}:`;

  const containerDigitos = document.createElement("div");
  containerDigitos.classList.add("digitos-feedback");

  for (let i = 0; i < 4; i++) {
    const box = document.createElement("span");
    box.classList.add("box-digito");
    box.textContent = palpite[i];

    if (palpite[i] === senhaSecreta[i]) {
      box.classList.add("certo");
    } else if (senhaSecreta.includes(palpite[i])) {
      box.classList.add("posicao-errada");
    } else {
      box.classList.add("errado");
    }

    containerDigitos.appendChild(box);
  }

  item.appendChild(label);
  item.appendChild(containerDigitos);
  historico.prepend(item);
}

function finalizarJogo() {
  jogoEncerrado = true;
  btnReiniciar.classList.remove("hidden");
}

// Inicia o jogo ao carregar a página
iniciarJogo();