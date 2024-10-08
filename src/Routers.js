import App from './App'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PageAbout from './pages/About/PageAbout';
import NewsPage from './pages/News/NewsPage';
import TeacherPage from './pages/Teacher/TeacherPage';
import Contact from './pages/contact/Contact';
import Newsshow from './pages/News/shows/News_show';
import News from './pages/News/upload/News';
import Teacher from './pages/Teacher/upload/Teachers';
import Teachersshow from './pages/Teacher/edit/Teachers_show';
function Routers() {

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<App />} />
                    <Route path='/about-page' element={<PageAbout />} />
                    <Route path='/news-page' element={<NewsPage />} />
                    <Route path='/upload-news' element={<News />} />
                    <Route path='/upload-teacher' element={<Teacher />} />
                    <Route path='news-shows/:id' element={<Newsshow />} />
                    <Route path='teachers-shows/:id' element={<Teachersshow />} />
                    <Route path='/teacher-page' element={<TeacherPage />} />
                    <Route path='/contact-page' element={<Contact />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default Routers