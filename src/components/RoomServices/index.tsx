import useDidMount from '@/hooks/useDidMount';
import { totalDates } from '@/utils/constants';
import { Checkbox } from 'antd';
import { debounce } from 'lodash';
import { Dispatch, SetStateAction, useState } from 'react';
import styled from 'styled-components';

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

const RoomServices = ({
  setTotalPay,
}: {
  setTotalPay: Dispatch<SetStateAction<number>>;
}) => {
  const [roomPayment, setRoomPayment] = useState(
    JSON.parse(localStorage.getItem('room_payment') || ''),
  );

  if (!roomPayment) {
    return <></>;
  }

  const totalDate = totalDates(
    new Date(roomPayment?.schedule[0]),
    new Date(roomPayment?.schedule[1]),
  );
  const totalMoney = totalDate * roomPayment.price;

  const totalPeople = roomPayment.adults + roomPayment.children;

  useDidMount(() => {
    setTotalPay((totalMoney * (100 + 5 * totalPeople)) / 100);
  });

  const onChange = (e: any) => {
    console.log(e.target.checked);

    if (e.target.checked) {
      setTotalPay((totalMoney * (100 + 5 * totalPeople)) / 100);
    } else {
      setTotalPay(totalMoney);
    }
  };

  return (
    <>
      <ServicesTitle>
        Please select your preferred additional services
      </ServicesTitle>
      <ServicesWrapper>
        <Checkbox name="tip" defaultChecked onChange={onChange}>
          Tip for concierge - 5% / Person
        </Checkbox>
      </ServicesWrapper>
    </>
  );
};

export default RoomServices;
