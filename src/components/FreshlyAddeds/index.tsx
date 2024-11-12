import { useState } from 'react';
import { ITour } from 'tour';

import ButtonLink from '../ButtonLink';
import FreshlyAdded from '../Card/FreshlyAdded';
import SliderBase from '../Slider/SliderBase';

import * as Styles from './styles';

import { Container } from '@/constants';
import useDidMount from '@/hooks/useDidMount';
import tourService from '@/services/TourService';
import { logError } from '@/utils/constants';

const FreshlyAddeds = () => {
  const [tourList, setTourList] = useState<ITour[]>([]);

  async function fetchTourList() {
    try {
      const data = await tourService.getAllTours();

      setTourList(data.result);
    } catch (error) {
      logError(error);
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
              key={freshlyAdded.id}
            ></FreshlyAdded>
          ))}
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
          View All Tours
        </ButtonLink>
      </Styles.FreshlyAddedContainer>
    </Container>
  );
};

export default FreshlyAddeds;
