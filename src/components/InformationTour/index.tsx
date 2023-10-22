import ButtonLink from '../ButtonLink'
import * as Styles from "./styles"

const InformationTour = ({current, maxStep} : {current: number, maxStep: number}) => {
  return (
    <Styles.InformationTourWrapper>
      <Styles.InformationTourTitle>Austria – 6 Days in Vienna, Hallstatt</Styles.InformationTourTitle>
      <Styles.InformationTourContent>
        <p>Travel Date: </p>
        <span>Frebruary 1, 2030</span>
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
        <span>Frebruary 1, 2030</span>
      </Styles.InformationTourContent>
      <Styles.InformationTourContent>
        <p>Period: </p>
        <span>8 Days</span>
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
                $3,815.00
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
            $3,815.00
          </div>
        </Styles.InformationCouponContent>
      </Styles.InformationCoupon>
    </Styles.InformationTourWrapper>
  )
}

export default InformationTour
