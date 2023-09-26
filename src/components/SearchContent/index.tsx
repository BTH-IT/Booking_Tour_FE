import * as Styles from './styles';
import { Container } from '@/constants';
import { Col, Row } from 'antd';
import SearchContentForm from './SearchContentForm';
import SearchContentSort from './SearchContentSort';
import FreshlyAdded from '../Card/FreshlyAdded';
import { useEffect, useRef, useState } from 'react';
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
  const [tourList, setTourList] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  const elementRef = useRef<HTMLDivElement | null>(null);

  function onIntersection(entries: IntersectionObserverEntry[]) {
    const firstEntry = entries[0];

    if (firstEntry.isIntersecting && hasMore) {
      fetchMoreItems();
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(onIntersection);

    if (observer && elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [tourList]);

  async function fetchMoreItems() {
    try {
      const res = await fetch(
        `https://dummyjson.com/products?limit=10&skip=${page * 10}`,
      );

      const data = await res.json();

      if (data.products.length == 0) {
        setHasMore(false);
      } else {
        setTourList((prev) => [...prev, ...data.products]);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container>
      <Styles.SearchContentWrapper>
        <Row gutter={[60, 60]}>
          <Col xs={24} md={24} xl={8}>
            <SearchContentForm />
          </Col>
          <Col xs={24} md={24} xl={16}>
            <Styles.SearchContentRight>
              <Styles.SearchContentResult>
                22 Results Found
              </Styles.SearchContentResult>
              <SearchContentSort layout={layout} setLayout={setLayout} />
              {!layout ? (
                <Row gutter={[20, 20]}>
                  {/* {freshlyAddeds.map((freshlyAdded) => (
                    <Col xs={24} sm={12} key={freshlyAdded.img}>
                      <FreshlyAdded {...freshlyAdded} maxWidth={'100%'} />
                    </Col>
                  ))} */}
                  {tourList.map((item) => (
                    <Col xs={24} sm={12} key={item.thumbnail}>
                      <FreshlyAdded
                        {...freshlyAddeds[0]}
                        img={item.thumbnail}
                        maxWidth={'100%'}
                      />
                    </Col>
                  ))}
                </Row>
              ) : (
                // freshlyAddeds.map((freshlyAdded) => (
                //   <FreshlyAddedV2
                //     {...freshlyAdded}
                //     key={freshlyAdded.img}
                //     maxWidth={'100%'}
                //   ></FreshlyAddedV2>
                // ))
                tourList.map((item) => (
                  <FreshlyAddedV2
                    {...freshlyAddeds[0]}
                    img={item.thumbnail}
                    key={item.thumbnail}
                    maxWidth={'100%'}
                  />
                ))
              )}
              {hasMore && <div ref={elementRef}></div>}
            </Styles.SearchContentRight>
          </Col>
        </Row>
      </Styles.SearchContentWrapper>
    </Container>
  );
};

export default SearchContent;
