import React from 'react'
import "./AboutUs.css"
import aboutimg from "../../image/Новая папка/tim-swaan-eOpewngf68w-unsplash.jpg"
import Navbar from '../../components/Navbar/Navbar'
function PageAbout() {
    return (
        <div className='AboutUs'>
            <div className="about_bg">
                <div className="">
                    <Navbar />
                </div>
                <div className="about_bg_title">
                    <h1>Biz haqimmizda sahifasi</h1>
                </div>
            </div>

            <div className="about_main">
                <div className="about_img">
                    <img src={aboutimg} alt="" />
                </div>

                <div className="about_description">
                    <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod atque in id vitae, aspernatur, hic error magnam aliquid est, voluptatum illum maiores voluptas labore ad ratione quisquam dolor omnis impedit quo minus quia fuga quas. Nobis quia similique, autem asperiores consectetur eius error dolore facere, dolores quae corporis sunt soluta voluptas molestias. Dolore earum excepturi quo tempore culpa nesciunt ullam ipsum dicta illum pariatur libero voluptatem quis amet enim aliquid, non, tempora aspernatur reiciendis! Itaque sit quasi unde facere eum perferendis tempora culpa et eos, fugiat impedit optio mollitia praesentium doloremque atque distinctio voluptatem quo. Ea minus rem facere sint eius a corporis necessitatibus! Nulla autem deserunt, consequatur illo deleniti doloribus voluptate inventore corporis repellendus laborum totam a est placeat. Vitae, optio. Amet, exercitationem distinctio. Omnis eveniet, nam cumque praesentium quod nulla earum harum animi dolores optio in provident quidem natus eius ipsam doloribus nisi alias dolore, labore facilis minus temporibus qui accusantium quis. Vitae doloremque laudantium quaerat magnam fugiat reiciendis, possimus repudiandae optio totam, reprehenderit at magni exercitationem, dignissimos quas atque nobis quo cum. Consequatur facilis magni culpa, consectetur sunt quaerat odio fugit debitis, sit molestias nesciunt ducimus ad, sequi dolor esse officia odit est provident quis? Quisquam, mollitia.</h4>
                </div>
            </div>
        </div>
    )
}

export default PageAbout