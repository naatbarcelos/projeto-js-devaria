const $stepText = $('#step-text');
const $stepDescription = $('#step-description');
const $stepOne = $('.step.one');
const $stepTwo = $('.step.two');
const $stepThree = $('.step.three');
const $title = $('#title');

const $containerBtnFormOne = $('#containerBtnFormOne');
const $btnFormOne = $('#btnFormOne');
const $containerBtnFormTwo = $('#containerBtnFormTwo');
const $btnFormTwo = $('#btnFormTwo');
const $containerBtnFormThree = $('#containerBtnFormThree');
const $btnFormThree = $('#btnFormThree');
const $inputNome = $('#nome');
const $inputSobrenome = $('#sobrenome');
const $inputDataNascimento = $('#dataNascimento');
const $inputEmail = $('#email');
const $inputMinibio = $('#minibio');
const $inputEndereco = $('#endereco');
const $inputComplemento = $('#complemento');
const $inputCidade = $('#cidade');
const $inputCep = $('#cep');
const $inputHabilidades = $('#habilidades');
const $inputPontosForte = $('#pontosForte');


let nomeValido = false;
let sobrenomeValido = false;
let dataNascimentoValido = false;
let emailValido = false;
let enderecoValido = false;
let cidadeValida = false;
let cepValido = false;
let habilidadesValido = false;
let pontosForteValido = false;

function init(){
    $stepText.text('Passo 1 de 3 - Dados pessoais');
    $stepDescription.text('Descreva seus dados para que possamos te conhecer melhor.');
    $stepTwo.hide();
    $stepThree.hide();

    const minLengthText = 2;
    const minLengthTextArea = 10;
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const cepRegex = /^([\d]{2})([\d]{3})([\d]{3})|^[\d]{2}.[\d]{3}-[\d]{3}/;


    function validarInput(element, minLength, maxLength, regex) {
    const closest = $(element).closest('.input-data');
        if(!element.value 
            || (minLength && element.value.trim().length < minLength)
            || (maxLength && element.value.trim().length > maxLength)
            || (regex && !element.value.toLowerCase().match(regex))
            
            ) {
            closest.addClass('error');
            return false;
        }
        closest.removeClass('error');
        return true;
}

function validaFormularioUm (){
    if(nomeValido && sobrenomeValido && emailValido && dataNascimentoValido){
        $containerBtnFormOne.removeClass('disabled');
        $btnFormOne.removeClass('disabled');
        $btnFormOne.off('click').on('click', iniciarFormulario2);
    }else{
        $containerBtnFormOne.addClass('disabled');
        $btnFormOne.addClass('disabled');
        $btnFormOne.off('click');
    }
}

function iniciarFormulario2(){
    $stepText.text('Passo 2 de 3 - Dados de correspondência');
    $stepDescription.text('Precisamos desses dados para que possamos entrar em contato.');
    $stepOne.hide();
    $stepTwo.show();

    $inputEndereco.keyup(function(){
        enderecoValido = validarInput(this, minLengthTextArea);
        validarFormularioDois();
    });
   
    $inputCidade.keyup(function(){
        cidadeValida = validarInput(this, minLengthText);
        validarFormularioDois();
    })

    $inputCep.keyup(function(){
        this.value = this.value.replace(/\D/g,'');
        cepValido = validarInput(this, null, null, cepRegex);
        if(cepValido){
        this.value = this.value.replace(cepRegex, "$1.$2-$3");
        }
        validarFormularioDois();
    });
}

    $inputComplemento.keyup(function(){
        validarFormularioDois();
    });

function validarFormularioDois(){
    if(enderecoValido && cidadeValida && cepValido){
        $containerBtnFormTwo.removeClass('disabled');
        $btnFormTwo.removeClass('disabled');
        $btnFormTwo.off('click').on('click', iniciarFormulario3);
    }else{
        $containerBtnFormTwo.addClass('disabled');
        $btnFormTwo.addClass('disabled');
        $btnFormTwo.off('click');
    }
}

function iniciarFormulario3(){
    $stepText.text('Passo 3 de 3 - Fale sobre você')
    $stepDescription.text('Para que possamos filtrar melhor você no processo conte-nos um pouco mais sobre suas habilidades e pontos de destaque');
    $stepTwo.hide();
    $stepThree.show();

    $inputHabilidades.keyup(function(){
        habilidadesValido = validarInput(this, minLengthTextArea);
        validarFormularioTres();
    });

    $inputPontosForte.keyup(function(){
        pontosForteValido = validarInput(this, minLengthTextArea);
        validarFormularioTres();
    });

    function validarFormularioTres(){
        if(habilidadesValido && pontosForteValido){
            $containerBtnFormThree.removeClass('disabled');
            $btnFormThree.removeClass('disabled');
            $btnFormThree.off('click').on('click', salvarNoTrello);
        }else{
            $containerBtnFormThree.addClass('disabled');
            $btnFormThree.addClass('disabled');
            $btnFormThree.off('click');
        }
    }
}

async function salvarNoTrello(){
    try{
        const nome = $inputNome.val();
        const sobrenome = $inputSobrenome.val();
        const email = $inputEmail.val();
        const dataNascimento = $inputDataNascimento.val();
        const minibio = $inputMinibio.val();
        const endereco = $inputEndereco.val();
        const complemento = $inputComplemento.val();
        const cidade = $inputCidade.val();
        const cep = $inputCep.val();
        const habilidades = $inputHabilidades.val();
        const pontosFortes = $inputPontosForte.val();
    
        if(!nome || !sobrenome || !email || !dataNascimento
            || !endereco || !cidade || !cep || !habilidades 
            || !pontosFortes){
                return alert('Favor preencher todos os dados obrigatórios para seguir')
            }

        const body = {
            name: "Candidato - " + nome + " " + sobrenome,
            desc: `
            Seguem dados do canditato(a):
            ---------Dados pessoais---------
            Nome: ${nome}
            Sobrenome: ${sobrenome}
            Email: ${email}
            Data de nascimento: ${dataNascimento}
            Minibio: ${minibio}

            ---------Dados de endereço---------
            Endereço: ${endereco}
            Complemento: ${complemento}
            Cidade: ${cidade}
            Cep: ${cep}

            ---------Dados do candidato---------
            Habilidades: ${habilidades}
            Pontos fortes: ${pontosFortes}
            `
        }

        await fetch('https://api.trello.com/1/cards?idList=65d4b2fc384d856adc9ce20d&key=2474e46e700d7fdd9031d24fee261491&token=ATTAb822651a179b8e8098fa424d9f200b84c0b506aea5e352aca1cf8adc62e46fc872547FC7',{
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });

        return finalizarFormulario();
    }catch(e){
        console.log('Ocorreu um erro ao salvar no Trello:', e);
    }
}

function finalizarFormulario(){
    $stepThree.hide();
    $stepDescription.hide();
    $title.text('Inscrição realizada com sucesso!');
    $stepText.text('Agradecemos sua inscrição, entraremos em contato assim que possível, nosso prazo de análise é de cinco dias úteis');
}

    $inputNome.keyup(function(){
       nomeValido = validarInput(this, minLengthText);
       validaFormularioUm();
    });

    $inputSobrenome.keyup(function(){
       sobrenomeValido = validarInput(this, minLengthText);
       validaFormularioUm();
    });

    $inputDataNascimento.keyup(function (){
       dataNascimentoValido = validarInput(this, minLengthText);
       validaFormularioUm();
    })
    
    $inputDataNascimento.change(function (){
        dataNascimentoValido = validarInput(this, minLengthText);
        validaFormularioUm();
    })
    
    

    $inputEmail.keyup(function (){
       emailValido = validarInput(this, null, null, emailRegex);
       validaFormularioUm();
    })

    $inputMinibio.keyup(function (){
        validaFormularioUm();
     })

 
     $inputDataNascimento.on('focus', function () {
        this.type = 'date';
    });

    $inputDataNascimento.on('blur', function () {
        if(!this.value){
            this.type = 'text';
        }
    })
        

}
   
  

init();