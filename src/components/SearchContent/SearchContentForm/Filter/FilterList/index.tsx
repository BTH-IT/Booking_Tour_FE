import * as Styles from './styles';
import { useState } from 'react';
import { Checkbox } from 'antd';
import { BsChevronCompactDown, BsChevronCompactUp } from 'react-icons/bs';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useLocation, useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';

const FilterList = ({
  name,
  title,
  checkboxList,
  meta,
  setMeta,
}: {
  name: string;
  title: string;
  checkboxList: string[];
  meta: any;
  setMeta: (meta: any) => void;
}) => {
  const [showMore, setShowMore] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  function handleCheckbox(e: CheckboxChangeEvent) {
    const query = searchParams.get(name) || '';
    if (query !== '') {
      let value = query.split('%2').filter((item) => item !== null || item);
      let isHave = value.findIndex((item) => item === e.target.value);

      if (e.target.checked) {
        if (isHave !== -1) {
          value = value.filter((item) => item !== e.target.value);
        } else {
          value.push(e.target.value);
        }
        searchParams.set(name, value.join('%2'));

        setMeta({
          ...meta,
          [name]: e.target.value,
        });
      } else {
        value = value.filter((item) => item !== e.target.value);
        if (value.length === 0) {
          searchParams.delete(name);
          setMeta(
            Object.fromEntries(
              Object.entries(meta).filter(([key]) => key !== name),
            ),
          );
        } else {
          searchParams.set(name, value.join('%2'));
          setMeta({
            ...meta,
            [name]: e.target.value,
          });
        }
      }
    } else {
      if (e.target.checked) {
        searchParams.set(name, e.target.value);
        setMeta({
          ...meta,
          [name]: e.target.value,
        });
      } else {
        searchParams.delete(name);

        setMeta(
          Object.fromEntries(
            Object.entries(meta).filter(([key]) => key !== name),
          ),
        );
      }
    }
  }

  return (
    <Styles.FilterListWrapper>
      <Styles.FilterListTitle>{title}</Styles.FilterListTitle>
      <Styles.FilterListContent>
        {showMore
          ? checkboxList.map((checkbox) => (
              <Checkbox
                key={checkbox}
                value={checkbox}
                onChange={handleCheckbox}
              >
                {checkbox}
              </Checkbox>
            ))
          : checkboxList.slice(0, 5).map((checkbox) => (
              <Checkbox
                key={checkbox}
                value={checkbox}
                onChange={handleCheckbox}
              >
                {checkbox}
              </Checkbox>
            ))}

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
