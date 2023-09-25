import * as Styles from './styles';
import { Container } from '@/constants';
import { Col, Pagination, Row } from 'antd';
import SearchContentForm from './SearchContentForm';
import SearchContentSort from './SearchContentSort';
import FreshlyAdded from '../Card/FreshlyAdded';
import { useState } from 'react';
import FreshlyAddedV2 from '../Card/FreshlyAddedV2';

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

const SearchContent = () => {
  const [layout, setLayout] = useState(false);

  return (
    <Container>
      <Styles.SearchContentWrapper>
        <Row gutter={[60, 60]}>
          <Col xs={8}>
            <SearchContentForm />
          </Col>
          <Col xs={16}>
            <Styles.SearchContentRight>
              <Styles.SearchContentResult>
                22 Results Found
              </Styles.SearchContentResult>
              <SearchContentSort layout={layout} setLayout={setLayout} />
              {!layout ? (
                <Row gutter={[20, 20]}>
                  {freshlyAddeds.map((freshlyAdded) => (
                    <Col xs={12} key={freshlyAdded.img}>
                      <FreshlyAdded
                        {...freshlyAdded}
                        max_width={'100%'}
                      ></FreshlyAdded>
                    </Col>
                  ))}
                </Row>
              ) : (
                freshlyAddeds.map((freshlyAdded) => (
                  <FreshlyAddedV2
                    {...freshlyAdded}
                    key={freshlyAdded.img}
                    max_width={'100%'}
                  ></FreshlyAddedV2>
                ))
              )}
              <Pagination />
            </Styles.SearchContentRight>
          </Col>
        </Row>
      </Styles.SearchContentWrapper>
    </Container>
  );
};

export default SearchContent;
