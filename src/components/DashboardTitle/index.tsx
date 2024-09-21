import React from "react";
import * as Styles from "./styles";

const DashboardTitle = ({
  children = "Dashboard",
  backgroundImg = "",
}: {
  children?: React.ReactNode;
  backgroundImg?: string;
}) => {
  return (
    <Styles.DashboardTitleWrapper $backgroundImg={backgroundImg}>
      {children}
    </Styles.DashboardTitleWrapper>
  );
};

export default DashboardTitle;
