import './App.scss';
import Header from './components/header/header';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import BannerComponent from './components/banner/banner';
import LoginComponent from './components/login/login';
import RegisterComponent from './components/register/register';
import UserComponent from './components/user/user';
import ArticleListComponent from './components/articles/articles';
import ArticleDetailComponent from './components/article/article';
import { useEffect, useState } from 'react';
import { ProfileService } from './profile.service';

export default function App() {
  const profileService = new ProfileService()

  const [user, setUser] = useState()

  useEffect(() => {
    const token = localStorage.getItem('access')
    if (!!token) {
      profileService.profile(token).then(user => {
        setUser(user)
      }).catch(err => {
        localStorage.removeItem('access')
        localStorage.removeItem('refresh')
      })
    } else {
      localStorage.removeItem('access')
      localStorage.removeItem('refresh')
    }
  }, [])

  return (
    <BrowserRouter>
      <div className="main">
        <Header />
        <div className='content'>
          <div className='content-inner'>
            <Routes>
              <></>
              <Route path="/" element={<Navigate to="/articles" />} />
              <Route path='/login' element={<LoginComponent />} />
              <Route path='/signup' element={<RegisterComponent />} />
              <Route path='/profile' element={<UserComponent />} />
              <Route path='/articles' element={<ArticleListComponent />} />
              <Route path='/articles/:articleId' element={<ArticleDetailComponent user={user} />} />
              <Route path='*' element={<BannerComponent />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}
