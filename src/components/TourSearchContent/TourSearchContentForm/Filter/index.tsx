import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import * as Styles from './styles';
import { BiFilterAlt } from 'react-icons/bi';
import { useEffect, useRef, useState } from 'react';
import { Checkbox, Rate } from 'antd';
import { useSearchParams } from 'react-router-dom';
import { CheckboxChangeEvent, CheckboxRef } from 'antd/es/checkbox';
import { ILocation } from 'destination';
import FilterList from '@/components/RoomSearchContent/RoomSearchContentForm/Filter/FilterList';

const Filter = ({
  meta,
  setMeta,
  locations,
  activities,
}: {
  meta: any;
  setMeta: (meta: any) => void;
  locations: ILocation[];
  activities: string[];
}) => {
  const [isShow, setIsShow] = useState(true);
  const [rate, setRate] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const inputRef = useRef<CheckboxRef | null>(null);

  useEffect(() => {
    setRate
  }, [searchParams]);

  function handleFilterRating(e: CheckboxChangeEvent) {
    if (e.target.checked) {
      searchParams.set('Rating', `${rate}`);
      setMeta({
        ...meta,
        Rating: rate,
      });
    } else {
      const { rating, ...rest } = meta;
      searchParams.delete('Rating');
      setMeta(rest);
    }
  }

  return (
    <Styles.FilterWrapper>
      <Styles.FilterHeader>
        <Styles.FilterTitle>
          <BiFilterAlt />
          <span>Filter</span>
        </Styles.FilterTitle>
        <Styles.FilterHeaderIcon onClick={() => setIsShow(!isShow)}>
          {isShow ? <AiOutlineMinus /> : <AiOutlinePlus />}
        </Styles.FilterHeaderIcon>
      </Styles.FilterHeader>
      <Styles.ShowFilterList className={`${isShow && 'active'}`}>
        <Styles.FilterListWrapper>
          <Styles.FilterListTitle>Rating</Styles.FilterListTitle>
          <Styles.FilterListContent>
            <Checkbox
              name='Rating'
              onChange={handleFilterRating}
              ref={inputRef}
            >
              {''}
            </Checkbox>
            <Rate
              allowHalf
              onChange={(value) => {
                setRate(value);
                if (inputRef.current && inputRef.current.input?.checked) {
                  searchParams.set('Rating', `${value}`);
                  setMeta({
                    ...meta,
                    rate,
                  });
                }
              }}
            />
          </Styles.FilterListContent>
        </Styles.FilterListWrapper>
        <FilterList
          setMeta={setMeta}
          meta={meta}
          name='Activities'
          title={'Activities'}
          placeHolder='Select activities'
          optionList={activities.map((act) => {
            return {
              label: act,
              value: act,
            };
          })}
        />
        <FilterList
          setMeta={setMeta}
          meta={meta}
          name='Destinations'
          title={'Destinations'}
          placeHolder='Select Destination'
          optionList={locations.map((loc) => {
            return {
              label: loc.name,
              value: loc.name,
            };
          })}
        />
      </Styles.ShowFilterList>
    </Styles.FilterWrapper>
  );
};

export default Filter;
