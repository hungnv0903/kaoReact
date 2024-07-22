import { Fragment } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import FormSearchFlight from '../components/FormSearchFlight';
import Styles from './index.module.css';

const Header = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 0,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 8000,
    arrows:true ,
    pauseOnHover: false,
  };
  return (
    <Fragment>
      <div className={Styles.header}>
        <div className="slider-container w-full h-full  hidden md:block">
          <Slider {...settings} >
              <img src="../../src/assets/slider-image-1.jpg" alt="" className='w-full' />
              <img src="../../src/assets/slider-image-2.jpg" alt="" className='w-full' />
              <img src="../../src/assets/slider-image-3.jpg" alt="" className='w-full' />
          </Slider>
        </div>
        <div className='absolute top-0 h-full w-full flex justify-center'>
          <FormSearchFlight></FormSearchFlight>
        </div>
      </div>
    </Fragment>
  )
}

export default Header
