import AboutUs from '@/components/AboutUs';
import BookWithUs from '@/components/BookWithUs';
import ContactUs from '@/components/ContactUs';
import CustomerReviews from '@/components/CustomerReviews';
import { Destinations } from '@/components/Destinations';
import FreshlyAdded from '@/components/FreshlyAdded';
import PopularTours from '@/components/PopularTours';

const Homepage = () => {
  return (
    <>
      <BookWithUs></BookWithUs>
      <Destinations></Destinations>
      <PopularTours></PopularTours>
      <FreshlyAdded></FreshlyAdded>
      <ContactUs></ContactUs>
      <CustomerReviews></CustomerReviews>
      <AboutUs></AboutUs>
    </>
  );
};

export default Homepage;
