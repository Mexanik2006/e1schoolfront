import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../../api/Api'; // Axios API requests
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"; // Firebase storage imports
import { storage } from '../../../firebase/Firebase'; // Import Firebase storage instance
import "./teachershows.css";
import Navbar from '../../../components/Navbar/Navbar';
import { Button } from 'antd';

function Teachers_show() {
    const { id } = useParams();
    // const navigate = useNavigate();
    const [newsDate, setNewsDate] = useState([]);
    const [newsData, setNewsData] = useState({ teachername: '', imgUrl: '', createdAt: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null); // To store the selected file

    useEffect(() => {
        const fetchNewsData = async () => {
            setIsLoading(true);
            try {
                // Make API request to fetch data by id
                const response = await axios.get(`/teacher/get`);
                setNewsDate(response.data.find(us => us._id === id));
            } catch (error) {
                console.error("Error fetching news:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchNewsData();
    }, [id]); // Fetch data when id changes

    useEffect(() => {
        const fetchNewsData = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`/teacher/get`);
                const fetchedData = response.data.find(us => us._id === id);
                if (fetchedData) {
                    setNewsData(fetchedData);
                }
            } catch (error) {
                console.error("Error fetching news:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchNewsData();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewsData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]); // Store the selected file
    };

    const handleUpdate = async () => {
        setIsLoading(true);
        try {
            // Rasm yuklangan bo'lsa, uni Firebase'ga yuklab, URL'ni olamiz
            if (selectedFile) {
                const storageRef = ref(storage, `images/${selectedFile.name}`);
                const uploadTask = uploadBytesResumable(storageRef, selectedFile);

                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        // You can track the upload progress here if needed
                    },
                    (error) => {
                        console.error("Error uploading file:", error);
                    },
                    async () => {
                        // Yuklash tugagach URL'ni olamiz
                        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                        setNewsData((prevData) => ({
                            ...prevData,
                            imgUrl: downloadURL, // Rasm URL'sini yangilash
                        }));

                        // Yangilangan ma'lumotlar bilan PUT so'rovi
                        await axios.put(`/teacher/update/${id}`, {
                            ...newsData,
                            imgUrl: downloadURL, // Firebase'dan olingan URL'ni PUT so'roviga jo'natamiz
                        });

                        alert("O'qituvchi muvaffaqiyatli yangilandi");
                        setSelectedFile(null); // Reset the file input
                    }
                );
            } else {
                // Agar fayl tanlanmagan bo'lsa, boshqa ma'lumotlarni yangilash
                await axios.put(`/teacher/update/${id}`, newsData);
                alert("Yangilik muvaffaqiyatli yangilandi");
            }
            // setIsEditing(false); // Exit edit mode after successful update
        } catch (error) {
            console.error("Error updating news:", error);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="news-show-container">
            <Navbar />

            {isLoading ? (
                <div className="new_show_loader">
                    <div className="loaderRotatingLinesendnews">
                        <div className="download-spinner-container">
                            {/* Centralized spinner */}
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
                <div className='new_show'>
                    <div className="new_show_change">
                        <div className="new_show_top_change">
                            <img src={newsData.imgUrl} alt={newsData.title} />
                            {/* Input field to select a new file */}
                        </div>
                        <div className="new_show_image_change">
                            <label htmlFor="">Rasmni almashtirish uchun: </label>
                            <input type="file" onChange={handleFileChange} />
                        </div>
                        <div className="new_show_conter_update">
                            <label htmlFor="">O'qituvchi ismini almashtirish: </label>
                            <input type="text"
                                name="teachername"
                                value={newsData.teachername}
                                onChange={handleInputChange}
                                className='input_news'
                            />
                        </div>
                        <div className="button_group_news">
                            <Button type='primary' onClick={handleUpdate}>Yangilash</Button>
                        </div>
                        <div className="news_show_time">
                            <span>O'zgartirilgan vaqti: <span className='time_show'>{new Date(newsData.updatedAt).toLocaleDateString()}</span></span>
                        </div>
                    </div>



                    <div className="new_show_update">
                        <div className="new_show_top">
                            <div className="">
                                <img src={newsDate.imgUrl} alt="" />
                            </div>
                        </div>
                        <div className="new_show_conter">
                            <h1>{newsDate.teachername}</h1>
                        </div>
                        <div className="news_show_time">
                            <span>Yuklangan vaqti: <span className='time_show'>{new Date(newsData.createdAt).toLocaleDateString()}</span></span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Teachers_show;