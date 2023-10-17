import { MouseEvent, useEffect, useRef, useState } from 'react';
import * as Styles from './styles';

const TourDetailNav = () => {
  const navItemRef = useRef<HTMLAnchorElement | null>(null);
  const [coords, setCoords] = useState({
    left: 0,
    width: 0,
  });

  const [coordsActive, setCoordsActive] = useState({
    left: 0,
    width: 0,
  });

  const handleMouseEnter = (e: MouseEvent) => {
    setCoords({
      left: (e.target as HTMLAnchorElement).offsetLeft,
      width: (e.target as HTMLAnchorElement).clientWidth,
    });
  };

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    const anchorEle = e.target as HTMLAnchorElement;

    anchorEle.parentElement
      ?.querySelector('.active')
      ?.classList.remove('active');

    anchorEle.classList.add('active');

    setCoords({
      left: anchorEle.offsetLeft,
      width: anchorEle.clientWidth,
    });

    setCoordsActive({
      left: (e.target as HTMLAnchorElement).offsetLeft,
      width: (e.target as HTMLAnchorElement).clientWidth,
    });

    const id = anchorEle.href.split('#')[1];
    const element = document.getElementById(id);

    if (!element) return;

    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  const handleMouseLeave = () => {
    setCoords(coordsActive);
  };

  useEffect(() => {
    if (navItemRef.current && navItemRef) {
      setCoords({
        left: navItemRef.current.offsetLeft,
        width: navItemRef.current.clientWidth,
      });

      setCoordsActive({
        left: navItemRef.current.offsetLeft,
        width: navItemRef.current.clientWidth,
      });
    }
  }, []);

  return (
    <Styles.TourDetailNavWrapper>
      <Styles.TourDetailNav>
        <Styles.TourDetailNavItem
          onMouseEnter={handleMouseEnter}
          onClick={handleClick}
          onMouseLeave={handleMouseLeave}
          ref={navItemRef}
          className="active"
          href="#detail"
        >
          Detail
        </Styles.TourDetailNavItem>
        <Styles.TourDetailNavItem
          onMouseEnter={handleMouseEnter}
          onClick={handleClick}
          onMouseLeave={handleMouseLeave}
          href="#itinerary"
        >
          Itinerary
        </Styles.TourDetailNavItem>
        <Styles.TourDetailNavItem
          onMouseEnter={handleMouseEnter}
          onClick={handleClick}
          onMouseLeave={handleMouseLeave}
          href="#map"
        >
          Map
        </Styles.TourDetailNavItem>
        <Styles.TourDetailNavItem
          onMouseEnter={handleMouseEnter}
          onClick={handleClick}
          onMouseLeave={handleMouseLeave}
          href="#faq"
        >
          FAQ
        </Styles.TourDetailNavItem>
        <Styles.TourDetailNavItem
          onMouseEnter={handleMouseEnter}
          onClick={handleClick}
          onMouseLeave={handleMouseLeave}
          href="#reviews"
        >
          Reviews
        </Styles.TourDetailNavItem>
        <Styles.TourDetailNavLine coords={coords} />
      </Styles.TourDetailNav>
    </Styles.TourDetailNavWrapper>
  );
};

export default TourDetailNav;
