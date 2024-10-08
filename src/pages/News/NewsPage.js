import React, { useEffect, useState } from 'react';
import "./EndNews.css";
import { Button, Image } from 'antd';
import axios from '../../api/Api';
import { Link } from 'react-router-dom'; // useNavigate import qilingan
import 'react-loading-skeleton/dist/skeleton.css'; // Ensure Skeleton CSS is imported
import Navbar from '../../components/Navbar/Navbar';
import { FaUpload } from 'react-icons/fa6';

function NewsPage() {
    const [news, setNews] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.get("/addnew/get");
            setNews(response.data);
        } catch (error) {
            console.log(error);
            setError("Failed to load news.");
        } finally {
            setIsLoading(false);
        }
    };

    // const deleteUser = async (id) => {
    //     setIsLoading(true);
    //     try {
    //         await axios.delete(`/client/delete/${id}`);
    //         fetchData(); // Refresh the data after deleting a user
    //     } catch (error) {
    //         console.error('Error occurred while deleting user:', error);
    //     }
    //     setIsLoading(false);
    // };

    const deleteUser = async (id) => {
        setIsLoading(true);
        try {
            // Optimistically update the UI
            setNews(prevNews => prevNews.filter(newsItem => newsItem._id !== id));

            // Perform delete request
            await axios.delete(`/addnew/delete/${id}`);

            // Fetch the updated data to ensure consistency
            fetchData();
        } catch (error) {
            console.error('Error occurred while deleting user:', error);
            setError("Failed to delete the news item.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='EndNews'>
            <Navbar />
            <div className="EndNews_bg">
                <div className="EndNews_bg_title">
                    <h1>Yangiliklarni qo'shish va tahrirlash</h1>
                </div>
            </div>

            {isLoading ? (
                <div className="loaderRotatingLinesendnews">
                    <div className="download-spinner-container">
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
            ) : error ? (
                <div className="error-message">
                    <p>{error}</p>
                </div>
            ) : Array.isArray(news) && news.length === 0 ? (
                <div className="no-news">
                    <p>Yangiliklar mavjud emas.</p>
                </div>
            ) : (
                <div className="EndNews_swiper">
                    <div className="EndNews_swiper_title">
                        <h1>Yangiliklar</h1>
                    </div>
                    <div className="EndNews_swiper_cards">
                        {Array.isArray(news) && news.map((newconnect, index) => (
                            <div className="EndNews_swiper_card" key={index}>
                                <div>
                                    <Image
                                        src={newconnect.imgUrl}
                                        className="endnewsswiper_img"
                                        width={'100%'}
                                        height={'400px'}
                                        alt={newconnect.title || "No title available"}
                                    />
                                </div>
                                <div className="newsswiper_drop">
                                    <div className="newsswiper_title">
                                        <h3>
                                            <Link to={`/news-shows/${newconnect._id}`}>
                                                {newconnect.title ? newconnect.title.split(' ').slice(0, 5).join(' ') + '...' : "No title available"}
                                            </Link>
                                        </h3>
                                    </div>
                                    <div className="newsswiper_description">
                                        <p>
                                            {newconnect.description ? newconnect.description.split(' ').slice(0, 15).join(' ') + '...' : "No description available"}
                                        </p>
                                    </div>
                                    <div className="news_btn_all">
                                        <div className="newsswiper_btn">
                                            <Link to={`/news-shows/${newconnect._id}`}>
                                                <Button type='primary'>Edit</Button>
                                            </Link>
                                        </div>
                                        <div className="newsswiper_btn">
                                            <Button type='primary' danger onClick={() => deleteUser(newconnect._id)}>Delete</Button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        ))}
                        <Link to={"/upload-news"} className='EndNews_swiper_Upload'>
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

export default NewsPage;
