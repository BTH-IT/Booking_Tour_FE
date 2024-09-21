import { styled } from "styled-components";
import { RightOutlined } from "@ant-design/icons";
import { Skeleton } from "antd";

interface IRoomProps {
  descriptionHeight?: string;
}

export const CardWrapper = styled.a`
  width: 100%;
  max-width: 385px;
  height: 515px;
  text-decoration: none;
  display: flex;
  margin: 20px auto;
  flex-direction: column;
  flex-wrap: wrap;
  font-family: "DM Sans", sans-serif;
  border-radius: 12px;
`;

export const ImgWrapper = styled.div`
  width: 100%;
  height: auto;
  position: relative;
`;

export const CardInfo = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  color: white;
  transition: all 0.2s ease;
  width: 90%;
`;

export const CardInfoTitle = styled.h3`
  color: black;
  font-weight: 700;
  font-size: 3rem;
  transition: all 0.2s ease;
  width: 100%;
  padding-bottom: 20px;
  font-family: "DM Serif Display", serif;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const Img = styled.img`
  width: 100%;
  height: 260px;
  max-width: 100%;
  background-size: cover;
  background-position: center;
  filter: brightness(0.6);
  transition: all 0.3s linear;
  border-radius: 12px;
`;

export const SaleOff = styled.span`
  position: absolute;
  top: 30px;
  right: 20px;
  background-color: #5c98f2;
  padding: 10px 15px;
  border-radius: 3px;
  border: none;
  color: white;
  font-weight: 700;
  border-radius: 6px;
`;

export const Price = styled.span`
  position: absolute;
  display: flex;
  font-size: 1.5rem;
  justify-content: center;
  align-items: center;
  min-width: 135px;
  height: 65px;
  bottom: 10px;
  left: 20px;
  background-color: black;
  padding: 10px 15px;
  border-radius: 3px;
  border: none;
  color: white;
  font-weight: 700;
  border-radius: 12px;

  & > span {
    padding-top: 2px;
    color: #a0a6a6;
    font-size: 1.2rem;
    font-weight: normal;
    text-decoration: line-through;
  }
`;

export const CardInfoDescription = styled.div<IRoomProps>`
  color: #8c8c8c;
  height: ${({ descriptionHeight }) => descriptionHeight || "80px"};
  display: -webkit-box; /* For WebKit browsers */
  -webkit-box-orient: vertical; /* Set text orientation */
  overflow: hidden; /* Hide overflowing content */
  -webkit-line-clamp: 3; /* Limit to 3 lines */
  line-height: 1.7;
  font-size: 1.3rem;
  transition: all 0.2s ease;
  width: 100%;
  padding-bottom: 10px;
`;

export const CardInfoReviews = styled.div`
  color: black;
  width: 100%;
  padding-bottom: 25px;
  display: flex;
  align-items: center;

  & > span {
    transform: translateY(4px);
    opacity: 0.7;
    font-weight: 400;
  }
`;

export const CardInfoBookNow = styled.div`
  position: relative;
  display: inline-block;
  line-height: 1.7;
  color: black;
  width: 100%;
  & > span {
    padding-right: 20px;
    font-size: 1.2rem;
    font-weight: 600;
  }
  & :hover::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -4px; /* Adjust the value as needed */
    width: 100%;
    height: 2px;
    background-color: #c2c2c2; /* Change the color as desired */
    animation: lineAnimation 500ms forwards;
  }

  @keyframes lineAnimation {
    from {
      width: 0%;
    }
    to {
      width: 30%;
    }
  }
`;

export const CustomRightOutlined = styled(RightOutlined)`
  font-size: 1.2rem;
  padding-left: 7px;
`;

export const SkeletonImg = styled(Skeleton.Image)`
  width: 100% !important;
  height: 260px !important;
`;

export const SkeletonTitle = styled(Skeleton)`
  width: 100%;
`;
