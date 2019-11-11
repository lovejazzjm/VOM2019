import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import TopNaviList from "../components/TopNaviList/TopNaviList";
import { apiTopNavi } from "../actions/apiAction";

const TopNaviContainer = () => {
  const data = useSelector(
    state => (state["apiTopNavi"] ? state["apiTopNavi"].result : {}),
    []
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(apiTopNavi());
    return () => {};
  }, [dispatch]);

  return (
    <header className={"topNavi"}>
      <TopNaviList data={data}></TopNaviList>
    </header>
  );
};

export default TopNaviContainer;
