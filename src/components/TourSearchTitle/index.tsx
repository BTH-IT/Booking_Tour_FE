import React from 'react';
import * as Styles from './styles';

const TourSearchTitle = ({
  children = 'Search Tours',
  secondChildren = 'Our Tours',
  backgroundImg = '',
}: {
  children?: React.ReactNode;
  secondChildren?: React.ReactNode;
  backgroundImg?: string;
}) => {
  return (
    <Styles.BackgroundWrapper $backgroundImg={backgroundImg}>
      <Styles.TourSearchTitleWrapper>{children}</Styles.TourSearchTitleWrapper>
      <Styles.TourSecondTitleWrapper>
        {secondChildren}
      </Styles.TourSecondTitleWrapper>
    </Styles.BackgroundWrapper>
  );
};

export default TourSearchTitle;
