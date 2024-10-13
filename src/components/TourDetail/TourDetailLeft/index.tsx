import { ITour } from 'tour';

import * as Styles from './styles';
import { Col, Row } from 'antd';
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';
import { LuCircleDot } from 'react-icons/lu';
import Accordion from '@/components/Accordion';
import { useState } from 'react';
import useDidMount from '@/hooks/useDidMount';
import destinationService from '@/services/DestinationService';
import { IDestination } from 'destination';
import { faqList } from '@/utils/constants';
import { toast } from 'react-toastify';

const TourDetailLeft = (props: ITour) => {
  const [destination, setDestination] = useState<IDestination | null>(null);

  async function getDestination() {
    try {
      const res = await destinationService.getADestination(props.destination);

      if (!res) return;

      setDestination(res.result);
    } catch (error) {
      toast.error('Oops! Something is wrong');
    }
  }

  useDidMount(() => {
    getDestination();
  });

  return (
    <>
      <Styles.TourDetailLeftContent id='detail'>
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
              {props.priceIncludeList.map((include, idx) => (
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
              {props.priceExcludeList.map((excludes, idx) => (
                <Styles.TourDetailLeftPriceIncludesItem key={excludes + idx}>
                  <AiOutlineClose />
                  <p>{excludes}</p>
                </Styles.TourDetailLeftPriceIncludesItem>
              ))}
            </Styles.TourDetailLeftPriceExcludes>
          </Col>
        </Row>
        <Styles.TourDetailLeftSeperate />
        <Styles.TourDetailLeftTitle>What to Expect</Styles.TourDetailLeftTitle>
        <Styles.TourDetailLeftParagraph>
          {props.expect}
        </Styles.TourDetailLeftParagraph>
        <Styles.TourDetailLeftActivities>
          {props.activityList.map((activity, idx) => (
            <Styles.TourDetailLeftPriceIncludesItem key={activity + idx}>
              <LuCircleDot />
              <p>{activity}</p>
            </Styles.TourDetailLeftPriceIncludesItem>
          ))}
        </Styles.TourDetailLeftActivities>
        <Styles.TourDetailLeftSeperate />
      </Styles.TourDetailLeftContent>
      <Styles.TourDetailLeftContent id='itinerary'>
        <Styles.TourDetailLeftTitle>Itinerary</Styles.TourDetailLeftTitle>
        {props.dayList.map((day, idx) => (
          <Accordion
            title={`Day ${idx + 1} - ${day.title}`}
            content={day.desc}
            key={day + idx}
          />
        ))}
      </Styles.TourDetailLeftContent>
      <Styles.TourDetailLeftContent id='map'>
        <Styles.TourDetailLeftMapTitle>Map</Styles.TourDetailLeftMapTitle>
        {destination && (
          <Styles.TourDetailLeftMap
            dangerouslySetInnerHTML={{
              __html: destination.map.replace('width="600"', "width='100%'"),
            }}
          />
        )}
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
