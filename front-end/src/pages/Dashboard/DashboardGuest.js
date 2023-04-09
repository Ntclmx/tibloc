import React, {useEffect, useContext  } from "react";
import CarouselTibloc from "../../components/Carousel";
import ListCategory from "../../container/ListCategory/ListCategory";
import Button from 'react-bootstrap/Button';
import ArticleCard from "../../container/ArticleCard/ArticleCard";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getMe } from "../../features/authSlice";
import CarouselImage1 from '../../assets/carousel/Home1.png';
import { UserContext } from '../MainApp/index'

const DashboardGuest = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  // const { web3User } = useContext(UserContext);
  // console.log('aaaa',web3User);

  // const {ethereum} = window;
  // console.log('aaaa',ethereum);
  // const {isError} = useSelector((state) => state.auth);

  // useEffect(() => {
  //   dispatch(getMe());
  // }, [dispatch]);

  // useEffect(() => {
  //   if (isError) {
  //     history.push("/");
  //   }
  // }, [isError, history.push]);

  return (
    <div >
      <h1>{`Welcome `}</h1>
      <CarouselTibloc/>
      <h1 className="my-5 d-flex justify-content-center align-items-center">CATEGORY</h1>
      <ListCategory/>
      <div className="my-5 d-flex justify-content-center align-items-center">
        <Button variant="primary" size="lg">
          More...
        </Button>{' '}
      </div>
      <div className="m-5 d-flex justify-content-center align-items-center">
        {<img src={CarouselImage1} alt="banner" style={{ width:1349 }}/>}
      </div>
      <h1 className="my-5">Learn More</h1>
      <ArticleCard />      
    </div>
  );
};

export default DashboardGuest;
