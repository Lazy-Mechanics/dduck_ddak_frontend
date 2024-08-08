import React, { useState } from "react";
import CustomHeader from "../../components/customHeader";
import LeftSidebar from "../../components/leftSidebar";
import RightSidebar from "../../components/rightSidebar";
import KakaoMap from "../mapView/KakaoMap";

function MainView() {
  const [selectedArea, setSelectedArea] = useState(null);
  const [isSelectedSize, setSelectedSize] = useState(true);
  const [selectQuery, setSelectQuery] = useState([]);
  const [selectCategory, setSelectCategory] = useState("");

  return (
    <div>
      <CustomHeader
        setSelectedSize={setSelectedSize}
        setSelectedArea={setSelectedArea}
      />
      <LeftSidebar
        setSelectedSize={setSelectedSize}
        setSelectQuery={setSelectQuery}
        setSelectCategory={setSelectCategory}
      />
      <RightSidebar
        selectedArea={selectedArea}
        isSelectedSize={isSelectedSize}
        selectCategory={selectCategory}
      />
      <KakaoMap
        setSelectedArea={setSelectedArea}
        isSelectedSize={isSelectedSize}
        selectQuery={selectQuery}
      />
    </div>
  );
}

export default MainView;
