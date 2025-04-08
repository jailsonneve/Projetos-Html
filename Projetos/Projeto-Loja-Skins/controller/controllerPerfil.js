import { buscarCep } from "../model/modelPerfil.js";
import { copiarChave, updateSelectWidth, addCartao } from "../view/viewPerfil.js";
const select = document.getElementById("dynamic-select");
const sizeMeasure = document.getElementById("size-measure");
const inputCep = document.getElementById('cep')
const btnCopiar = document.getElementById('btnCopyKey');
const btnAddCartao = document.getElementById('btnAddCartao');
btnAddCartao.addEventListener("click", addCart);
function addCart() {
    addCartao();
}
inputCep.addEventListener("blur", buscarC)
select.addEventListener("change", updateSelectW);
btnCopiar.addEventListener('click', function () {
    copiarChave();
});
function buscarC() {
    let cep = document.getElementById('cep').value.replace(/\D/g, '');
    const inputRua = document.getElementById('rua');
    const inputBairro = document.getElementById('bairro');
    const inputCidade = document.getElementById('cidade');
    const inputEstado = document.getElementById('estado');
    if (cep.length !== 8) {
        alert('CEP inválido!');
        return;
    }else{
        buscarCep(cep, inputRua, inputBairro, inputCidade, inputEstado);
    }
}
function updateSelectW() {
    updateSelectWidth(select,sizeMeasure)
}
updateSelectW();