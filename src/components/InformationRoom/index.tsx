import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import ButtonLink from '../ButtonLink';
import * as Styles from './styles';
import moment from 'moment';
import { useNavigate } from 'react-router';
import { formatDate, totalDates } from '@/utils/constants';

const InformationRoom = ({
  current,
  maxStep,
  totalPay,
  setTotalPay,
}: {
  current: number;
  maxStep: number;
  totalPay: number;
  setTotalPay: Dispatch<SetStateAction<number>>;
}) => {
  const [roomPayment, setRoomPayment] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedRoomPayment = JSON.parse(
      localStorage.getItem('room_payment') || 'null',
    );
    setRoomPayment(storedRoomPayment);

    if (!storedRoomPayment) {
      navigate('/', { replace: true });
    }
  }, []);

  const dateStart = new Date(roomPayment?.schedule[0]);

  const dateEnd = new Date(roomPayment?.schedule[1]);

  const period = totalDates(dateStart, dateEnd);

  return (
    <Styles.InformationRoomWrapper>
      <Styles.InformationRoomTitle>
        {roomPayment?.name}
      </Styles.InformationRoomTitle>
      <Styles.InformationRoomContent>
        <p>Check In: </p>
        <span>{formatDate(dateStart)}</span>
        {current > 1 && current < maxStep - 2 && (
          <ButtonLink
            href="/"
            icon={false}
            $fontSize="1.4rem"
            $borderBottom={false}
            color="#5c98f2"
            $hoverColor="#5c98f2"
          >
            edit
          </ButtonLink>
        )}
      </Styles.InformationRoomContent>
      <Styles.InformationRoomContent>
        <p>End Date: </p>
        <span>{formatDate(dateEnd)}</span>
      </Styles.InformationRoomContent>
      <Styles.InformationRoomContent>
        <p>Period: </p>
        <span>{period} Days</span>
      </Styles.InformationRoomContent>
      <Styles.InformationCoupon>
        {current > 1 && current < maxStep - 2 && (
          <>
            <Styles.InformationCouponContent>
              <Styles.InformationCouponContentSubTitle>
                <div>Sub Total Price:</div>
                <p>1 x $2,200</p>
              </Styles.InformationCouponContentSubTitle>
              <div>${totalPay}</div>
            </Styles.InformationCouponContent>
            <Styles.InformationCouponContent>
              <p>Coupon Code:</p>
              <div>
                <span>Apply</span>
                <input type="text" />
              </div>
            </Styles.InformationCouponContent>
          </>
        )}

        <Styles.InformationCouponContent>
          <p>Total Price:</p>
          <div>${totalPay}</div>
        </Styles.InformationCouponContent>
      </Styles.InformationCoupon>
    </Styles.InformationRoomWrapper>
  );
};

export default InformationRoom;
