import React, { useState } from "react";

import { Button } from "./index";


export const normalizeInput = (value: string, previousValue: string): string => {
  if (!value || typeof value !== 'string') return value;

  const currentValue = value.replace(/[^\d]/g, '');
  const cvLength = currentValue.length;

  if (!previousValue || (value.length > previousValue.length)) {
    if (cvLength < 4) return currentValue;
    if (cvLength < 7) return `(${ currentValue.slice(0, 3) }) ${ currentValue.slice(3) }`;

    return `(${ currentValue.slice(0, 3) }) ${ currentValue.slice(3, 6) }-${ currentValue.slice(6, 10) }`;
  }

  return currentValue;
};

const validateInput = (value: string): string => {
  if (!value) return "Введите свой телефон"
  if (value.length !== 14) return "Не верный формат ввода: (555) 555-5555";

  return "";
};


interface IFormOrderPopup {
  myRef: React.LegacyRef<HTMLDivElement>,
  isVisibleForm: boolean,
  onVisibleForm: () => void,
  setPhoneOrder: (phone: string) => void
}


const FormOrderPopup = React.memo((props: IFormOrderPopup) => {
  const { myRef, isVisibleForm, onVisibleForm, setPhoneOrder } = props;

  const [ phone, setPhone ] = useState("");
  const [ error, setError ] = useState("");



  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value: string = event.target.value;

    setPhone(normalizeInput(value, phone));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const errorInput = validateInput(phone);

    setError(errorInput);

    if(!errorInput) {
      setPhoneOrder(phone);
      onVisibleForm();
      handleReset();
    }
  }

  const handleReset = () => {
    setPhone("");
    setError("");
  };


  return(
    <div
      ref={ myRef }
      className={ "form-order " + ((isVisibleForm) ? "" : "form-order__hide") }
    >
      <span data-testid="close-window-button" className="form-order--close" onClick={ () => onVisibleForm() }>×</span>
      <form className="form-order--form" onSubmit={ handleSubmit }>
          <p className="form-order--label">Для заказа: введите свой телефон и мы вам перезвоним</p>
          <input
            className="form-order--input"
            type="text"
            name="phone"
            min={ 10 }
            max={ 10 }
            placeholder="(xxx) xxx-xxxx"
            value={ phone }
            onChange={ handleChange }
          />
          { error && <p data-testid="error-message-window" className="form-order--error">{ error }</p> }

        <div className="form-order--btn-container">
          <Button onClick={ handleReset }>Сбросить</Button>
          <Button className="form-order--primary">Отправить</Button>
        </div>
      </form>
    </div>
  );
})



export default FormOrderPopup;
