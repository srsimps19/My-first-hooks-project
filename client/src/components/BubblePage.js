import React, { useState, useEffect } from "react";
import {axiosWithAuth} from "./axiosWithAuth";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  useEffect(() => {
    getBubbleData();
  }, [])

  const getBubbleData = () => {
    axiosWithAuth()
      .get('/colors')
      .then(res => {
        setColorList(res.data)
      })
  }

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} getBubbleData={getBubbleData} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
