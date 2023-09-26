import * as Styles from './styles';
import { useState } from 'react';
import { Checkbox } from 'antd';
import { BsChevronCompactDown, BsChevronCompactUp } from 'react-icons/bs';

const FilterList = ({
  title,
  checkboxList,
}: {
  title: string;
  checkboxList: string[];
}) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <Styles.FilterListWrapper>
      <Styles.FilterListTitle>{title}</Styles.FilterListTitle>
      <Styles.FilterListContent>
        {showMore &&
          checkboxList.map((checkbox) => (
            <Checkbox key={checkbox}>{checkbox}</Checkbox>
          ))}

        {!showMore &&
          checkboxList
            .slice(0, 5)
            .map((checkbox) => <Checkbox key={checkbox}>{checkbox}</Checkbox>)}

        {checkboxList.length > 5 && (
          <Styles.FilterListContentShowMore
            onClick={() => setShowMore((prev) => !prev)}
          >
            {showMore ? (
              <>
                Hide <BsChevronCompactUp />
              </>
            ) : (
              <>
                More <BsChevronCompactDown />
              </>
            )}
          </Styles.FilterListContentShowMore>
        )}
      </Styles.FilterListContent>
    </Styles.FilterListWrapper>
  );
};

export default FilterList;
