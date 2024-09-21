import { Row } from "antd";
import styled from "styled-components";

export const DestinationsContainer = styled.div`
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 20px;
  padding-top: 100px;
`;

export const DestinationsTop = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 30px;
`;

export const DestinationsTopTitle = styled.h3`
  color: black;
  font-size: 5rem;
  font-family: "DM Serif Display", sans-serif;
  font-weight: 400;

  span {
    font-size: inherit;
    font-family: inherit;
    color: #5c98f2;
  }

  @media screen and (max-width: 480px) {
    font-size: 3.2rem;
  }
`;

export const DestinationsTopDesc = styled.p`
  width: 100%;
  max-width: 40%;
  font-size: 1.4rem;
  line-height: 1.5;
  text-align: center;

  @media screen and (max-width: 480px) {
    max-width: 100%;
  }
`;

export const DestinationsBottom = styled(Row)`
  margin-top: 50px;
`;
