class Validator{

    constructor(){
        this.validations = [
            "data-min-lenght",

        ]

    }

    // INICIANDO A VALIDAÇAO DOS DADOS
    validate(form){
        // recebendo inputs
        let inputs = form.getElementsByTagName("input");
        
        // colecao de array 
        let inputsArray = [...inputs]

        //loop de validacao dos inputs
        inputsArray.forEach(function(input){
            console.log(input);
                //loop das validacoes existentes

                for(let i = 0; this.validations.lenght > i;i++){
                    if(input.getAttribute(this.validations[i]) != null){
                        //limpando strings para transformar em um método
                        let method = this.validations[i].replace("data-", "").replace( "-", "");

                        //valor do input
                        let value = input.getAttribute(this.validations[i]);

                        //chamando o metodo
                        this[method](input, value);




                    }
                }
        }, this);

    }
    //verifica o minimo de caracteres
    minlenght(input, minValue){
        let inputLenght = input.value.lenght;

        let errorMessage = `O campo precisa ter oo minimo ${minValue} caracteres`;
        if(inputLenght < minValue){
            this.printMessage(input, errorMessage)
        }

    }

    printMessage(input, msg){
        let template = document.querySelector('.error_validation').cloneNode(true);
        template.textContent = msg;

        let inputParent = input.parentNode;
        template.classList.remove("template");

        inputParent.appendChild(template);

    }
}

let form = document.getElementById('register-form');
let submit = document.getElementById('btn-submit');

let validator = new Validator();

// evento de envio do form, que valida os inputs
submit.addEventListener('click', function(e) {
  e.preventDefault();

  validator.validate(form);
});

