import * as Styles from './styles';
import { Container } from '@/constants';
import { Col, Row } from 'antd';
import RoomSearchContentForm from './RoomSearchContentForm';
import RoomSearchContentSort from './RoomSearchContentSort';
import RoomFreshlyAdded from '../Card/RoomFreshlyAdded';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import RoomFreshlyAddedV2 from '../Card/RoomFreshlyAddedV2';
import roomService from '@/services/RoomService';
import { IRoom } from 'room';
import { useLocation, useSearchParams } from 'react-router-dom';
import * as FreshlyAddedStyled from '../Card/FreshlyAdded/style';
import * as FreshlyAddedStyledV2 from '../Card/FreshlyAddedV2/style';
import { toast } from 'react-toastify';
import Pagination from '../Pagination';
import { logError } from '@/utils/constants';

const RoomSearchContent = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [layout, setLayout] = useState(false);
  const [roomList, setRoomList] = useState<IRoom[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 0]);
  const [totalResults, setTotalResults] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState({
    ...Object.fromEntries(searchParams.entries()),
    sortBy: searchParams.get('sortBy') || 'releaseDate',
    sortOrder: searchParams.get('sortOrder') || 'desc',
  });
  const location = useLocation();
  const scrollRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    setRoomList([]);
    setIsLoading(true);

    const page = searchParams.get('_page');
    if (page && !isNaN(Number(page))) {
      setPage(parseInt(searchParams.get('_page') || '1'));
    }
  }, [meta]);

  const getSearchItems = async () => {
    try {
      handleChangeLocation();

      const params = {
        ...meta,
        name: searchParams.get('name'),
        locationCode: searchParams.get('locationCode')?.split('%2'),
        maxGuests: searchParams.get('maxGuests'),
        minPrice: Number(searchParams.get('minPrice')) || 0,
        maxPrice: Number(searchParams.get('maxPrice')) || null,
        checkIn: searchParams.get('checkIn'),
        checkOut: searchParams.get('checkOut'),
        roomAmenities: searchParams.get('roomAmenities')?.split('%2'),
        hotelAmenities: searchParams.get('hotelAmenities')?.split('%2'),
        hotelRules: searchParams.get('hotelRules')?.split('%2'),
        pageNumber: page,
        pageSize: 6,
      };

      const data = await roomService.getRoomSearch(params);

      setRoomList(data.result.rooms);
      setPriceRange([data.result.minPrice, data.result.maxPrice]);
      setTotalResults(data.result.totalItems);
      setTotalPages(Math.ceil(data.result.totalItems / data.result.pageSize));
      console.log(page, totalPages);
      setIsLoading(false);
    } catch (error) {
      logError(error);
    }
  };

  const changePageHandler = (page: number) => {
    setPage(page);
    searchParams.set('_page', page.toString());

    if (scrollRef.current) {
      window.scrollBy(0, scrollRef.current.getBoundingClientRect().top - 120); // Adjust the offset value as needed
    }

    const newUrl = location.pathname + '?' + searchParams.toString();
    window.history.pushState({ path: newUrl }, '', newUrl);
  };

  useEffect(() => {
    getSearchItems();
  }, [meta, page]);

  useEffect(() => {
    if (page > totalPages) {
      changePageHandler(totalPages);
    }
  }, [totalPages]);

  function handleSortBy(meta: any) {
    // get key from meta
    searchParams.set(Object.keys(meta)[0], `${Object.values(meta)[0]}`);
    setMeta((prev) => ({
      ...prev,
      ...meta,
    }));
  }

  function handleChangeLocation() {
    for (const key in meta) {
      let value = meta[key as keyof typeof meta] as any;

      switch (key) {
        // non-array values
        case 'name':
        case 'checkIn':
        case 'checkOut':
        case 'maxGuests':
        case 'minPrice':
        case 'maxPrice':
          value
            ? searchParams.set(key, value.toString())
            : searchParams.delete(key);
          break;

        // array values
        case 'locationCode':
        case 'roomAmenities':
        case 'hotelAmenities':
        case 'hotelRules':
          value && value.length > 0 && value !== ''
            ? searchParams.set(key, value.toString())
            : searchParams.delete(key);
          break;

        default:
          break;
      }
    }

    const newUrl = location.pathname + '?' + searchParams.toString();
    window.history.pushState({ path: newUrl }, '', newUrl);
  }

  return (
    <Container>
      <Styles.RoomSearchContentWrapper>
        <Row gutter={[60, 60]}>
          <Col xs={24} md={24} xl={8}>
            <RoomSearchContentForm
              defaultValuePriceRange={priceRange}
              meta={meta}
              setMeta={(meta: any) => {
                setMeta(meta);
              }}
            />
          </Col>
          <Col xs={24} md={24} xl={16}>
            <Styles.RoomSearchContentRight>
              <Styles.ResultCountWrapper ref={scrollRef}>
                {totalResults} Results Found
              </Styles.ResultCountWrapper>
              <RoomSearchContentSort
                layout={layout}
                setLayout={setLayout}
                meta={meta}
                handleSortBy={handleSortBy}
              />

              {!isLoading ? (
                <>
                  {!layout ? (
                    <Row gutter={[20, 20]}>
                      {roomList.map((freshlyAdded, idx) => (
                        <Col xs={24} sm={12} key={freshlyAdded.id + idx}>
                          <RoomFreshlyAdded
                            {...freshlyAdded}
                            maxWidth={'100%'}
                          />
                        </Col>
                      ))}
                    </Row>
                  ) : (
                    roomList.map((freshlyAdded, idx) => (
                      <RoomFreshlyAddedV2
                        {...freshlyAdded}
                        key={freshlyAdded.id + idx}
                        maxWidth={'100%'}
                      />
                    ))
                  )}
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
            </Styles.RoomSearchContentRight>
            {totalResults !== 0 && (
              <Pagination
                currentPage={page}
                setCurrentPage={changePageHandler}
                totalPages={totalPages}
              />
            )}
          </Col>
        </Row>
      </Styles.RoomSearchContentWrapper>
    </Container>
  );
};

export default RoomSearchContent;
