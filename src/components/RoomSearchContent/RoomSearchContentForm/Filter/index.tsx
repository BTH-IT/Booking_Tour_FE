import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import * as Styles from './styles';
import { BiFilterAlt } from 'react-icons/bi';
import { useRef, useState } from 'react';
import FilterList from './FilterList';
import { Checkbox, Rate } from 'antd';
import { useSearchParams } from 'react-router-dom';
import { CheckboxChangeEvent, CheckboxRef } from 'antd/es/checkbox';
import { ILocation } from 'destination';

const Filter = ({
  meta,
  setMeta,
  data,
}: {
  meta: any;
  setMeta: (meta: any) => void;
  data: any;
}) => {
  const [isShow, setIsShow] = useState(true);
  const [rate, setRate] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const inputRef = useRef<CheckboxRef | null>(null);
  function handleFilterRating(e: CheckboxChangeEvent) {
    if (e.target.checked) {
      searchParams.set('rate', `${rate}`);
      setMeta({
        ...meta,
        rate,
      });
    } else {
      const { rate, ...rest } = meta;
      searchParams.delete('rate');
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
            <Checkbox name="rate" onChange={handleFilterRating} ref={inputRef}>
              {''}
            </Checkbox>
            <Rate
              allowHalf
              onChange={(value) => {
                setRate(value);
                if (inputRef.current && inputRef.current.input?.checked) {
                  searchParams.set('rate', `${value}`);
                  setMeta({
                    ...meta,
                    rate,
                  });
                }
              }}
            />
          </Styles.FilterListContent>
        </Styles.FilterListWrapper>
      </Styles.ShowFilterList>
      <FilterList
        setMeta={setMeta}
        meta={meta}
        name="locationCode"
        title={'Location'}
        placeHolder="Select Destination"
        optionList={data.loc.map((location: ILocation) => ({
          label: location.name,
          value: location.code.toString(),
        }))}
        useId
      />
      <FilterList
        setMeta={setMeta}
        meta={meta}
        name="roomAmenities"
        title={'Room Amenities'}
        placeHolder="Select Room Amenities"
        optionList={data.roomAmenities.map((amenity: any) => ({
          label: amenity,
          value: amenity,
        }))}
      />
      <FilterList
        setMeta={setMeta}
        meta={meta}
        name="hotelAmenities"
        title={'Hotel Amenities'}
        placeHolder="Select Hotel Amenities"
        optionList={data.hotelAmenities.map((amenity: any) => ({
          label: amenity,
          value: amenity,
        }))}
      />
      <FilterList
        setMeta={setMeta}
        meta={meta}
        name="hotelRules"
        title={'Hotel Rules'}
        placeHolder="Select Hotel Rules"
        optionList={data.hotelRules.map((rule: any) => ({
          label: rule,
          value: rule,
        }))}
      />
    </Styles.FilterWrapper>
  );
};

export default Filter;
