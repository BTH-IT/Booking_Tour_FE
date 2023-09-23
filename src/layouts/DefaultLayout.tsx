import { Outlet } from 'react-router';

import Header from './Header';
import Footer from './Footer';

const DefaultLayout = () => {
  return (
    <div>
      <Header></Header>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default DefaultLayout;
