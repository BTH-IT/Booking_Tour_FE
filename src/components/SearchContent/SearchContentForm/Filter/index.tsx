import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import * as Styles from './styles';
import { BiFilterAlt } from 'react-icons/bi';
import { useState } from 'react';
import FilterList from './FilterList';

const Filter = () => {
  const [show, setShow] = useState(true);

  return (
    <Styles.FilterWrapper>
      <Styles.FilterHeader>
        <Styles.FilterTitle>
          <BiFilterAlt />
          <span>Filter</span>
        </Styles.FilterTitle>
        <Styles.FilterHeaderIcon onClick={() => setShow(!show)}>
          {show ? <AiOutlineMinus /> : <AiOutlinePlus />}
        </Styles.FilterHeaderIcon>
      </Styles.FilterHeader>
      <Styles.ShowFilterList className={`${show && 'active'}`}>
        <FilterList title={'Tour Age'} checkboxList={['10+', '12+', '15+']} />
        <FilterList
          title={'Activities'}
          checkboxList={[
            'City Tours',
            'Cultural & Thematic Tours',
            'Family Friendly Tours',
            'Holiday & Seasonal Tours',
            'Indulgence & Luxury Tours',
            'Outdoor Activites',
            'Relaxation Tours',
            'Wild & Adventure Tours',
          ]}
        />
        <FilterList
          title={'Destination'}
          checkboxList={[
            'America',
            'Asia',
            'Egypt',
            'Scandinavia',
            'South Africa',
            'Western Europe',
          ]}
        />
      </Styles.ShowFilterList>
    </Styles.FilterWrapper>
  );
};

export default Filter;
