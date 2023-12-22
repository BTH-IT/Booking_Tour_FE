import { Dispatch, SetStateAction, useState } from 'react';
import ButtonLink from '../ButtonLink'
import * as Styles from "./styles"
import moment from 'moment';

const InformationTour = ({current, maxStep, totalPay, setTotalPay} : {current: number, maxStep: number, totalPay: number, setTotalPay: Dispatch<SetStateAction<number>>}) => {
  const [tourPayment, setTourPayment] = useState(JSON.parse(localStorage.getItem("tour_payment") || ""));
  
  if (!tourPayment) {
    return <></>
  }

  const dateStart = new Date(tourPayment.schedule.dateStart);
  dateStart.setDate(dateStart.getDate() - 1);

  const dateEnd = new Date(tourPayment.schedule.dateEnd);
  dateEnd.setDate(dateEnd.getDate() - 1);

  const period = dateEnd.getDate() - dateStart.getDate();

  return (
    <Styles.InformationTourWrapper>
      <Styles.InformationTourTitle>Austria – 6 Days in Vienna, Hallstatt</Styles.InformationTourTitle>
      <Styles.InformationTourContent>
        <p>Travel Date: </p>
        <span>{moment(dateStart).format("ll")}</span>
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
        <span>{moment(dateEnd).format("ll")}</span>
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
              <div>
                ${totalPay}
              </div>
            </Styles.InformationCouponContent>
            <Styles.InformationCouponContent>
              <p>Coupon Code:</p>
              <div>
                <span>Apply</span>
                <input type='text'/>
              </div>
            </Styles.InformationCouponContent>
          </>
        )}
        
        <Styles.InformationCouponContent>
          <p>Total Price:</p>
          <div>
            ${totalPay}
          </div>
        </Styles.InformationCouponContent>
      </Styles.InformationCoupon>
    </Styles.InformationTourWrapper>
  )
}

export default InformationTour
