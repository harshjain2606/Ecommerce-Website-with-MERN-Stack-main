import React from 'react'

const About = ({setPage}) => {
    setPage("About")
  return (
    <>
        <section id="hero2" class="about-header">
            <h2>#Know us</h2>
            <p>Lorem ipsum dolor sit amet consectetur</p>
        </section>
            
        <section id="about-head" class="section-p1">
            <img src="./images/about/about.jpg" alt=""/>
            <div>
                <h2>Who We Are?</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id eum beatae tempore inventore assumenda. Harum cum ipsum rerum illo odit repudiandae nobis totam quae modi consectetur est pariatur, veniam adipisci deserunt nisi cumque quaerat quidem! Voluptas tempore quibusdam iste similique fugiat earum molestias maxime vel. Adipisci nam aspernatur sit quasi!</p>
                <abbr title="">Create stunning images with as much or as little control as you like thanks to a choice of basic and creative modes.</abbr>
                <br/><br/>
                <marquee bgcolor="#ccc" loop="-1" scrollamount="5" width="100%">Create stunning images with as much or as little control as you like thanks to a choice of basic and creative modes.</marquee>           
            </div>
        </section>  
        <div id="feature" class="section-p">
            <div class="fe-box">
                <img src="./images/features/f1.png" alt=""/>
                <h6>Free Shipping</h6>
            </div>
            <div class="fe-box">
                <img src="./images/features/f2.png" alt=""/>
                <h6>Online order</h6>
            </div>
            <div class="fe-box">
                <img src="./images/features/f3.png" alt=""/>
                <h6>Save Money</h6>
            </div>
            <div class="fe-box">
                <img src="./images/features/f4.png" alt=""/>
                <h6>Promotion</h6>
            </div>
            <div class="fe-box">
                <img src="./images/features/f5.png" alt=""/>
                <h6>Happy Sell</h6>
            </div>
            <div class="fe-box">
                <img src="./images/features/f6.png" alt=""/>
                <h6>24/7 Support</h6>
            </div>
            
        </div>
    </> 
    )
}

export default About