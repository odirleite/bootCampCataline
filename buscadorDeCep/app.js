
var submitButton = document.querySelector('#app form button');
var zipCodeField = document.querySelector('#app form input');
var content = document.querySelector('#app main')

submitButton.addEventListener('click', run);

function run(event) {
    event.preventDefault();//Previne que a página não carregue logo após o botão ser clicado

    var zipCode = zipCodeField.value //Criou uma variavel para armazenar o que for escrito no campo do zipCodeField

    // Tratamento dos dados

    zipCode = zipCode.replace(' ', ''); //Muda espaços em branco para sem espaços
    zipCode = zipCode.replace('.', ''); // Muda caso digitado ponto para sem ponto
    zipCode = zipCode.trim(); //remove os espaços tanto da esquerda quando da direita

    axios
    .get('https://viacep.com.br/ws/' + zipCode + '/json/')//através desse site que será feito a busca do cep
    .then(function (response) {
        if (response.data.erro) {
            throw new Error('CEP inválido')
        }
        content.innerHTML = '' //esse comando serve para limpar o que estiver dentro do conteúdo
        createLine(response.data.logradouro)
        createLine(response.data.localidade +'/'+ response.data.uf)
        createLine(response.data.bairro)
    })
    .catch(function(error) {
        content.innerHTML = ''
        createLine('Ops, algo deu errado!')
    })

    function createLine(text) {
        var line = document.createElement('p') //Criou um elemento do tipo paragrafo para a variável (line)
        var text = document.createTextNode(text)

        line.appendChild(text) 
        content.appendChild(line)
    }
}
