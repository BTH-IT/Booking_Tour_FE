import { ITour } from 'tour';

import * as Styles from './styles';
import { Col, Row } from 'antd';
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';

const TourDetailLeft = (props: ITour) => {
  return (
    <>
      <Styles.TourDetailLeftContent id="detail">
        <Styles.TourDetailLeftTitle>Detail</Styles.TourDetailLeftTitle>
        <Styles.TourDetailLeftParagraph>
          {props.detail}
        </Styles.TourDetailLeftParagraph>
        <Row gutter={[20, 20]}>
          <Col xs={12}>
            <Styles.TourDetailLeftPriceIncludesTitle>
              Price Includes
            </Styles.TourDetailLeftPriceIncludesTitle>
          </Col>
          <Col xs={12}>
            <Styles.TourDetailLeftPriceIncludes>
              {props.priceIncludes.map((include, idx) => (
                <Styles.TourDetailLeftPriceIncludesItem key={include + idx}>
                  <AiOutlineCheck />
                  <p>{include}</p>
                </Styles.TourDetailLeftPriceIncludesItem>
              ))}
            </Styles.TourDetailLeftPriceIncludes>
          </Col>
          <Col xs={12}>
            <Styles.TourDetailLeftPriceExcludesTitle>
              Price Excludes
            </Styles.TourDetailLeftPriceExcludesTitle>
          </Col>
          <Col xs={12}>
            <Styles.TourDetailLeftPriceExcludes>
              {props.priceExcludes.map((excludes, idx) => (
                <Styles.TourDetailLeftPriceIncludesItem key={excludes + idx}>
                  <AiOutlineClose />
                  <p>{excludes}</p>
                </Styles.TourDetailLeftPriceIncludesItem>
              ))}
            </Styles.TourDetailLeftPriceExcludes>
          </Col>
        </Row>
      </Styles.TourDetailLeftContent>
      <Styles.TourDetailLeftContent id="itinerary"></Styles.TourDetailLeftContent>
    </>
  );
};

export default TourDetailLeft;
