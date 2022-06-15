let modalCriarRecado = new bootstrap.Modal('#modalCriarRecado');
let codigo = document.getElementById('criarCodigo') as HTMLInputElement;
let descricao = document.getElementById('criarDescricao') as HTMLInputElement;
let detalhamento = document.getElementById('criarDetalhamento') as HTMLInputElement;
let formCriarRecado = document.getElementById('formCriarRecado') as HTMLFormElement;


let nomeUsuario = document.getElementById('nomeUsuarioHeader') as HTMLParagraphElement
document.addEventListener('DOMContentLoaded' , () =>{
  

    carregarDados();
    mudarNomeUsuario();
});

function buscarListaUsuariosNoStorage(): Usuario[] {
    return JSON.parse(localStorage.getItem('usuarios') || '[]');
}

function mudarNomeUsuario() {
    let listaUsuarios: Usuario[] = buscarListaUsuariosNoStorage();
    let UsuarioLogado = sessionStorage.getItem("logIn");

    let indiceUsuario=  listaUsuarios.findIndex((usuario) =>{
        return usuario.email === UsuarioLogado;
    });
    let nomeUsuarioLogado = listaUsuarios[indiceUsuario].nome

    nomeUsuario.innerHTML = `Olá ${nomeUsuarioLogado}`

}

interface Recado {
    codigo: string,
    descricao: string,
    detalhamento: string,
}

formCriarRecado.addEventListener('submit' , (e)=>{
    e.preventDefault()

    if(descricao.value === "" || detalhamento.value === '' || codigo.value === '') {
        descricao.setAttribute('style' , 'background-color: #ff9999'),
        detalhamento.setAttribute('style' , 'background-color: #ff9999'),
        codigo.setAttribute('style' , 'background-color: #ff9999'),
        codigo.focus()
        return
    };

    let listaRecados: Recado[] = pegarRecados();

    let existeCodigo: boolean = listaRecados.some((recado) => recado.codigo === codigo.value);

    if (existeCodigo) {
        alert('Já existe um recado com o código informado!')
        return
    }

    let novoRecado: Recado = {
        codigo: codigo.value,
        descricao: descricao.value,
        detalhamento: detalhamento.value
    }

    listaRecados.push(novoRecado);

    modalCriarRecado.hide();


    mostrarNovoRecado(novoRecado);
    salvarNoStorage(listaRecados);


    alert('Recado criado com sucesso!')
});

function mostrarNovoRecado(novoRecado: Recado){

    let espacoListaRecados = document.getElementById('espacoRecados') as HTMLDivElement

    let novoAcordion: HTMLDivElement = document.createElement('div');
    novoAcordion.setAttribute('class' , 'accordion-item');
    novoAcordion.setAttribute('id' , novoRecado.codigo);

    // let espacoNovoRecado: HTMLDivElement = document.createElement('div');
    // espacoNovoRecado.setAttribute ('id' , `${novoRecado.codigo}`)
    novoAcordion.innerHTML = `
    <h2 class="accordion-header" id="heading${novoRecado.codigo}">
    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
        data-bs-target="#collapse${novoRecado.codigo}" aria-expanded="false" aria-controls="collapse${novoRecado.codigo}">
        <strong> ${novoRecado.descricao} </strong>
    </button>
</h2>
<div id="collapse${novoRecado.codigo}" class="accordion-collapse collapse" aria-labelledby="heading${novoRecado.codigo}">
    <div class="accordion-body">
        ${novoRecado.detalhamento}
    </div>
</div>
    `

    // novoAcordion.appendChild(espacoNovoRecado);
    espacoListaRecados.appendChild(novoAcordion);


    // let novoTitulo: HTMLParagraphElement = document.createElement('p');
    // novoTitulo.setAttribute('class' , 'h2 accordion-header')

    // let novoBotao: HTMLButtonElement = document.createElement('button');
    // novoBotao.setAttribute('class' , 'accordion-button');
    // novoBotao.setAttribute('type' , 'button');
    // novoBotao.setAttribute('data-bs-toggle' , 'collapse');
    // novoBotao.setAttribute('data-bs-target' , '')
    
    //



            // PAREI AQUI TENTANDO CONFIRGURA AS MERDASAAAAAAAAAAAAAAAAAAAAAAAAAAAA DOS BOOSOES





    // type="button" data-bs-toggle="collapse"
                                // data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne"



}

function salvarNoStorage(recadosUsuario: Recado[]) {
    localStorage.setItem('recadosUsuario' , JSON.stringify(recadosUsuario));
}


function carregarDados(){
    let recados =JSON.parse(localStorage.getItem('recadosUsuario') || '[]');

    for (let recado of recados) {
        mostrarNovoRecado(recado);
    }
}

function pegarRecados(){
    return JSON.parse(localStorage.getItem('recadosUsuario') || '[]');
}


