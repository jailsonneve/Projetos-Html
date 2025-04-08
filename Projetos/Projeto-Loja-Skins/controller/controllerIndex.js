import { getItens, itensId, entrarComGoogle, fazerCadastro, fazerLogin, adicionarCarrinho, avaliarItem, calcularEstrelas } from '../model/modelIndex.js';
import { gerarItens, updateSelectWidth } from "../view/viewIndex.js";
gerarItens();
const btnLogin = document.querySelector("#btnLogin");
const btnCadastro = document.querySelector("#btnCadastro");
const btnGoogle = document.querySelector("#btnGoogle");
btnLogin.addEventListener("click", fazerLogin);
btnCadastro.addEventListener("click", fazerCadastro);
btnGoogle.addEventListener("click", entrarComGoogle);