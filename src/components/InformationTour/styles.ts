import styled from "styled-components";

export const InformationTourWrapper = styled.div`
  display: flex;
  gap: 20px;
  flex-direction: column;
`;

export const InformationTourTitle = styled.div`
  font-size: 2.2rem;
  font-weight: 500;
  color: black;
  line-height: 1.2;
`;

export const InformationTourContent = styled.div`
  display: flex;
  gap: 10px;
  p {
    color: black;
    font-size: 1.4rem;
  }

  span {
    font-size: 1.4rem;
  }
`;

export const InformationBreakdown = styled.div`
  font-size: 1.4rem;
  font-weight: 400;
  color: #5c98f2;
  padding: 20px 0;
  margin: 10px 0;
  border-top: 1px solid gray;
  border-bottom: 1px solid gray;
  cursor: pointer;
`;

export const InformationCouponContent = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;
  align-items: center;
`;

export const InformationCouponContentSubTitle = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;
  align-items: center;
`;

export const InformationCoupon = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  justify-content: space-between;
  padding-top: 30px;
  padding-bottom: 30px;
  margin-bottom: 20px;
  border-top: 1px solid gray;
  border-bottom: 1px solid gray;

  p {
    font-size: 1.4rem;
    color: black;
    flex: 1;
    font-weight: 500;
  }

  span {
    font-size: 1.2rem;
    color: #5c98f2;
    display: inline-block;
    margin-right: 10px;
    cursor: pointer;
  }

  input {
    max-width: 130px;
    font-size: 1.2rem;
    outline: none;
    padding: 5px;
  }

  div {
    font-size: 1.6rem;
    color: black;
    font-weight: 500;
  }
`;
