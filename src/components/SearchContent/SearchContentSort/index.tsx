import React, { useState } from 'react';
import * as Styles from './styles';
import { Form, Select } from 'antd';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import { BsFillGrid3X3GapFill } from 'react-icons/bs';

const SearchContentSort = ({
  layout,
  setLayout,
}: {
  layout: boolean;
  setLayout: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Styles.SearchContentSortWrapper>
      <span>Sort by</span>
      <Select
        size="middle"
        defaultValue="1"
        options={[
          {
            value: '1',
            label: 'Release Date',
          },
          {
            value: '2',
            label: 'Tour Date',
          },
          {
            value: '3',
            label: 'Title',
          },
          {
            value: '4',
            label: 'Price',
          },
          {
            value: '5',
            label: 'Popularity',
          },
          {
            value: '6',
            label: 'Rating',
          },
          {
            value: '7',
            label: 'Duration',
          },
        ]}
        bordered={false}
      />
      <Select
        size="middle"
        defaultValue="1"
        options={[
          {
            value: '1',
            label: 'Descending',
          },
          {
            value: '2',
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
