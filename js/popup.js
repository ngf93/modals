// open modal by id
function openModal(id) {
    document.getElementById(id).classList.add('open');
    document.body.classList.add('customPopup-open');
}

// close currently open modal
function closeModal(id) {
    document.getElementById(id).classList.remove('open');
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

/* tabs */
function tabChange(btn) {
  Array.from(document.querySelectorAll('.tab-btn')).map(el=>
    el.classList.remove('active')
  );
  Array.from(document.querySelectorAll('.tab-content')).map(el=>
    el.classList.add('d-none')
  );

  btn.classList.add('active');
  document.getElementById(btn.dataset.tab).classList.remove('d-none');
}

/*validation*/
function verifyInput(inp){
  let formValidated = inp.closest('form');
  let requiredElems = Array.from(formValidated.querySelectorAll('[required]'));
  console.log(requiredElems.length);

  if(requiredElems.length == 0){
    return;
  } else {
    let flag = requiredElems.every(notNull);

    if (flag){
      console.log('все поля заполнены');
      formValidated.querySelector('.verifiable-btn').removeAttribute('disabled');
    } else {
      console.log('есть не заполненые поля');
      formValidated.querySelector('.verifiable-btn').setAttribute('disabled', 'disabled');
    }
  }

  function notNull(element) {
    if(element.type == 'radio' || element.type == 'checkbox'){
      let name = element.name;
      console.log(name);
      let arrBtns = Array.from(formValidated.querySelectorAll('input[name="'+name+'"]'));
      console.log(arrBtns.some(isChecked));
      if(arrBtns.some(isChecked)){return element;}
    } else if(element.value.trim() != ''){return element;}
  }

  function isChecked(el){
    console.log('value = '+el.value.trim());
    if(el.checked && el.value.trim() != ''){
      return el;
    }
  }
}