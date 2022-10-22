import { FormEvent, useState } from 'react';
import './login.scss';
import InputMask from 'react-input-mask';
import { ProfileService } from '../../profile.service';
import { Link } from 'react-router-dom';
import MessageModal from '../modal/modal';
import { useNavigate } from 'react-router';


export default function LoginComponent(prop: { message?: string }) {
  const [modalShow, setModalShow] = useState(false)
  const [errors, setErrors] = useState<string[]>([])

  // for form
  const [iin, setIIN] = useState('')
  const [password, setPassword] = useState('')

  const profileService = new ProfileService()
  const navigate = useNavigate()

  const handleSubmit = (event: FormEvent) => {
    if (password && iin && !iin.includes('_')) {
      const payload = {
        iin, password
      }
      profileService.login(payload).then(res => {
        setModalShow(true)
        console.log(res)
        localStorage.setItem('access', res.access)
        localStorage.setItem('refresh', res.refresh)
      }).catch(err => {
        const data = err.response.data
        setErrors(Object.keys(data).map(function (key) { return data[key]; }))
        setModalShow(true)
      })
    }
    event.preventDefault();
  }

  return (
    <div className='form-wrapper'>
      <h3>Логин</h3>
      <form onSubmit={(e) => handleSubmit(e)}>

        <div>
          <h5>ИИН:</h5>
          <InputMask className='form-input' value={iin} onChange={e => setIIN(e.target.value)} placeholder='Введите ИИН' mask="999999999999"></InputMask>
        </div>

        <div>
          <h5>Пароль:</h5>
          <input className='form-input' value={password} onChange={e => setPassword(e.target.value)} placeholder='Пароль' type="password" />
        </div>

        <button disabled={!(password && iin && !iin.includes('_'))} className='btn btn-outline-primary' onClick={(e) => handleSubmit(e)}>Войти</button>
        <Link to='/signup' className='router'>Зарегистрироваться</Link>
      </form>

      <MessageModal
        show={modalShow}
        errors={errors}
        message={"Вы удачно зашли на свой аккаунт"}
        onHide={() => {
          setModalShow(false);
          if (errors.length > 0) {
            setErrors([])
          } else {
            navigate('/profile')
          }
        }}
      />
    </div>
  );
}
