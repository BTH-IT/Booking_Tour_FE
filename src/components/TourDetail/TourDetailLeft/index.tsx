import { ITour } from 'tour';

import * as Styles from './styles';
import { Col, Row } from 'antd';
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';
import { LuCircleDot } from 'react-icons/lu';
import Accordion from '@/components/Accordion';
import { faqList } from '@/utils/constants';

const TourDetailLeft = (props: ITour) => {
  return (
    <>
      <Styles.TourDetailLeftContent id='detail'>
        <Styles.TourDetailLeftTitle>Detail</Styles.TourDetailLeftTitle>
        <Styles.TourDetailLeftParagraph>
          {props.detail}
        </Styles.TourDetailLeftParagraph>
        <Row gutter={[20, 20]}>
          <Col xs={12}>
            <Styles.TourDetailLeftpriceIncludeListTitle>
              Price Includes
            </Styles.TourDetailLeftpriceIncludeListTitle>
          </Col>
          <Col xs={12}>
            <Styles.TourDetailLeftpriceIncludeList>
              {props.priceIncludeList.map((include, idx) => (
                <Styles.TourDetailLeftpriceIncludeListItem key={include + idx}>
                  <AiOutlineCheck />
                  <p>{include}</p>
                </Styles.TourDetailLeftpriceIncludeListItem>
              ))}
            </Styles.TourDetailLeftpriceIncludeList>
          </Col>
          <Col xs={12}>
            <Styles.TourDetailLeftpriceExcludeListTitle>
              Price Excludes
            </Styles.TourDetailLeftpriceExcludeListTitle>
          </Col>
          <Col xs={12}>
            <Styles.TourDetailLeftpriceExcludeList>
              {props.priceExcludeList.map((excludes, idx) => (
                <Styles.TourDetailLeftpriceIncludeListItem key={excludes + idx}>
                  <AiOutlineClose />
                  <p>{excludes}</p>
                </Styles.TourDetailLeftpriceIncludeListItem>
              ))}
            </Styles.TourDetailLeftpriceExcludeList>
          </Col>
        </Row>
        <Styles.TourDetailLeftSeperate />
        <Styles.TourDetailLeftTitle>What to Expect</Styles.TourDetailLeftTitle>
        <Styles.TourDetailLeftParagraph>
          {props.expect}
        </Styles.TourDetailLeftParagraph>
        <Styles.TourDetailLeftactivityList>
          {props.activityList.map((activity, idx) => (
            <Styles.TourDetailLeftpriceIncludeListItem key={activity + idx}>
              <LuCircleDot />
              <p>{activity}</p>
            </Styles.TourDetailLeftpriceIncludeListItem>
          ))}
        </Styles.TourDetailLeftactivityList>
        <Styles.TourDetailLeftSeperate />
      </Styles.TourDetailLeftContent>
      <Styles.TourDetailLeftContent id='itinerary'>
        <Styles.TourDetailLeftTitle>Itinerary</Styles.TourDetailLeftTitle>
        {props.dayList.map((day, idx) => (
          <Accordion
            title={`Day ${idx + 1} - ${day}`}
            content={day}
            key={day + idx}
          />
        ))}
      </Styles.TourDetailLeftContent>
      <Styles.TourDetailLeftSeperate />
      <Styles.TourDetailLeftContent id='faq'>
        <Styles.TourDetailLeftTitle>FAQ</Styles.TourDetailLeftTitle>
        {faqList.map((item, idx) => (
          <Accordion title={item.title} content={item.content} key={idx} />
        ))}
      </Styles.TourDetailLeftContent>
    </>
  );
};

export default TourDetailLeft;
