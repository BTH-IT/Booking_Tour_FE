import PopularTour from '../Card/PopularTour';
import { Container } from '@/constants';
import SliderBase from '../Slider/SliderBase';

import * as Styles from './styles';

const PopularTours = () => {
  return (
    <Container>
      <Styles.PopularToursContainer>
        <Styles.PopularToursTitle>
          Popular <span>Tours</span>
        </Styles.PopularToursTitle>
        <SliderBase>
          <PopularTour
            price={2400}
            rate={4.5}
            reviews={10}
            time="9 Days 8 Night"
            title="Austria – 6 Days in Vienna, Hallstatt"
            salePercent={10}
            img="https://images.unsplash.com/photo-1695134679878-eaac07f1f9f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80"
          ></PopularTour>
          <PopularTour
            price={2400}
            rate={4.5}
            reviews={10}
            time="9 Days 8 Night"
            title="Austria – 6 Days in Vienna, Hallstatt"
            salePercent={10}
            img="https://images.unsplash.com/photo-1695134679878-eaac07f1f9f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80"
          ></PopularTour>
          <PopularTour
            price={2400}
            rate={4.5}
            reviews={10}
            time="9 Days 8 Night"
            title="Austria – 6 Days in Vienna, Hallstatt"
            salePercent={10}
            img="https://images.unsplash.com/photo-1695134679878-eaac07f1f9f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80"
          ></PopularTour>
          <PopularTour
            price={2400}
            rate={4.5}
            reviews={10}
            time="9 Days 8 Night"
            title="Austria – 6 Days in Vienna, Hallstatt"
            salePercent={10}
            img="https://images.unsplash.com/photo-1695134679878-eaac07f1f9f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80"
          ></PopularTour>
          <PopularTour
            price={2400}
            rate={4.5}
            reviews={10}
            time="9 Days 8 Night"
            title="Austria – 6 Days in Vienna, Hallstatt"
            salePercent={10}
            img="https://images.unsplash.com/photo-1695134679878-eaac07f1f9f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80"
          ></PopularTour>
          <PopularTour
            price={2400}
            rate={4.5}
            reviews={10}
            time="9 Days 8 Night"
            title="Austria – 6 Days in Vienna, Hallstatt"
            salePercent={10}
            img="https://images.unsplash.com/photo-1695134679878-eaac07f1f9f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80"
          ></PopularTour>
          <PopularTour
            price={2400}
            rate={4.5}
            reviews={10}
            time="9 Days 8 Night"
            title="Austria – 6 Days in Vienna, Hallstatt"
            salePercent={10}
            img="https://images.unsplash.com/photo-1695134679878-eaac07f1f9f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80"
          ></PopularTour>
        </SliderBase>
      </Styles.PopularToursContainer>
    </Container>
  );
};

export default PopularTours;
