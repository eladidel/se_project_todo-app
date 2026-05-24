class FormValidator {
  constructor(data, selector) {
    this._data = data;
    this._todoTemplate = document.querySelector(selector);
  }
}

export default FormValidator;
