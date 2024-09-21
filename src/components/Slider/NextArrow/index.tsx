import React from "react";
import { BsChevronRight } from "react-icons/bs";
import { NextArrowStyled } from "./styles";

const NextArrow = ({ onClick }: any) => {
  return (
    <NextArrowStyled onClick={onClick}>
      <div className="next-slick-arrow">
        <BsChevronRight></BsChevronRight>
      </div>
    </NextArrowStyled>
  );
};

export default NextArrow;
