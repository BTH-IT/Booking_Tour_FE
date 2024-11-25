import AboutUs from '@/components/AboutUs';
import BookWithUs from '@/components/BookWithUs';
import ContactUs from '@/components/ContactUs';
import FreshlyAddeds from '@/components/FreshlyAddeds';
import PopularTours from '@/components/PopularTours';

const Homepage = () => {
  return (
    <>
      <BookWithUs />
      <PopularTours />
      <FreshlyAddeds />
      <ContactUs />
      <AboutUs />
    </>
  );
};

export default Homepage;
