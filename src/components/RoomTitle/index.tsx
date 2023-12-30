import React from 'react';
import * as Styles from './styles';

const RoomTitle = ({
  children = 'Room Tours',
  secondChildren = 'Our Rooms',
  backgroundImg = "",
}: {
  children?: React.ReactNode;
  secondChildren?: React.ReactNode;
  backgroundImg?: string;
}) => {
  return (
    <Styles.BackgroundWrapper $backgroundImg={backgroundImg}>
      <Styles.RoomTitleWrapper>{children}</Styles.RoomTitleWrapper>
      <Styles.RoomSecondTitleWrapper>{secondChildren}</Styles.RoomSecondTitleWrapper>
    </Styles.BackgroundWrapper>
  );
};

export default RoomTitle;
