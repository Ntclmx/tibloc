import React, {useEffect} from "react";
import CarouselTibloc from "../../components/Carousel";
import ListCategory from "../../container/ListCategory/ListCategory";
import Button from 'react-bootstrap/Button';
import ArticleCard from "../../container/ArticleCard/ArticleCard";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getMe } from "../../features/authSlice";

const DashboardCustomer = () => {
  console.log(`Start Dashboard...`);
  
  const dispatch = useDispatch();
  const history = useHistory();
  const {isError} = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      history.push("/");
    }
  }, [isError, history]);

  return (
    <div >
      <h1>Wellcomeeee <strong>{isError}</strong></h1>
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

export default DashboardCustomer;
