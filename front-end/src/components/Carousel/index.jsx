import React from "react";

function checkIndex(banner){
  if(banner.index === 1){
    return (
      <div class="carousel-item active">
          <img src={banner.src} class="d-block w-50 h-50" alt={banner.alt} />
        </div>
    );
  }else{
    return(
    <div class="carousel-item">
          <img src={banner.src} class="d-block w-80 h-50" alt={banner.alt} />
        </div>
    );
  }
}

const CarouselTibloc = (props) => {
  const banners = props.banners;
  const carouselBody = banners.map((banner) => 
    checkIndex(banner)
  )
  return (
    <div
      id="carouselExample"
      class="carousel slide"
    >
      <div class="carousel-inner">
        {carouselBody}
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default CarouselTibloc;