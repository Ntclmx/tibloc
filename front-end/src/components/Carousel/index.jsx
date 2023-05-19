import React from "react";
import Carousel from 'react-bootstrap/Carousel';
import CarouselImage1 from '../../assets/carousel/1.png';
import CarouselImage2 from '../../assets/carousel/Home2.png';
import CarouselImage3 from '../../assets/carousel/Home3.png';
import './carousel.css'
// function checkIndex(banner){
//   if(banner.index === 1){
//     return (
//       <div class="carousel-item active">
//           <img src={banner.src} class="d-block w-50 h-50" alt={banner.alt} />
//         </div>
//     );
//   }else{
//     return(
//     <div class="carousel-item">
//           <img src={banner.src} class="d-block w-80 h-50" alt={banner.alt} />
//         </div>
//     );
//   }
// }

const CarouselTibloc = () => {

  return (
    <Carousel className="main-carousel">
      <Carousel.Item>
        <img
          className="d-block carousel-image"
          src={CarouselImage1}
          alt="First slide"
        />
        <Carousel.Caption>
          {/* <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block carousel-image"
          src={CarouselImage1}
          alt="Second slide"
        />

        <Carousel.Caption>
          {/* <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block carousel-image"
          src={CarouselImage1}
          alt="Third slide"
        />

        <Carousel.Caption>
          {/* <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p> */}
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default CarouselTibloc;