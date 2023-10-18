import PopularTour from '../Card/PopularTour';
import { Container } from '@/constants';
import SliderBase from '../Slider/SliderBase';

import * as Styles from './styles';
import ButtonLink from '../ButtonLink';
import { Col, Row } from 'antd';
import { SkeletonImg } from '../Card/FreshlyAdded/style';
import { useState } from 'react';
import tourService from '@/services/TourService';
import { ITour } from 'tour';
import { toast } from 'react-toastify';
import useDidMount from '@/hooks/useDidMount';

const PopularTours = () => {
  const [tours, setTours] = useState<ITour[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function handleFetchTours() {
    setIsLoading(true);
    try {
      const data = await tourService.getAllTour();

      setTours(data.tours);
      setIsLoading(false);
    } catch {
      toast.error('Oops!! Something is wrong');
    }
  }

  useDidMount(() => {
    handleFetchTours();
  });

  return (
    <Container>
      <Styles.PopularToursContainer>
        <Styles.PopularToursTitle>
          Popular <span>Tours</span>
        </Styles.PopularToursTitle>
        <SliderBase>
          {!isLoading ? (
            tours.map((popularTour) => (
              <PopularTour {...popularTour} key={popularTour._id}></PopularTour>
            ))
          ) : (
            <Row gutter={[30, 30]}>
              {[1, 2, 3].map((item) => (
                <Col xs={24} sm={12} xl={8} key={item}>
                  <SkeletonImg active />
                </Col>
              ))}
            </Row>
          )}
        </SliderBase>
        <ButtonLink
          href="/search"
          icon={true}
          $fontSize="1.4rem"
          $borderBottom={true}
          $hoverColorBottom="#5c98f2"
          color="black"
          $hoverColor="black"
        >
          See More
        </ButtonLink>
      </Styles.PopularToursContainer>
    </Container>
  );
};

export default PopularTours;
