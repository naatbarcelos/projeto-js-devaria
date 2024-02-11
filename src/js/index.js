const $stepText = $('#step-text');
const $stepDescription = $('#step-description');
const $stepOne = $('.step.one');
const $stepTwo = $('.step.two');
const $stepThree = $('.step.three');

const $inputNome = $('#nome');
const $inputSobrenome = $('#sobrenome');

function init(){
    $stepText.text('Passo 1 de 3 - Dados pessoais');
    $stepDescription.text('Descreva seus dados para que possamos te conhecer melhor.');
    $stepTwo.hide();
    $stepThree.hide();
}

$inputNome.keyup(function(){
    const closest = $(this).closest('.input-data');
    if(!this.value || this.value.trim().lenght < 2){
        return closest.addClass('error');
    } 
    return closest.removeClass('error');
}); 

 $inputSobrenome.keyup(function(){
    const closest = $(this).closest('.input-data')
    if(!this.value || this.value.trim().lenght <2){
        return closest.addClass('error');
    }
    return closest.removeClass('error');
 })

init();