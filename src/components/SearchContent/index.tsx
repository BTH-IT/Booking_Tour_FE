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
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

const SearchContent = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [layout, setLayout] = useState(false);
  const [tourList, setTourList] = useState<ITour[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 0]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState({
    type: searchParams.get('type') || 'releaseDate',
    order: searchParams.get('order') || 'desc',
    search: searchParams.get('search') || '',
    dateFrom: searchParams.get('dateFrom') || '',
    dateTo: searchParams.get('dateTo') || '',
    priceFrom: searchParams.get('priceFrom') || 0,
    priceTo: searchParams.get('priceTo') || 0,
    destination: searchParams.get('destination')?.split('%2') || [],
    activities: searchParams.get('activities')?.split('%2') || [],
  });
  const location = useLocation();
  const navigate = useNavigate();

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
    setTourList([]);
    setPage(1);
    setHasMore(false);
  }, [meta]);

  const getSearchItems = async () => {
    const data = await tourService.getAllTour({
      ...meta,
      _page: page,
    });
    setHasMore(data.tours.length > 0);
    setTourList((prev) => [...prev, ...data.tours]);
    setPriceRange([data.minPrice, data.maxPrice]);
    handleChangeLocation();
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
      if (!value && key !== 'priceFrom') {
        searchParams.delete(key);
        continue;
      }

      if (key === 'destination') {
        value = value.filter((item: any) => item !== null || item);
        if (value.length > 0) {
          searchParams.set(key, value.join('%2'));
        }
        continue;
      }

      if (key === 'activities') {
        value = value.filter((item: any) => item !== null || item);
        if (value.length > 0) {
          searchParams.set(key, value.join('%2'));
        }
        continue;
      }
      searchParams.set(key, value);
    }

    navigate(location.pathname + '?' + searchParams.toString(), {
      replace: true,
    });
  }

  return (
    <Container>
      <Styles.SearchContentWrapper>
        <Row gutter={[60, 60]}>
          <Col xs={24} md={24} xl={8}>
            <SearchContentForm
              defaultValuePriceRange={priceRange}
              meta={meta}
              setMeta={(meta: any) => {
                setMeta(meta);
              }}
            />
          </Col>
          <Col xs={24} md={24} xl={16}>
            <Styles.SearchContentRight>
              <SearchContentSort
                layout={layout}
                setLayout={setLayout}
                meta={meta}
                handleSortBy={handleSortBy}
              />
              {!layout ? (
                <Row gutter={[20, 20]}>
                  {tourList.map((freshlyAdded, idx) => (
                    <Col xs={24} sm={12} key={freshlyAdded._id + idx}>
                      <FreshlyAdded {...freshlyAdded} maxWidth={'100%'} />
                    </Col>
                  ))}
                </Row>
              ) : (
                tourList.map((freshlyAdded, idx) => (
                  <FreshlyAddedV2
                    {...freshlyAdded}
                    key={freshlyAdded._id + idx}
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
