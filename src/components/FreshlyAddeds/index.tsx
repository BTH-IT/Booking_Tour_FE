import ButtonLink from '../ButtonLink';
import FreshlyAdded from '../Card/FreshlyAdded';
import SliderBase from '../Slider/SliderBase';
import { Container } from '@/constants';

import * as Styles from './styles';

const freshlyAddeds = [
  {
    price: 2400,
    rate: 3,
    reviews: 10,
    time: '9 Days 8 Night',
    title: 'Austria – 6 Days in Vienna, Hallstatt',
    salePercent: 10,
    img: 'https://demo.goodlayers.com/traveltour/homepages/main5/wp-content/uploads/sites/6/2017/01/sorasak-9DgwO_ihqL0-unsplash-600x800.jpg',
  },
  {
    price: 2400,
    rate: 5,
    reviews: 10,
    time: '2 Days 1 Night',
    title: 'Argentina – Great Diving Trip',
    salePercent: 10,
    img: 'https://demo.goodlayers.com/traveltour/homepages/main5/wp-content/uploads/sites/6/2017/01/brantley-neal-SiPPNnWzD_o-unsplash-600x800.jpg',
  },
  {
    price: 2400,
    rate: 4,
    reviews: 10,
    time: '8 Days 7 Night',
    title: 'Two Moscow Tour of 7 days',
    salePercent: 0,
    img: 'https://demo.goodlayers.com/traveltour/homepages/main5/wp-content/uploads/sites/6/2017/01/nikolay-vorobyev-QJ2HGuSSQz0-unsplash-600x800.jpg',
  },
  {
    price: 2400,
    rate: 4.5,
    reviews: 10,
    time: '9 Days 8 Night',
    title: 'Austria – 6 Days in Vienna, Hallstatt',
    salePercent: 10,
    img: 'https://images.unsplash.com/photo-1695134679878-eaac07f1f9f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80',
  },
  {
    price: 2400,
    rate: 4.5,
    reviews: 10,
    time: '5 Days 4 Night',
    title: 'India – Mumbai, New Delhi',
    salePercent: 0,
    img: 'https://demo.goodlayers.com/traveltour/homepages/main5/wp-content/uploads/sites/6/2017/01/thais-cordeiro-4TVFPTv_wjE-unsplash-600x800.jpg',
  },
  {
    price: 2400,
    rate: 5,
    reviews: 10,
    time: '9 Days 8 Night',
    title: 'America – Grand canyon, Golden Gate',
    salePercent: 10,
    img: 'https://demo.goodlayers.com/traveltour/homepages/main5/wp-content/uploads/sites/6/2017/01/madhu-shesharam-qvO4yjZo-Mc-unsplash-600x800.jpg',
  },
];

const FreshlyAddeds = () => {
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
          {freshlyAddeds.map((freshlyAdded) => (
            <FreshlyAdded
              {...freshlyAdded}
              key={freshlyAdded.img}
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
