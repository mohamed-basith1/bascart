import React from 'react'
import './Slider.css'
import Carousel from 'react-bootstrap/Carousel'
import 'bootstrap/dist/css/bootstrap.min.css'

const Slider = () => {
  return (
    <div className="slider">
      <Carousel className="mainslider">
        <Carousel.Item interval={500} className="carouselitems">
          <img className="d-block w-100" src="banner1.jpg" alt="First slide" />
        </Carousel.Item>
        <Carousel.Item interval={500} className="carouselitems">
          <img className="d-block w-100" src="banner2.jpg" alt="Second slide" />
        </Carousel.Item>
        <Carousel.Item className="carouselitems">
          <img className="d-block w-100" src="banner3.jpg" alt="Third slide" />
        </Carousel.Item>
      </Carousel>
    </div>
  )
}

export default Slider
