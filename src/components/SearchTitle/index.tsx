import React from 'react';
import * as Styles from './styles';

const SearchTitle = ({
  children = 'Search Tours',
  backgroundImg = "",
}: {
  children?: React.ReactNode;
  backgroundImg?: string;
}) => {
  return <Styles.SearchTitleWrapper $backgroundImg={backgroundImg}>{children}</Styles.SearchTitleWrapper>;
};

export default SearchTitle;
