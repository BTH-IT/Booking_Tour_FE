import { Checkbox } from "antd";
import { debounce } from "lodash";
import { Dispatch, SetStateAction, useState } from "react";
import styled from "styled-components";

const ServicesWrapper = styled.div`
  box-shadow: 0px 20px 45px rgb(0 0 0 / 10%);
  padding: 30px;
  background-color: white;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  span {
    font-size: 1.6rem;
  }
`;

const ServicesTitle = styled.h2`
  font-size: 3rem;
  font-weight: 600;
  color: black;
  margin-bottom: 30px;
`;

const Services = ({
  setTotalPay,
}: {
  setTotalPay: Dispatch<SetStateAction<number>>;
}) => {
  const [tourPayment, setTourPayment] = useState(
    JSON.parse(localStorage.getItem("tour_payment") || ""),
  );

  if (!tourPayment) {
    return <></>;
  }

  return (
    <>
      <ServicesTitle>
        Please select your preferred additional services
      </ServicesTitle>
      <ServicesWrapper>
        <Checkbox name="tip" checked>
          Tip for tour guide - $20 / Person
        </Checkbox>
        <Checkbox
          name="entrance"
          onChange={(e) => {
            if (e.target.checked) {
              setTotalPay((prev) => prev + Number(tourPayment.seats) * 15);
            } else {
              setTotalPay((prev) => prev - Number(tourPayment.seats) * 15);
            }
          }}
        >
          Entrance Ticket - $15 / Person
        </Checkbox>
        <Checkbox
          name="lunch"
          onChange={(e) => {
            if (e.target.checked) {
              setTotalPay((prev) => prev + Number(tourPayment.seats) * 12);
            } else {
              setTotalPay((prev) => prev - Number(tourPayment.seats) * 12);
            }
          }}
        >
          Lunch Meal - $12 / Person
        </Checkbox>
      </ServicesWrapper>
    </>
  );
};

export default Services;
