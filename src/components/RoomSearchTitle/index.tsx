import React from 'react';
import * as Styles from './styles';

const RoomSearchTitle = ({
  children = 'Search Rooms',
  secondChildren = 'Our Rooms',
  backgroundImg = '',
}: {
  children?: React.ReactNode;
  secondChildren?: React.ReactNode;
  backgroundImg?: string;
}) => {
  return (
    <Styles.BackgroundWrapper $backgroundImg={backgroundImg}>
      <Styles.RoomSearchTitleWrapper>{children}</Styles.RoomSearchTitleWrapper>
      <Styles.RoomSecondTitleWrapper>
        {secondChildren}
      </Styles.RoomSecondTitleWrapper>
    </Styles.BackgroundWrapper>
  );
};

export default RoomSearchTitle;
