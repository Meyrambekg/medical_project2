import { useEffect, useState } from 'react';
import { ProfileService } from '../../profile.service';
import './user.scss';
import { useNavigate } from 'react-router';

export default function UserComponent() {
  const [user, setUser] = useState<any>(null)
  const profileService = new ProfileService()
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('access')

    if (!!!token) {
      navigate('/login')
    } else {
      profileService.profile(token).then(u => {
        setUser(u)
      })
    }
  }, [])

  const info: JSX.Element[] | JSX.Element = user ? Object.keys(user).map((item: string, key: any) =>
    <div className='mb-1' key={key}><b>{item}:</b> {user[item]}</div>
  ) : [<></>]

  return user ? (
    <div className='profile'>
      <div className='d-flex flex-column'>
        {info}
      </div>

      <button className='btn btn-danger mt-4' onClick={() => {
        localStorage.removeItem('access')
        localStorage.removeItem('refresh')
        navigate('/login')
      }}>Выйти</button>
    </div>
  ) : <></>;
}
