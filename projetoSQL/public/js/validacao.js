//função font-size
tamanho = 16;

//Evento Scroll linha: 24 à 39
function aumentarFonte() {
  tamanho++;
  document.body.style.fontSize = tamanho + "px"; //style que muda tamanho da fonte 
}

function diminuirFonte() {
  tamanho--;
  document.body.style.fontSize = tamanho + "px";
}

//função modo noite/dia
function modoEscuro() {
    document.body.style.backgroundColor = "#212529"; //mudando cor do background
    document.body.style.color = "white";
    $("table").css({color: "white"})   
}
  
function modoClaro() {
    document.body.style.backgroundColor = "white";
    document.body.style.color = "black";
    $("table").css({color: "black"}) 
}



function valida_nome(x){
    var nome = x.value
    if(!isNaN(nome) || nome == "" || nome.length < 3){
        x.style.border = "2px solid #DC3545"
        return false
    }
    else{
        x.style.textTransform = "uppercase"
        x.style.border = "2px solid #28A745"
        return true
    }
}

function valida_autor(x){
    var autor = x.value
    if(!isNaN(autor) || autor == "" || autor.length < 3){
        x.style.border = "2px solid #DC3545"
        return false
    }
    else{
        x.style.textTransform = "uppercase"
        x.style.border = "2px solid #28A745"
        return true
    }
}

function valida_categoria(x){
    
    if(x.value == ""){
        x.style.border = "2px solid #DC3545"
        return false
    }
    else{
        x.style.border = "2px solid #28A745"
        return true
    }
}

function enviar_dados(){
    var nome_input = document.getElementById("nome");
    var autor_input = document.getElementById("autor");
    var categoria_input = document.getElementById("categoria")
    var botao = document.getElementById("enviar")
    var formValida = true

    if(!valida_nome(nome_input)){
        formValida = false
    }

    if(!valida_autor(autor_input)){
        formValida = false
    }

    if(!valida_categoria(categoria_input)){
        formValida = false
    }

    if(!formValida){
        $("#enviar").attr('type','button');
        alert("Dados Inválidos! Por favor, verifique os campos em vermelho e tente novamente.")
        return formValida;
    }

    else{
        $("#enviar").attr("type","submit");
        botao.setAttribute("submit", "");
        alert("Livro Cadastrado");
        return true
    }
}

