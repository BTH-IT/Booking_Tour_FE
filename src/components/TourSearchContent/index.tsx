import { Col, Row } from 'antd';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { ITour } from 'tour';

import FreshlyAdded from '../Card/FreshlyAdded';
import * as FreshlyAddedStyled from '../Card/FreshlyAdded/style';
import FreshlyAddedV2 from '../Card/FreshlyAddedV2';
import * as FreshlyAddedStyledV2 from '../Card/FreshlyAddedV2/style';

import * as Styles from './styles';
import TourSearchContentForm from './TourSearchContentForm';
import TourSearchContentSort from './TourSearchContentSort';

import { Container } from '@/constants';
import useSignalR from '@/hooks/useSignalR';
import { capitalize } from '@/lib/utils';
import tourService from '@/services/TourService';
import { logError } from '@/utils/constants';

const TourSearchContent = () => {
  const signalTour = useSignalR('TourEvent');
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(signalTour);

  const [isLoading, setIsLoading] = useState(false);
  const [layout, setLayout] = useState(false);
  const [tourList, setTourList] = useState<ITour[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 0]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState({
    ...Object.fromEntries(searchParams.entries()),
    SortBy: searchParams.get('SortBy') || 'releaseDate',
    IsDescending: Boolean(searchParams.get('IsDescending')) || true,
    MinPrice: searchParams.get('MinPrice') || 0,
    Keyword: searchParams.get('Keyword') || '',
  });
  const location = useLocation();

  const elementRef = useRef<HTMLDivElement | null>(null);

  function onIntersection(entries: IntersectionObserverEntry[]) {
    const firstEntry = entries[0];

    if (firstEntry.isIntersecting && hasMore) {
      setPage((prev) => prev + 1);
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

  useEffect(() => {
    if (signalTour) {
      setTourList((prev) => {
        switch (signalTour.type) {
          case 'CREATE':
            return [signalTour.data, ...prev];
          case 'UPDATE':
            return prev.map((tour) =>
              tour.id === signalTour.data.id ? signalTour.data : tour
            );
          case 'DELETE':
            return prev.filter((tour) => tour.id !== signalTour.data.id);
          default:
            return prev;
        }
      });
    }
  }, [signalTour]);

  useLayoutEffect(() => {
    setTourList([]);
    setPage(1);
    setHasMore(false);
    setIsLoading(true);
  }, [meta]);

  const getSearchItems = async () => {
    try {
      const data = await tourService.getTourSearch({
        ...meta,
        pageNumber: page,
        pageSize: 4,
      });

      setHasMore(data.result.tours.length > 0);
      setTourList((prev) => [...prev, ...data.result.tours]);
      setPriceRange([data.result.minPrice, data.result.maxPrice]);
      handleChangeLocation();
      setIsLoading(false);
    } catch (error) {
      logError(error);
    }
  };

  useEffect(() => {
    getSearchItems();
  }, [meta, page]);

  function handleSortBy(meta: any) {
    setMeta(meta);
  }

  function handleChangeLocation() {
    for (const key in meta) {
      let value = meta[key as keyof typeof meta] as any;
      let newKey = capitalize(key);

      if (newKey === 'PageSize') continue;

      if (!value && newKey !== 'MinPrice') {
        searchParams.delete(newKey);
        continue;
      }

      if (!value && newKey !== 'MaxPrice') {
        searchParams.delete(newKey);
        continue;
      }

      if (newKey === 'Destinations') {
        value = [value].filter((item: any) => item !== null || item) || [];
        if (value.length > 0) {
          searchParams.set(newKey, value);
        }
        continue;
      }

      if (newKey === 'Activities') {
        value = [value].filter((item: any) => item !== null || item) || [];
        if (value.length > 0) {
          searchParams.set(newKey, value);
        }
        continue;
      }
      searchParams.set(newKey, value);
    }

    const newUrl = location.pathname + '?' + searchParams.toString();

    window.history.pushState({ path: newUrl }, '', newUrl);
  }

  return (
    <Container>
      <Styles.TourSearchContentWrapper>
        <Row gutter={[60, 60]}>
          <Col xs={24} md={24} xl={8}>
            <TourSearchContentForm
              defaultValuePriceRange={priceRange}
              meta={meta}
              setMeta={(meta: any) => {
                setMeta(meta);
              }}
            />
          </Col>
          <Col xs={24} md={24} xl={16}>
            <Styles.TourSearchContentRight>
              <TourSearchContentSort
                layout={layout}
                setLayout={setLayout}
                meta={meta}
                handleSortBy={handleSortBy}
              />

              {!isLoading ? (
                <>
                  {!layout ? (
                    <Row gutter={[20, 20]}>
                      {tourList.map((freshlyAdded, idx) => (
                        <Col xs={24} sm={12} key={freshlyAdded.id + idx}>
                          <FreshlyAdded {...freshlyAdded} maxWidth={'100%'} />
                        </Col>
                      ))}
                    </Row>
                  ) : (
                    tourList.map((freshlyAdded, idx) => (
                      <FreshlyAddedV2
                        {...freshlyAdded}
                        key={freshlyAdded.id + idx}
                        maxWidth={'100%'}
                      />
                    ))
                  )}
                  {hasMore && <div ref={elementRef}></div>}
                </>
              ) : !layout ? (
                <Row gutter={[20, 20]}>
                  {[1, 2, 3, 4, 5, 6].map((item, idx) => (
                    <Col xs={24} sm={12} key={item + idx}>
                      <FreshlyAddedStyled.CardWrapper $maxWidth={'100%'}>
                        <FreshlyAddedStyled.SkeletonImg active />
                        <FreshlyAddedStyled.CardInfo>
                          <FreshlyAddedStyled.SkeletonTitle active />
                        </FreshlyAddedStyled.CardInfo>
                      </FreshlyAddedStyled.CardWrapper>
                    </Col>
                  ))}
                </Row>
              ) : (
                [1, 2, 3, 4, 5, 6].map((item, idx) => (
                  <Col xs={24} sm={12} key={item + idx}>
                    <FreshlyAddedStyledV2.CardWrapper $maxWidth={'100%'}>
                      <FreshlyAddedStyledV2.SkeletonImg active />
                      <FreshlyAddedStyledV2.CardInfo>
                        <FreshlyAddedStyledV2.SkeletonTitle active />
                      </FreshlyAddedStyledV2.CardInfo>
                    </FreshlyAddedStyledV2.CardWrapper>
                  </Col>
                ))
              )}
            </Styles.TourSearchContentRight>
          </Col>
        </Row>
      </Styles.TourSearchContentWrapper>
    </Container>
  );
};

export default TourSearchContent;
