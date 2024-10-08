import axios from '../../../api/Api';
import React, { useEffect, useState } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../../firebase/Firebase";
import "./AdminUploads.css";

function News() {
    const [img, setImg] = useState(undefined);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imgPerc, setImgPerc] = useState(0);
    const [inputs, setInputs] = useState({});
    const [imgUploaded, setImgUploaded] = useState(false); // Image upload state
    const [errorMsg, setErrorMsg] = useState(''); // Error message
    const [successMsg, setSuccessMsg] = useState(''); // Success message

    useEffect(() => {
        img && uploadFile(img);
    }, [img]);

    const uploadFile = (file) => {
        const storage = getStorage(app);
        const folder = "images/";
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, folder + fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setImgPerc(Math.round(progress));
                setSuccessMsg(`Rasm yuklanmoqda: ${Math.round(progress)}%`);
                console.log('Upload is ' + progress + '% done');
            },
            (error) => {
                console.error("Upload failed:", error);
                setErrorMsg("Rasm yuklashda xatolik yuz berdi.");
                setSuccessMsg(''); // Clear success message if there's an error
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setInputs((prev) => ({
                        ...prev,
                        imgUrl: downloadURL // Set the image URL in the inputs
                    }));
                    setImgUploaded(true); // Image successfully uploaded
                    setImgPerc(0); // Reset progress
                    setSuccessMsg("Rasm muvaffaqiyatli yuklandi."); // Success message
                    setErrorMsg(''); // Clear error message
                });
            }
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg(''); // Clear previous error message
        setSuccessMsg(''); // Clear previous success message

        // Check if the image has been uploaded
        if (!imgUploaded) {
            setErrorMsg('Rasm hali yuklanmadi. Iltimos, yuklanishini kuting.');
            return; // Prevent form submission
        }

        try {
            // Include title and description in the inputs
            await axios.post(`/addnew/create`, { ...inputs, title, description });
            setSuccessMsg('Yangi malumot yuklandi.'); // Confirmation message
            // Optionally reset form fields after submission
            setImg(undefined);
            setTitle('');
            setDescription('');
            setImgUploaded(false); // Reset the uploaded state
        } catch (error) {
            console.error(error);
            setErrorMsg('Yuborishda xatolik yuz berdi.');
        }
    };

    return (
        <div className="news_body">
            <div className='admin_news'>
                <form onSubmit={handleSubmit}>
                    <div className="">
                        <div className="admin_news_title">
                            <h1>Upload News:</h1>
                        </div>
                        <div>
                            <label htmlFor="img" className='label'>Upload new's image:</label> {imgPerc > 0 && `Uploading: ${imgPerc}%`}
                            <br />
                            <input
                                type="file"
                                accept="image/*"
                                id="img"
                                onChange={(e) => {
                                    setImg(e.target.files[0]);
                                    setImgUploaded(false); // Reset the upload state when a new file is selected
                                    setSuccessMsg('Rasm yuklanmoqda...');
                                    setErrorMsg(''); // Clear error message on new image selection
                                }}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="title" className='label'>Title:</label>
                            <br />
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => {
                                    setTitle(e.target.value);
                                    setInputs((prev) => ({ ...prev, title: e.target.value })); // Update inputs state
                                }}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="description" className='label'>Description:</label>
                            <br />
                            <input
                                type="text"
                                id="description"
                                value={description}
                                onChange={(e) => {
                                    setDescription(e.target.value);
                                    setInputs((prev) => ({ ...prev, description: e.target.value })); // Update inputs state
                                }}
                                required
                            />
                        </div>
                        <br />
                        <button
                            type="submit"
                            className='admin_btn'
                            disabled={!imgUploaded}  // Disable button if image not uploaded
                            style={{ cursor: imgUploaded ? 'pointer' : 'no-drop' }} // Change cursor based on upload status
                        >
                            Upload
                        </button>
                        {/* Display success and error messages */}
                        {errorMsg && <p className="admin_error">{errorMsg}</p>}
                        {successMsg && <p className="success_message">{successMsg}</p>}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default News;
