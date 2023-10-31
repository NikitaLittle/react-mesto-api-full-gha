import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import logo from '../images/logo.svg';

function Header({ email }) {
  const navigate = useNavigate();

  function signOut() {
    localStorage.removeItem('jwt');
    navigate('/sign-in');
  }

  return (
    <header className='header'>
      <img className='header__image' src={logo} alt='Mesto. Логотип.' />
      <Routes>
        <Route
          path='/'
          element={
            <div className='header__email-container'>
              <p className='header__email'>{email}</p>
              <button type='button' className='header__exit-button' onClick={signOut}>
                Выход
              </button>
            </div>
          }
        />
        <Route
          path='/sign-in'
          element={
            <Link className='header__link' to='/sign-up'>
              Регистрация
            </Link>
          }
        />
        <Route
          path='/sign-up'
          element={
            <Link className='header__link' to='/sing-in'>
              Войти
            </Link>
          }
        />
      </Routes>
    </header>
  );
}

export default Header;
