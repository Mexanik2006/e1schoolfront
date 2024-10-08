import React from 'react'
import "./Contact.css"
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram, FaTelegram, FaYoutube } from 'react-icons/fa6';
import Navbar from '../../components/Navbar/Navbar';
import { Link } from 'react-router-dom';

function Contact() {
    return (
        <div className='Contact'>
            <div className="Contact_bg">
                <div className="">
                    <Navbar />
                </div>
                <div className="Contact_bg_title">
                    <h1>Xabarlar</h1>
                </div>
            </div>

            {/* <div className="contact_main">
                <div className="contact_left">
                    <div className="contact_left_title">
                        <h1>Biz bilan bog'lanish uchun</h1>
                    </div>

                    <div className="contact_left_description">
                        <p>1 - maktab bilan bog'liq savollaringiz bormi?
                            Bunday holda, iltimos, bizga xabar qoldiring, bizning mutaxassislarimiz so'rovingizga imkon qadar tezroq javob berishadi.</p>
                    </div>

                    <div className="contact_left_li">
                        <span> Namangan viloyati, Yangiqo'rg'on tumani, Toshkent MFY, Soy bo'yi ko'chasi 1-uy</span>
                    </div>

                    <div className="contact_left_li">
                        <span> +998 (71) 207 90 06</span>
                    </div>

                    <div className="contact_left_li">
                        <span>info@e1maktab.uz</span>
                    </div>

                    <div className="contact_left_li">
                        <span> https://e1school.vercel.app</span>
                    </div>

                    <div className="contact_social_media">
                        <div className="contact_social_media_title">
                            <h3>Bizning ijtimoiy tarmoqlarimmiz</h3>
                        </div>
                        <div className="contact_social_media_icon">
                            <Link><FaFacebookF /></Link>
                            <Link><FaInstagram /></Link>
                            <Link><FaTelegram /></Link>
                            <Link><FaYoutube /></Link>
                        </div>
                    </div>
                </div>
                <div className="contact_right">
                    <div className="contact_left_title">
                        <h1>Xabaringizni yuboring</h1>
                    </div>
                    <form action="">
                        <div className="contact_right_input">
                            <input type="text" placeholder='Sizning to`liq ismingiz' />
                        </div>

                        <div className="contact_right_input">
                            <input type="text" placeholder='Telefon taqamingiz' />
                        </div>

                        <div className="contact_right_input">
                            <input type="email" placeholder='Email pochtangiz' />
                        </div>

                        <div className="contact_right_input">
                            <textarea name="" id="" rows="12" placeholder='Shikoyat yoki taklifingiz bo`lsa yozing'></textarea>
                        </div>

                        <button type='submit' className='contact_right_btn'>Yuborish</button>
                    </form>
                </div>
            </div> */}
        </div>
    )
}

export default Contact