import React from "react";
// import {Carousel} from 'react-bootstrap/carousel'

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
  // const banners = props.banners;
  // const carouselBody = banners.map((banner) => 
  //   checkIndex(banner)
  // )
  return (
    // <div
    //   id="carouselExample"
    //   class="carousel slide"
    // >
    //   <div class="carousel-inner">
    //     {/* {carouselBody} */}
    //     <div class="carousel-item active">
    //       <img src="https://cdn1-production-images-kly.akamaized.net/WtfFC1e1Pitdvxc8iQykfJqDkuA=/640x360/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/3332604/original/036907800_1608786362-WhatsApp_Image_2020-12-24_at_07.58.39.jpeg" class="d-block w-50 h-50" alt="foto1" />
    //     </div>
    //     <div class="carousel-item">
    //       <img src="https://images.bisnis.com/posts/2021/09/29/1448535/kue-subuh-1.jpg" class="d-block w-80 h-50" alt="foto2" />
    //     </div>
    //   </div>
    //   <button
    //     class="carousel-control-prev"
    //     type="button"
    //     data-bs-target="#carouselExample"
    //     data-bs-slide="prev"
    //   >
    //     <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    //     <span class="visually-hidden">Previous</span>
    //   </button>
    //   <button
    //     class="carousel-control-next"
    //     type="button"
    //     data-bs-target="#carouselExample"
    //     data-bs-slide="next"
    //   >
    //     <span class="carousel-control-next-icon" aria-hidden="true"></span>
    //     <span class="visually-hidden">Next</span>
    //   </button>
    // </div>
    <>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
    <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="https://cdn1-production-images-kly.akamaized.net/WtfFC1e1Pitdvxc8iQykfJqDkuA=/640x360/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/3332604/original/036907800_1608786362-WhatsApp_Image_2020-12-24_at_07.58.39.jpeg" class="d-block w-100" alt="..."/>
    </div>
    <div class="carousel-item">
      <img src="https://images.bisnis.com/posts/2021/09/29/1448535/kue-subuh-1.jpg" class="d-block w-100" alt="..."/>
    </div>
    <div class="carousel-item">
      <img src="https://i.ytimg.com/vi/Zmi-Hd0qyT8/maxresdefault.jpg" class="d-block w-100" alt="..."/>
    </div>
  </div>
  
</div>
    </>
  );
};

export default CarouselTibloc;