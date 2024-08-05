// open modal by id
function openModal(id) {
    document.getElementById(id).classList.add('open');
    document.body.classList.add('customPopup-open');
}

// close currently open modal
function closeModal() {
    document.querySelector('.customPopup.open').classList.remove('open');
    document.body.classList.remove('customPopup-open');
}

window.addEventListener('load', function() {
    // close modals on background click
    document.addEventListener('click', event => {
        if (event.target.classList.contains('customPopup')) {
            closeModal();
        }
    });
});


/* password button state change */
function changePassVisibility(input) {
    input.type == 'password' ? input.type = 'text' : input.type = 'password';
}


class FormValidator {
    constructor(form, fields) {
      this.form = form
      this.fields = fields
    }
  
    initialize() {
      this.validateOnEntry()
      this.validateOnSubmit()
      this.validateButtonSubmit()
    }
  
    validateOnSubmit() {
      let self = this
  
      this.form.addEventListener('submit', e => {
          e.preventDefault()
          self.fields.forEach(field => {
          const input = document.querySelector(`#${field}`)
          self.validateFields(input)
        })
      })
    }
  
    validateOnEntry() {
        let self = this
        this.fields.forEach(field => {
            const input = document.querySelector(`#${field}`)
    
            input.addEventListener('input', event => {
            self.validateFields(input)
            })
        })
    }
  
    validateFields(field) {
  
      // Check presence of values
      if (field.value.trim() === "") {
        this.setStatus(field, `${field.previousElementSibling.innerText} Введите данные`, "error")
      } else {
        this.setStatus(field, null, "success")
      }
  
      // check for a valid email address
      if (field.type === "email") {
        const re = /\S+@\S+\.\S+/
        if (re.test(field.value)) {
          this.setStatus(field, null, "success")
        } else {
          this.setStatus(field, "Введите данные", "error")
        }
      }
  
      // Password confirmation edge case
      if (field.id === "password_confirmation") {
        const passwordField = this.form.querySelector('#password')
  
        if (field.value.trim() == "") {
          this.setStatus(field, "Введите данные", "error")
        } else if (field.value != passwordField.value) {
          this.setStatus(field, "Пароли не совпадают", "error")
        } else {
          this.setStatus(field, null, "success")
        }
      }
    }
  
    setStatus(field, message, status) {
      const errorMessage = field.parentElement.querySelector('.error-message')
  
      if (status === "success") {
        if (errorMessage) { errorMessage.innerText = "" }
        field.classList.remove('input-error')
      }
  
      if (status === "error") {
        field.closest('.inputGroup').querySelector('.error-message').innerText = message
        field.classList.add('input-error')
      }
    }

    validateButtonSubmit() {
        let flag = this.fields.every(field.status == "success");
        if (flag){
            this.form.querySelector('.btn-submit').removeAttribute('disabled');
        } else {
            this.form.querySelector('.btn-submit').setAttribute('disabled', 'disabled');
        }
    }
}
  
const form = document.querySelector('.form')
const fields = ["email", "password"]

const validator = new FormValidator(form, fields)
validator.initialize();