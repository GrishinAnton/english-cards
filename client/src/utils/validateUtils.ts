export const validateEmail = (email: string): boolean => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export interface ValidatySchema {
    isValid: (value:string, preValue?:string) => boolean
    invalidityMessage: string
}

export class CheckValidity {
    form: any
    validitySchema: any
    inputNode: any
    validityChecks: any
    validInputClass: string
    invalidInputClass: string
    successMessageClass: string
    errorMessageClass: string
    successMessage: string
    validityResult: boolean[]
    bind: any

    constructor(form: any, validitySchema: any) {
        this.form = form
        this.validitySchema = validitySchema
        this.inputNode = null
        this.validityChecks = null
        this.validInputClass = 'is-valid'
        this.invalidInputClass = 'is-invalid'
        this.errorMessageClass = 'invalid-feedback'
        this.successMessageClass = 'valid-feedback'
        this.successMessage = 'Выглядит супер!'
        this.validityResult = []
        this.bind = null
    }

    //Создаем любой элемент с классом и текстом
    createElement(cssClass: string, message: string):HTMLDivElement {
        let div = document.createElement('div')
        div.classList.add(cssClass)
        div.textContent = message
        return div
    }
    //Удаляем любые элементы по классу
    removeAllElements(cssClass: string) {
        let elements = this.inputNode && this.inputNode.parentElement.querySelectorAll(`.${cssClass}`)
        if (elements) {
            for (let i = elements.length - 1; i >= 0; i--) {
                elements[i].parentNode.removeChild(elements[i]);
            }
        }
    }
    resetAllValidation(){
        this.removeAllElements(this.errorMessageClass)
        this.removeAllElements(this.successMessageClass)
        this.inputNode.classList.remove(this.validInputClass)
        this.inputNode.classList.remove(this.invalidInputClass)
    }
    //Проверяет валидность
    checkValidity():boolean {
        let isValid: boolean = true
        this.resetAllValidation()

        for (let i = 0; i < this.validityChecks.length; i++) {
            //Проверяем на невалидность, если есть, ставим флаг
            if (!this.validityChecks[i].isValid(this.inputNode.value, this.bind)) {
                this.inputNode.classList.add(this.invalidInputClass)
                this.inputNode.parentElement.append(this.createElement(this.errorMessageClass, this.validityChecks[i].invalidityMessage))
                isValid = false
            }
        }

        //Если ничего не нашли невалидного, то удаляем все невалидное и добавляем валид
        if (isValid) {
            this.inputNode.classList.add(this.validInputClass)
            this.inputNode.parentElement.append(this.createElement(this.successMessageClass, this.successMessage))
        }

        return isValid
    }
    //Запускаем валидацию и собираем ее результат в массив, потом возвращает true или false
    valid():boolean {
        if(this.form.elements.length){
            for (let i = 0; i < this.form.elements.length; i++) {
                if (this.form.elements[i].tagName === "INPUT" && this.form.elements[i].dataset.validity) {
                    let validityType = this.form.elements[i].dataset.validity
                    if (this.form.elements[i].dataset.bind) this.bind = this.form.elements[i].value

                    this.inputNode = this.form.elements[i]
                    this.validityChecks = this.validitySchema[validityType]

                    const isValid:boolean = this.checkValidity()
                    this.validityResult.push(isValid)
                }
            }
        }

        return this.validityResult.every(valid => valid)
    }
}