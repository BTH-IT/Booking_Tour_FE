import React from 'react';
import * as Styles from './styles';
import { Select } from 'antd';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import { BsFillGrid3X3GapFill } from 'react-icons/bs';

const SearchContentSort = ({
  layout,
  setLayout,
  meta,
  handleSortBy,
}: {
  layout: boolean;
  setLayout: React.Dispatch<React.SetStateAction<boolean>>;
  meta: any;
  handleSortBy: (meta: any) => void;
}) => {
  return (
    <Styles.SearchContentSortWrapper>
      <span>Sort by</span>
      <Select
        size="middle"
        defaultValue={meta.type || 'releaseDate'}
        onChange={(value) => {
          handleSortBy({
            ...meta,
            type: value,
          });
        }}
        options={[
          {
            value: 'releaseDate',
            label: 'Release Date',
          },
          {
            value: 'tourDate',
            label: 'Tour Date',
          },
          {
            value: 'name',
            label: 'Name',
          },
          {
            value: 'price',
            label: 'Price',
          },
          {
            value: 'rating',
            label: 'Rating',
          },
        ]}
        bordered={false}
      />
      <Select
        size="middle"
        defaultValue={meta.order || 'desc'}
        onChange={(value) => {
          handleSortBy({
            ...meta,
            order: value,
          });
        }}
        options={[
          {
            value: 'desc',
            label: 'Descending',
          },
          {
            value: 'asc',
            label: 'Ascending',
          },
        ]}
        bordered={false}
      />
      <Styles.SearchContentSortLayout>
        <AiOutlineUnorderedList
          className={`${layout ? 'active' : ''}`}
          onClick={() => {
            if (layout) return;

            setLayout(true);
          }}
        />
        <BsFillGrid3X3GapFill
          className={`${!layout ? 'active' : ''}`}
          onClick={() => {
            if (!layout) return;

            setLayout(false);
          }}
        />
      </Styles.SearchContentSortLayout>
    </Styles.SearchContentSortWrapper>
  );
};

export default SearchContentSort;
