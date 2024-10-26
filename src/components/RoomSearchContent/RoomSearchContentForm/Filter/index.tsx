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
  locations,
}: {
  meta: any;
  setMeta: (meta: any) => void;
  locations: ILocation[];
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
        <FilterList
          setMeta={setMeta}
          meta={meta}
          name="location"
          title={'Location'}
          placeHolder="Select Destination"
          optionList={locations.map((loc) => {
            return {
              label: loc.name,
              value: loc.name,
            };
          })}
        />
        {/* <FilterList
          setMeta={setMeta}
          meta={meta}
          name="destination"
          title={'Destination'}
          optionList={[
            'America',
            'Asia',
            'Egypt',
            'Scandinavia',
            'South Africa',
            'Western Europe',
          ]}
        /> */}
      </Styles.ShowFilterList>
    </Styles.FilterWrapper>
  );
};

export default Filter;
