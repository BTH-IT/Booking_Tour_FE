'use client';

import { useEffect, useState } from 'react';
import { Checkbox, Select, Space } from 'antd';
import { BsChevronCompactDown, BsChevronCompactUp } from 'react-icons/bs';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useSearchParams } from 'react-router-dom';

const FilterList = ({
  name,
  title,
  placeHolder,
  optionList,
  meta,
  setMeta,
}: {
  name: string;
  title: string;
  placeHolder: string;
  optionList: any;
  meta: any;
  setMeta: (meta: any) => void;
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [defaultOption, setDefaultOption] = useState<string[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  const handleSelect = (selectedOption: string[]) => {
    const query = searchParams.get(name) || '';

    console.log(query);
    console.log('selectedOption', selectedOption);

    if (query !== '' && selectedOption.length === 0) {
      console.log(name);

      searchParams.delete(name);

      const updatedMeta = Object.fromEntries(
        Object.entries(meta).filter(([key]) => key !== name),
      );

      console.log(updatedMeta);

      setMeta(updatedMeta);
    }
    if (query === '') {
      searchParams.set(name, selectedOption[0]);
      setMeta({
        ...meta,
        [name]: selectedOption[0],
      });
    } else {
      const newParams = selectedOption.join('%2');
      console.log(newParams);

      searchParams.set(name, newParams);
      setMeta({
        ...meta,
        [name]: newParams,
      });
    }
  };

  useEffect(() => {
    const query = searchParams.get(name) || '';
    const value = query.split('%2').filter((item) => item !== null || item);

    setDefaultOption(value[0] !== '' ? value : []);
    console.log(defaultOption);

    setIsMounted(true);
  }, [searchParams]);

  return (
    <>
      <h4 className="text-[1.6rem] font-semibold mt-[20px]">{title}</h4>
      {isMounted && (
        <Select
          mode="multiple"
          allowClear
          size="large"
          placeholder={placeHolder}
          defaultValue={defaultOption}
          onChange={handleSelect}
          options={optionList}
          className="w-full"
          virtual={false}
        />
      )}
    </>
  );
};

export default FilterList;
