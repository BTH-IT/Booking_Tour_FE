import ButtonLink from '../ButtonLink';
import FreshlyAdded from '../Card/FreshlyAdded';
import SliderBase from '../Slider/SliderBase';
import { Container } from '@/constants';

import * as Styles from './styles';
import useDidMount from '@/hooks/useDidMount';
import { useState } from 'react';
import { ITour } from 'tour';
import tourService from '@/services/TourService';

const FreshlyAddeds = () => {
  const [tourList, setTourList] = useState<ITour[]>([]);

  async function fetchTourList() {
    try {
      const data = await tourService.getAllTour();

      setTourList(data.tours);
    } catch (error) {
      console.log(error);
    }
  }

  useDidMount(() => {
    fetchTourList();
  });

  return (
    <Container>
      <Styles.FreshlyAddedContainer>
        <Styles.FreshlyAddedTitle>
          Freshly <span>Added</span>
        </Styles.FreshlyAddedTitle>
        <SliderBase
          config={{
            slidesToShow: 4,
          }}
          configResponsive={[
            {
              breakpoint: 1500,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
              },
            },
            {
              breakpoint: 1150,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
              },
            },
            {
              breakpoint: 1000,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              },
            },
          ]}
        >
          {tourList.map((freshlyAdded) => (
            <FreshlyAdded
              {...freshlyAdded}
              key={freshlyAdded.images[0]}
            ></FreshlyAdded>
          ))}
        </SliderBase>
        <ButtonLink
          href="/"
          icon={true}
          $fontSize="1.4rem"
          $borderBottom={true}
          $hoverColorBottom="#5c98f2"
          color="black"
          $hoverColor="black"
        >
          View All Tours
        </ButtonLink>
      </Styles.FreshlyAddedContainer>
    </Container>
  );
};

export default FreshlyAddeds;
