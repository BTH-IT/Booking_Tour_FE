import { Col, Row } from 'antd';
import { useEffect, useState } from 'react';
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';
import { LuCircleDot } from 'react-icons/lu';
import { ITour } from 'tour';

import * as Styles from './styles';

import Accordion from '@/components/Accordion';
import { faqList } from '@/utils/constants';

const TourDetailLeft = (props: ITour) => {
  const [inWishList, setInWishList] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const tourJSON = localStorage.getItem('tour-wish-list');
    if (tourJSON) {
      const tourList: ITour[] = JSON.parse(tourJSON);
      setInWishList(tourList.some((tour) => tour.id === props.id));
    }
    setMounted(true);
  }, [props.id]);

  const addToWishListHandler = () => {
    const tourJSON = localStorage.getItem('tour-wish-list');
    if (tourJSON) {
      const tourList: ITour[] = JSON.parse(tourJSON);
      if (tourList.some((tour) => tour.id === props.id)) {
        return;
      }
      tourList.push(props);
      localStorage.setItem('tour-wish-list', JSON.stringify(tourList));
    } else {
      localStorage.setItem('tour-wish-list', JSON.stringify([props]));
    }
    setInWishList(true);
  };
  return (
    <>
      {mounted && (
        <>
          <Styles.TourDetailLeftContent id="detail">
            <Styles.HeaderWrapper>
              <Styles.TourDetailLeftTitle>Detail</Styles.TourDetailLeftTitle>
              <Styles.WishListButton
                disabled={inWishList}
                onClick={addToWishListHandler}
              >
                <>
                  {inWishList ? (
                    <>
                      <span>In Wish List</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="#00ff4c"
                          d="m9.55 18l-5.7-5.7l1.425-1.425L9.55 15.15l9.175-9.175L20.15 7.4z"
                        />
                      </svg>
                    </>
                  ) : (
                    <>
                      <span>Add to Wish List</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1.5em"
                        height="1.5em"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="#ff0000"
                          d="m12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53z"
                        />
                      </svg>
                    </>
                  )}
                </>
              </Styles.WishListButton>
            </Styles.HeaderWrapper>
            <Styles.TourDetailLeftParagraph
              dangerouslySetInnerHTML={{ __html: props.detail }}
            />
            <Row gutter={[20, 20]}>
              <Col xs={12}>
                <Styles.TourDetailLeftpriceIncludeListTitle>
                  Price Includes
                </Styles.TourDetailLeftpriceIncludeListTitle>
              </Col>
              <Col xs={12}>
                <Styles.TourDetailLeftpriceIncludeList>
                  {props.priceIncludeList.map((include, idx) => (
                    <Styles.TourDetailLeftpriceIncludeListItem
                      key={include + idx}
                    >
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
                    <Styles.TourDetailLeftpriceIncludeListItem
                      key={excludes + idx}
                    >
                      <AiOutlineClose />
                      <p>{excludes}</p>
                    </Styles.TourDetailLeftpriceIncludeListItem>
                  ))}
                </Styles.TourDetailLeftpriceExcludeList>
              </Col>
            </Row>
            <Styles.TourDetailLeftSeperate />
            <Styles.TourDetailLeftTitle>
              What to Expect
            </Styles.TourDetailLeftTitle>
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
          <Styles.TourDetailLeftContent id="itinerary">
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
          <Styles.TourDetailLeftContent id="faq">
            <Styles.TourDetailLeftTitle>FAQ</Styles.TourDetailLeftTitle>
            {faqList.map((item, idx) => (
              <Accordion title={item.title} content={item.content} key={idx} />
            ))}
          </Styles.TourDetailLeftContent>
        </>
      )}
    </>
  );
};

export default TourDetailLeft;
