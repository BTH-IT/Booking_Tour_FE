import SearchForm from "./SearchForm";
import * as Styles from "./styles";

const BookWithUs = () => {
  return (
    <Styles.BookWithUsWrapper>
      <Styles.BookWithUsContent>
        <Styles.BookWithUsTag>Book With Us!</Styles.BookWithUsTag>
        <Styles.BookWithUsTitle>
          Find Next Place <br></br>To <span>Visit</span>
        </Styles.BookWithUsTitle>
        <Styles.BookWithUsDesc>
          Discover amzaing places at exclusive deals. <br></br> Eat, Shop, Visit
          interesting places around the world.
        </Styles.BookWithUsDesc>
        <SearchForm></SearchForm>
        <Styles.BookWithUsImage
          src="./hero-right.jpg"
          alt="background"
        ></Styles.BookWithUsImage>
      </Styles.BookWithUsContent>
      <Styles.BookWithUsBackground
        src="./hero.svg"
        alt="background"
      ></Styles.BookWithUsBackground>
    </Styles.BookWithUsWrapper>
  );
};

export default BookWithUs;
