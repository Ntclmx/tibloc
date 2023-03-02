import React from "react";
import CarouselTibloc from "../../components/Carousel";
import ListCategory from "../../container/ListCategory/ListCategory";
import Button from 'react-bootstrap/Button';
import ArticleCard from "../../container/ArticleCard/ArticleCard";

// let Banners = [
//   { index: 1, src: "https://cdn1-production-images-kly.akamaized.net/WtfFC1e1Pitdvxc8iQykfJqDkuA=/640x360/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/3332604/original/036907800_1608786362-WhatsApp_Image_2020-12-24_at_07.58.39.jpeg", alt: 1 },
//   { index: 2, src: "https://images.bisnis.com/posts/2021/09/29/1448535/kue-subuh-1.jpg", alt: 2 },
//   { index: 3, src: "https://i.ytimg.com/vi/Zmi-Hd0qyT8/maxresdefault.jpg", alt: 3 }
// ];

const Home = () => {
  return (
    <div >
      <CarouselTibloc/>
      <h1 className="my-5 d-flex justify-content-center align-items-center">CATEGORY</h1>
      <ListCategory/>
      <div className="my-5 d-flex justify-content-center align-items-center">
        <Button variant="primary" size="lg">
          More...
        </Button>{' '}
      </div>
      <div className="m-5 d-flex justify-content-center align-items-center">
        <img src="https://i.ytimg.com/vi/Zmi-Hd0qyT8/maxresdefault.jpg" alt="banner"/>
      </div>
      <h1 className="my-5">Learn More</h1>
      <ArticleCard />      
    </div>
  );
};

export default Home;
