import AboutUs from '@/components/AboutUs';
import BookWithUs from '@/components/BookWithUs';
import ContactUs from '@/components/ContactUs';
import CustomerReviews from '@/components/CustomerReviews';
import { Destinations } from '@/components/Destinations';
import FreshlyAddeds from '@/components/FreshlyAddeds';
import PopularTours from '@/components/PopularTours';

const Homepage = () => {
  return (
    <>
      <BookWithUs></BookWithUs>
      <Destinations></Destinations>
      <PopularTours></PopularTours>
      <FreshlyAddeds></FreshlyAddeds>
      <ContactUs></ContactUs>
      <CustomerReviews></CustomerReviews>
      <AboutUs></AboutUs>
    </>
  );
};

export default Homepage;
