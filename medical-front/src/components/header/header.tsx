import './header.scss';
import { useNavigate } from 'react-router';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation()

  const token = localStorage.getItem('access')

  return (
    <div className='header'>
      <div className='header-inner'>
        <Link to="/">
          Medical
        </Link>
        {!!token ? <></> : (
          <div>
            {
              location.pathname === '/login' ? <></> : <button className='btn btn-sm btn-outline-primary' onClick={() => navigate('/login')}>Войти</button>
            }
            {
              location.pathname === '/signup' ? <></> : <button className='btn btn-sm btn-primary' onClick={() => navigate('/signup')} style={{ marginLeft: 12 }}>Зарегистрироваться</button>
            }
          </div>
        )
        }
      </div>
    </div>
  );
}
