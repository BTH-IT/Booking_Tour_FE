import * as Styles from './styles';

const NavHeader = () => {
  return (
    <Styles.NavHeaderWrapper>
      <Styles.NavHeaderItem>
        <Styles.NavHeaderItemLink href="/">Home</Styles.NavHeaderItemLink>
      </Styles.NavHeaderItem>
      <Styles.NavHeaderItem>
        <Styles.NavHeaderItemLink href="/search">
          Tour Search
        </Styles.NavHeaderItemLink>
      </Styles.NavHeaderItem>
      <Styles.NavHeaderItem>
        <Styles.NavHeaderItemLink href="/room">
          Room List
        </Styles.NavHeaderItemLink>
      </Styles.NavHeaderItem>
    </Styles.NavHeaderWrapper>
  );
};

export default NavHeader;
