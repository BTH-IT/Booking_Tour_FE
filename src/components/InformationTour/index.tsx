import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import ButtonLink from '../ButtonLink';
import * as Styles from './styles';
import moment from 'moment';
import { useNavigate } from 'react-router';

const InformationTour = ({
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
  const [tourPayment, setTourPayment] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedTourPayment = JSON.parse(
      localStorage.getItem('tour_payment') || 'null',
    );
    setTourPayment(storedTourPayment);

    if (!storedTourPayment) {
      navigate('/', { replace: true });
    }
  }, []);

  const dateStart = new Date(tourPayment?.schedule?.dateStart);

  const dateEnd = new Date(tourPayment?.schedule?.dateEnd);

  const differenceInTime = dateEnd.getTime() - dateStart.getTime();

  const period = Math.ceil(differenceInTime / (1000 * 60 * 60 * 24));

  return (
    <Styles.InformationTourWrapper>
      <Styles.InformationTourTitle>
        {tourPayment?.name}
      </Styles.InformationTourTitle>
      <Styles.InformationTourContent>
        <p>Travel Date: </p>
        <span>{moment(dateStart).format('ll')}</span>
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
      </Styles.InformationTourContent>
      <Styles.InformationTourContent>
        <p>End Date: </p>
        <span>{moment(dateEnd).format('ll')}</span>
      </Styles.InformationTourContent>
      <Styles.InformationTourContent>
        <p>Period: </p>
        <span>{period} Days</span>
      </Styles.InformationTourContent>
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
    </Styles.InformationTourWrapper>
  );
};

export default InformationTour;
