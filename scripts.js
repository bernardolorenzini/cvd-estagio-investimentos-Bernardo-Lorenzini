class Validator{

    constructor() {
        this.validations = [
          'data-min-length',
        ]
      }

    // INICIANDO A VALIDAÇAO DOS DADOS
    validate(form){

        let currentValidations = document.querySelectorAll("form .error_validation");

        if(currentValidations.length > 0 ){

            this.cleanValidations(currentValidations);
        }


        // recebendo inputs
        let inputs = form.getElementsByTagName('input');
        
        // colecao de array 
        let inputsArray = [...inputs];

        //loop de validacao dos inputs
        inputsArray.forEach(function(input){
            
                //loop das validacoes existentes

                for(let i = 0; this.validations.length > i; i++) {
                    if(input.getAttribute(this.validations[i]) != null) {
                        //limpando strings para transformar em um método
                        let method = this.validations[i].replace("data-", "").replace("-", "");

                        //valor do input
                        let value = input.getAttribute(this.validations[i])

                        //chamando o metodo
                        this[method](input,value);
                    }
                }
        }, this);

    }
    //verifica o minimo de caracteres
    minlength(input, minValue){

        let inputLength = input.value.length;

        let errorMessage = `O campo precisa ter no minimo ${minValue} caracteres`;
        if(inputLength < minValue){
            this.printMessage(input, errorMessage)
        }

    }

    printMessage(input, msg) {
  
        // checa os erros do input
        let errorsQty = input.parentNode.querySelector('.error_validation');
    
        // imprimir erro só se não tiver erros
        let template = document.querySelector('.error_validation').cloneNode(true);

        template.textContent = msg;
        let inputParent = input.parentNode;
        template.classList.remove('template');
  
        inputParent.appendChild(template);
    }

    cleanValidations(validations) {
        validations.forEach(el => el.remove());
    }

    required(input) {
  
        let inputValue = input.value;
    
        if(inputValue === '') {
          let errorMessage = `Este campo é obrigatório`;
    
          this.printMessage(input, errorMessage);
        }
    
      }

}

let form = document.getElementById('register_form');
let submit = document.getElementById('btn-submit');

let validator = new Validator();

// evento de envio do form, que valida os inputs
submit.addEventListener('click', function(e) {
  e.preventDefault();

  validator.validate(form);
});

