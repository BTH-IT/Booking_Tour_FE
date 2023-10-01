import React from 'react';
import * as Styles from './styles';

const SearchTitle = ({
  children = 'Search Tours',
}: {
  children?: React.ReactNode;
}) => {
  return <Styles.SearchTitleWrapper>{children}</Styles.SearchTitleWrapper>;
};

export default SearchTitle;
