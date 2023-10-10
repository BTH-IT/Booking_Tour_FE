import * as Styles from './styles';
import { Container } from '@/constants';
import { Col, Row } from 'antd';
import SearchContentForm from './SearchContentForm';
import SearchContentSort from './SearchContentSort';
import FreshlyAdded from '../Card/FreshlyAdded';
import { useEffect, useRef, useState } from 'react';
import FreshlyAddedV2 from '../Card/FreshlyAddedV2';
import tourService from '@/services/TourService';
import { ITour } from 'tour';

const SearchContent = () => {
  const [layout, setLayout] = useState(false);
  const [tourList, setTourList] = useState<ITour[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

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
      const data = await tourService.getAllTour({
        _page: page,
      });

      if (data.length === 0) {
        setHasMore(false);
      } else {
        setTourList((prev) => [...prev, ...data]);
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
              <SearchContentSort layout={layout} setLayout={setLayout} />
              {!layout ? (
                <Row gutter={[20, 20]}>
                  {tourList.map((freshlyAdded, idx) => (
                    <Col xs={24} sm={12} key={freshlyAdded.images[0] + idx}>
                      <FreshlyAdded {...freshlyAdded} maxWidth={'100%'} />
                    </Col>
                  ))}
                </Row>
              ) : (
                tourList.map((freshlyAdded, idx) => (
                  <FreshlyAddedV2
                    {...freshlyAdded}
                    key={freshlyAdded.images[0] + idx}
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
