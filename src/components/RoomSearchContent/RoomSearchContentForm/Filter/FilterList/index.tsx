import { useEffect, useState } from 'react';
import Select, { MultiValue } from 'react-select';
import { useSearchParams } from 'react-router-dom';

const FilterList = ({
  name,
  title,
  placeHolder,
  optionList,
  meta,
  setMeta,
  useId = false,
}: {
  name: string;
  title: string;
  placeHolder: string;
  optionList: any;
  meta: any;
  setMeta: (meta: any) => void;
  useId?: boolean;
}) => {
  console.log(optionList);

  const [searchParams, setSearchParams] = useSearchParams();
  const [defaultOption, setDefaultOption] = useState<
    {
      label: string;
      value: string;
    }[]
  >([]);
  const [isMounted, setIsMounted] = useState(false);

  const handleSelect = (
    selectedOption: MultiValue<{ label: string; value: string }>,
  ) => {
    console.log(selectedOption);

    const query = searchParams.get(name) || '';

    if (query !== '' && selectedOption.length === 0) {
      searchParams.delete(name);

      const updatedMeta = Object.fromEntries(
        Object.entries(meta).filter(([key]) => key !== name),
      );

      console.log(updatedMeta);

      setMeta(updatedMeta);
    }
    if (query === '') {
      searchParams.set(name, selectedOption[0].value);
      setMeta({
        ...meta,
        [name]: selectedOption[0].value,
      });
    } else {
      const newParams = selectedOption.map((option) => option.value).join('%2');
      console.log(newParams);

      searchParams.set(name, newParams);
      setMeta({
        ...meta,
        [name]: newParams,
      });
    }
  };

  const generateDefaultOption = (value: string[]) => {
    if (useId) {
      if (value[0] !== '') {
        return value.map((v: string) => {
          return {
            label: `${
              optionList.find((option: any) => option.value === v)?.label
            }`,
            value: v,
          };
        });
      }
      return [];
    } else {
      if (value[0] !== '') {
        return value.map((v) => {
          return {
            label: v,
            value: v,
          };
        });
      }
      return [];
    }
  };

  useEffect(() => {
    const query = searchParams.get(name) || '';
    const value = query.split('%2').filter((item) => item !== null || item);
    const defaultOption = generateDefaultOption(value);
    setDefaultOption(defaultOption);
    console.log(defaultOption);

    setIsMounted(true);
  }, [searchParams]);

  return (
    <div>
      <h4 className="text-[1.6rem] font-semibold py-[10px]">{title}</h4>
      {isMounted && (
        <Select
          isMulti
          isClearable
          isSearchable
          placeholder={placeHolder}
          onChange={handleSelect}
          options={optionList}
          defaultValue={defaultOption}
          className=""
        />
      )}
    </div>
  );
};

export default FilterList;
