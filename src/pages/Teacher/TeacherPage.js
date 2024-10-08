import React, { useEffect, useState } from 'react';
import './Teacher.css';
import axios from '../../api/Api';
import Navbar from '../../components/Navbar/Navbar';
import { Link } from 'react-router-dom';
import { FaUpload } from 'react-icons/fa6';
import { Button } from 'antd';

function TeacherPage() {
    const [news, setNews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    console.log(news)


    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get("/teacher/get");
            setNews(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };


    const deleteUser = async (id) => {
        setIsLoading(true);
        try {
            // Optimistically update the UI
            setNews(prevNews => prevNews.filter(newsItem => newsItem._id !== id));

            // Perform delete request
            await axios.delete(`/teacher/delete/${id}`);

            // Fetch the updated data to ensure consistency
            fetchData();
        } catch (error) {
            console.error('Error occurred while deleting user:', error);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div>
            <div className="Teacher_bg">
                <div>
                    <Navbar />
                </div>
                <div className="Teachers_bg_title">
                    <h1>O'qituvchilarni qo'shish va tahrirlash</h1>
                </div>
            </div>

            {isLoading ? (
                <div className="">
                    <div className="loaderRotatingLinesendnews">
                        <div className="download-spinner-container">
                            {/* Single centralized spinner for the whole component */}
                            <div className="spinner-bar-download bar_download1"></div>
                            <div className="spinner-bar-download bar_download2"></div>
                            <div className="spinner-bar-download bar_download3"></div>
                            <div className="spinner-bar-download bar_download4"></div>
                            <div className="spinner-bar-download bar_download5"></div>
                            <div className="spinner-bar-download bar_download6"></div>
                            <div className="spinner-bar-download bar_download7"></div>
                            <div className="spinner-bar-download bar_download8"></div>
                            <div className="spinner-bar-download bar_download9"></div>
                            <div className="spinner-bar-download bar_download10"></div>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <div className="EndNews_swiper_title">
                        <h1>Ustozlar</h1>
                    </div>
                    <div className="teacher_profile">
                        {news.length > 0 ? (
                            news.map((newconnect, index) => (
                                <div className="">
                                    <div className="teacher_card" key={index}>
                                        <div className="teacher_card-img">
                                            <img src={newconnect.imgUrl} alt={newconnect.teachername} />
                                        </div>
                                        <div className="teacher_card-info">
                                            <p className="teacher_card_text-title">{newconnect.teachername}</p>
                                        </div>
                                    </div>
                                    <div className="teachers_btn_all">
                                        <div className="newsswiper_btn">
                                            {/* submission */}
                                            <Link to={`/teachers-shows/${newconnect._id}`}>
                                                <Button type='primary'>Edit</Button>
                                            </Link>
                                        </div>
                                        <div className="newsswiper_btn">
                                            <Button type='primary' danger onClick={() => deleteUser(newconnect._id)}>Delete</Button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No teachers found.</p>
                        )}
                        <Link to={"/upload-teacher"} className='Teacher_swiper_Upload'>
                            <p className="ant-upload-drag-icon">
                                <FaUpload className='and_icons' />
                            </p>
                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                            <p className="ant-upload-hint">
                                Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                                banned files.
                            </p>
                        </Link>
                    </div>

                </div>
            )}
        </div>
    );
}

export default TeacherPage;
