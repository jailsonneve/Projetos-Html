import { gerarItens, updateSelectWidth } from "../view/viewIndex.js";
const itens = [
    {
        id: 1,
        nome: "Creme Calmante Multirreparador 17,5% Mix de Ativos Principia CM-01",
        descricao: "\n Promover hidratação \n Amenizar a irritação \n Aliviar a ardência \n Reduzir a descamação \n Diminuir a vermelhidão \n Melhorar assaduras\nAumentar a firmeza e elasticidade \nProporcionar maciez \nMelhorar o viço.",
        preco: 4999.90,
        imagem: "../../static/imagens/Creme Calmante Multirreparador.webp",
        numVendas: 500,
        valorEstrela: [1,4,3,2,5],
        comentarios: []
    },
    {
        id: 2,
        nome: "Espuma de limpeza Clean Beauty - Livia Diniz",
        descricao: "A Espuma de Limpeza Clean Beauty da Livia Diniz é o segredo para uma rotina de skincare eficaz e refrescante. Formulada com ingredientes de origem natural e livre de substâncias nocivas, esta espuma proporciona uma limpeza suave, porém profunda, removendo impurezas, oleosidade e resíduos de maquiagem, sem agredir a barreira natural da pele.",
        preco: 899.99,
        imagem: "../../static/imagens/Espuma de limpeza Clean Beauty - Livia Diniz LIVBEAUTY.webp",
        numVendas: 450,
        valorEstrela: [5,3,2,4,1],
        comentarios: []
    },
    {
        id: 3,
        nome: "GEL DE LIMPEZA GL-02 350G",
        descricao: "Gel de limpeza com 11,5% de mix de tensoativos, 10% de glicerina e 1% de PCA sódio, com alta eficácia na melhora da oleosidade, poros dilatados e viço da pele. Indicado para peles sensíveis.",
        preco: 44,
        imagem: "../../static/imagens/GEL DE LIMPEZA GL-02 350G.webp",
        numVendas: 1700,
        valorEstrela: [5,5,5,5,5],
        comentarios: []
    },
    {
        id: 4,
        nome: "Máscara Facial de Algodão, Kiss New York Professional, Pepino",
        descricao: "Calmante e antioxidanteInspirada no mundo inovador da beleza coreana, k-beauty.Proporciona uma pele ultra-hidratada, saudável e revitalizada.Dermatologicamente testada.Livre de parabenos e corantes artificias.",
        preco: 1299.90,
        imagem: "../../static/imagens/Máscara Facial de Algodão, Kiss New York Professional, Pepino.webp",
        numVendas: 890,
        valorEstrela: [4,3,5,1,2],
        comentarios: []
    },
    {
        id: 5,
        nome: "Óleo de Limpeza Demaquilante OL-01",
        descricao: "Óleo de limpeza demaquilante com 30% de óleo de girassol, 15% mix de tensoativos e 1% vitamina E, com alta eficácia na remoção de maquiagem, inclusive resistente a água, resíduos de protetor solar e impurezas da pele.",
        preco: 699.99,
        imagem: "../../static/imagens/Óleo de Limpeza Demaquilante OL-01.webp",
        numVendas: 1350,
        valorEstrela: [5,1,4,4,2],
        comentarios: []
    },
    {
        id: 6,
        nome: "Óleo De Rosa Mosqueta Mrfar 100% Puro 30ml Manchas E Estrias",
        descricao: "O Hidratante Corporal Óleo de Rosa Mosqueta é a escolha ideal para quem busca uma pele suave e bem cuidada. Com uma consistência cremosa, este produto é formulado para atender todos os tipos de pele, proporcionando hidratação intensa e duradoura por até 24 horas. Sua fórmula hipoalergênica garante segurança e conforto, mesmo para as peles mais sensíveis.",
        preco: 599.99,
        imagem: "../../static/imagens/Óleo de Rosa Mosqueta.webp",
        numVendas: 950,
        valorEstrela: [3,2,1,5,1],
        comentarios: []
    }
];
export function getItens() {
    return itens;
}
export function itensId() {
    itens.forEach(item => {
        return item.id;
    });
}
export function fazerLogin() {
    const email = document.getElementById("loginEmail").value;
    const senha = document.getElementById("loginSenha").value;

    if (!email || !senha || !email.includes("@")) {
        Swal.fire({
            icon: 'error',
            title: 'Erro!',
            text: 'Por favor, preencha os campos corretamente!',
        });
        return;
    }
    if (email === "adm123@gmail.com" && senha === "adm123") {
        document.getElementById("loginEmail").value = ""; document.getElementById("loginSenha").value = "";
        Swal.fire({
            icon: 'success',
            title: 'Login realizado!',
            text: 'Bem-vindo ao Skinder!',
        }).then(() => {
            var modal = bootstrap.Modal.getInstance(document.getElementById('modalLogin'));
            modal.hide();
        });
        window.location.href = "perfil.html"
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Erro no login!',
            text: 'Email ou senha incorretos.',
        });
    }
}

export function fazerCadastro() {
    const email = document.getElementById("loginEmail").value;
    const senha = document.getElementById("loginSenha").value;

    if (!email || !senha || !email.includes("@")) {
        Swal.fire({
            icon: 'error',
            title: 'Erro!',
            text: 'Por favor, preencha os campos corretamente!',
        });
        return;
    }else{
        Swal.fire({
            title: 'Cadastro',
            text: 'Função de cadastro ainda não implementada.',
            icon: 'info',
        });
    }
}

export function entrarComGoogle() {
    Swal.fire({
            title: 'Entrar com o Google',
            text: 'Função de entrar com o Google ainda não implementada.',
            icon: 'info',
    });
}

document.getElementById("toggleSenha").addEventListener("click", function () {
    const senhaField = document.getElementById("loginSenha");
    const icon = this.querySelector("i");
    
    if (senhaField.type === "password") {
        senhaField.type = "text";
        icon.classList.remove("bi-eye");
        icon.classList.add("bi-eye-slash");
    } else {
        senhaField.type = "password";
        icon.classList.remove("bi-eye-slash");
        icon.classList.add("bi-eye");
    }
});
const carrinho = [];
const divCart = document.getElementById("quantCart");

export function avaliarItem(id) {
    getItens().forEach(item => {
        if (item.id === id) {
            Swal.fire({
                title: `Avaliar ${item.nome}`,
                html:
                    `<div id="stars" class="stars">
                        ${[1, 2, 3, 4, 5].map(i => `<i class="star" data-star="${i}">★</i>`).join('')}
                    </div>
                    <textarea id="comentario" class="swal2-textarea" placeholder="Comentário"></textarea>`,
                showCancelButton: true,
                confirmButtonText: "Enviar",
                didOpen: () => {
                    const stars = document.querySelectorAll(".star");
                    stars.forEach((star, index) => {
                        star.addEventListener("click", () => {
                            stars.forEach((s, i) => s.style.color = i <= index ? "#ffc107" : "gray");
                            document.getElementById("stars").setAttribute("data-nota", index + 1);
                        });
                    });
                },
                preConfirm: () => {
                    const nota = parseInt(document.getElementById("stars").getAttribute("data-nota") || 0);
                    const comentario = document.getElementById("comentario").value.trim();
        
                    if (!nota) {
                        Swal.showValidationMessage("Por favor, selecione uma nota.");
                    }
        
                    return { nota, comentario };
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    item.comentarios.push({
                        comentario: result.value.comentario,
                        nota: result.value.nota
                    });
                    item.valorEstrela.push(result.value.nota);
                    gerarItens();
                    Swal.fire("Obrigado!", "Sua avaliação foi enviada.", "success");
                }
            });
        }
    });
}

export function adicionarCarrinho(id) {
    const item = getItens().find(i => i.id === id);
    carrinho.push(item);
    divCart.innerHTML = ` (${carrinho.length})`
    Swal.fire("Adicionado!", `${item.nome} foi adicionado ao carrinho.`, "success");
}

export function calcularEstrelas(item) {
    if (item.valorEstrela.length === 0) {
        return "Nenhuma avaliação";
    }

    const totalEstrelas = item.valorEstrela.reduce((acc, curr) => acc + curr, 0);
    const mediaEstrelas = totalEstrelas / item.valorEstrela.length;

    let estrelas = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(mediaEstrelas)) {
            estrelas += '★';
        } else if (i === Math.ceil(mediaEstrelas) && mediaEstrelas % 1 !== 0) {
            estrelas += '☆';
        } else {
            estrelas += '☆';
        }
    }

    return estrelas;
}

// react js - front(dps)
// backend - node js
/**
 * index.js 
 * routes.js
 * views/ html ou ejs
 * public/
 *  css/
 *  img/
 *  js/
 * 
 */
