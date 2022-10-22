import { FormEvent, useState } from 'react';
import { ProfileService } from '../../profile.service';
import InputMask from 'react-input-mask';
import { Link } from 'react-router-dom';
import moment from 'moment';
import './register.scss';
import MessageModal from '../modal/modal';
import { useNavigate } from 'react-router';

export default function RegisterComponent(prop: { message?: string }) {
  const [modalShow, setModalShow] = useState(false)
  const [errors, setErrors] = useState<string[]>([])

  // for form
  const [iin, setIIN] = useState('')
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [birthDate, setBirthDate] = useState<Date | undefined>(undefined)
  const [phone, setPhone] = useState('')
  const [userType, setUserType] = useState(0)
  const [password, setPassword] = useState('')
  const [rePassword, setRePassword] = useState('')

  const profileService = new ProfileService()
  const navigate = useNavigate()

  const handleSubmit = (event: FormEvent) => {
    if (formReady) {
      const payload = {
        iin: iin.replace(" ", ""),
        name: name,
        surname: surname,
        birth_date: moment(birthDate).format('yyyy-MM-DD'),
        phone: phone,
        user_type: userType,
        password: password,
        re_password: rePassword
      }
      profileService.signup(payload).then(res => {
        setModalShow(true)
      }).catch(err => {
        const data = err.response.data
        setErrors(Object.keys(data).map(function (key) { return data[key]; }))
        setModalShow(true)
      })
    }
    event.preventDefault();
  }

  const formReady = (password === rePassword) && password && rePassword && iin && !iin.includes('_') && name && surname && phone && !phone.includes('_') && birthDate

  return (
    <div className='form-wrapper'>
      <h3>Регистрация</h3>

      <div className='user-type mt-3'>
        <button className={`btn ${userType === 0 ? 'selected' : ''}`} onClick={() => setUserType(0)}>Пользователь</button>
        <button className={`btn ${userType === 1 ? 'selected' : ''}`} onClick={() => setUserType(1)}>Доктор</button>
      </div>

      <form onSubmit={(e) => handleSubmit(e)}>

        <div>
          <h5>ИИН:</h5>
          <InputMask className='form-input' value={iin} onChange={e => setIIN(e.target.value)} placeholder='Введите ИИН' mask="999999999999"></InputMask>
        </div>

        <div>
          <h5>Имя:</h5>
          <input type="text" className='form-input' value={name} onChange={e => setName(e.target.value)} placeholder='Введите имя' />
        </div>

        <div>
          <h5>Фамилия:</h5>
          <input type="text" className='form-input' value={surname} onChange={e => setSurname(e.target.value)} placeholder='Введите фамилию' />
        </div>

        <div>
          <h5>Дата рождения:</h5>
          <input className='form-input' type="date" value={birthDate ? moment(birthDate).format('yyyy-MM-DD') : undefined} onChange={e => setBirthDate(new Date(e.target.value))} />
        </div>

        <div>
          <h5>Телефон:</h5>
          <InputMask className='form-input' value={phone} onChange={e => setPhone(e.target.value)} placeholder='Введите телефон' mask="+7 (799)-999-99-99"></InputMask>
        </div>

        <div>
          <h5>Пароль:</h5>
          <input className='form-input' value={password} onChange={e => setPassword(e.target.value)} placeholder='Пароль' type="password" />
        </div>

        <div>
          <h5>Повторите пароль:</h5>
          <input className='form-input' value={rePassword} onChange={e => setRePassword(e.target.value)} placeholder='Пароль' type="password" />
        </div>

        <button disabled={!formReady} className='btn btn-outline-primary' onClick={(e) => handleSubmit(e)}>Зарегистрироваться</button>
        <Link to='/login' className='router'>Войти</Link>
      </form>
      <MessageModal
        show={modalShow}
        errors={errors}
        message={"Вы успешно зарегестрированы"}
        onHide={() => {
          setModalShow(false);
          if (errors.length > 0) {
            setErrors([])
          } else {
            navigate('/login')
          }
        }}
      />
    </div>
  );
}
