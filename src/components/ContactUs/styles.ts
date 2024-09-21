import styled from "styled-components";

export const ContactUsContainer = styled.div`
  gap: 50px;
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 20px;
  padding-top: 100px;
`;

export const ContactUsLeft = styled.div`
  background-image: url("https://demo.goodlayers.com/traveltour/homepages/main5/wp-content/uploads/sites/6/2022/06/beach-bg.jpg");
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100%;
  padding: 55px 0 70px 30px;
  display: flex;
  flex-direction: column;
  gap: 50px;
  color: white;
  border-radius: 24px;
`;

export const ContactUsLeftTitle = styled.h3`
  font-size: 4rem;
  font-weight: 600;
`;

export const ContactUsLeftDesc = styled.p`
  font-size: 1.6rem;
  line-height: 1.5;
  width: 60%;
`;

export const ContactUsRight = styled.div`
  width: 100%;
  height: 100%;
  padding: 60px 70px 50px 30px;
  display: flex;
  flex-direction: column;
  color: black;
  border-radius: 24px;
  background-color: #f4f4f4;
`;

export const ContactUsRightTitle = styled.h3`
  font-size: 3rem;
  font-weight: 600;
`;

export const ContactUsRightDesc = styled.p`
  margin-top: 30px;
  margin-bottom: 10px;
  font-size: 1.6rem;
  line-height: 1.5;
  color: #8c8c8c;
  font-weight: 300;
`;
