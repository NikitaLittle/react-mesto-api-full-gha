import { useState } from 'react';

function Login({ onSubmit }) {
  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
  });

  function handleChange(evt) {
    const { name, value } = evt.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onSubmit(formValue.email, formValue.password);
  }

  return (
    <>
      <section className='authorization'>
        <form className='authorization__form' onSubmit={handleSubmit}>
          <fieldset className='popup__info'>
            <legend className='popup__title authorization__title'>Вход</legend>
            <div className='popup__inputs-container'>
              <div className='popup__input-error-container'>
                <input
                  className='authorization__input authorization__input_field_name'
                  id='popup-input-name'
                  type='email'
                  name='email'
                  value={formValue.email}
                  onChange={handleChange}
                  placeholder='Email'
                  minLength={2}
                  maxLength={40}
                  required=''
                />
                <span className='popup__input-error popup-input-email-error' />
              </div>
              <div className='popup__input-error-container'>
                <input
                  className='authorization__input authorization__input_field_description'
                  id='popup-input-description'
                  type='password'
                  name='password'
                  value={formValue.password}
                  onChange={handleChange}
                  placeholder='Пароль'
                  minLength={2}
                  maxLength={200}
                  required=''
                />
                <span className='popup__input-error popup-input-password-error' />
              </div>
            </div>
          </fieldset>
          <button className='authorization__submit-button' type='submit' onSubmit={handleSubmit}>
            Войти
          </button>
        </form>
      </section>
    </>
  );
}

export default Login;
