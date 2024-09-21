import * as Styles from "./styles";
import CustomerReview from "../Card/CustomerReview";
import SliderBase from "../Slider/SliderBase";
import Slider from "react-slick";
import { useState } from "react";
import tourService from "@/services/TourService";
import { toast } from "react-toastify";
import useDidMount from "@/hooks/useDidMount";
import { ITour } from "tour";
import { IUser } from "user";
import { IReview } from "../Reviews";

const customerReviews = [
  {
    avatar:
      "https://demo.goodlayers.com/traveltour/homepages/main5/wp-content/uploads/sites/6/2022/07/P01-150x150.jpg",
    rate: 5,
    fullname: "David",
    content:
      "The tours in this website are great. I had been really enjoy with my family! The team is very professional and taking care of the customers. Will surely recommend to my freind to join this company!",
  },
  {
    avatar:
      "https://demo.goodlayers.com/traveltour/homepages/main5/wp-content/uploads/sites/6/2022/07/P02-150x150.jpg",
    rate: 5,
    fullname: "Brittany Clark",
    content:
      "The tours in this website are great. I had been really enjoy with my family! The team is very professional and taking care of the customers. Will surely recommend to my freind to join this company!",
  },
  {
    avatar:
      "https://demo.goodlayers.com/traveltour/homepages/main5/wp-content/uploads/sites/6/2022/07/P07-150x150.jpg",
    rate: 5,
    fullname: "Frances Hill",
    content:
      "The tours in this website are great. I had been really enjoy with my family! The team is very professional and taking care of the customers. Will surely recommend to my freind to join this company!",
  },
  {
    avatar:
      "https://demo.goodlayers.com/traveltour/homepages/main5/wp-content/uploads/sites/6/2022/07/P04-150x150.jpg",
    rate: 5,
    fullname: "Jennth Norz",
    content:
      "The tours in this website are great. I had been really enjoy with my family! The team is very professional and taking care of the customers. Will surely recommend to my freind to join this company!",
  },
];

const settings = {
  className: "center",
  centerMode: true,
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 2,
  slidesToScroll: 3,
  initialSlide: 0,
  variableWidth: true,
  responsive: [
    {
      breakpoint: 1600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

export type CustomerReviews = IReview & {
  user: IUser;
};

const CustomerReviews = () => {
  const [reviews, setReviews] = useState<CustomerReviews[]>([]);

  async function handleFetchReviews() {
    try {
      const data = await tourService.getAllReviews();
      setReviews(data);
    } catch {
      toast.error("Oops!! Something is wrong");
    }
  }

  useDidMount(() => {
    handleFetchReviews();
  });

  return (
    <Styles.CustomerReviewsWrapper>
      <Styles.CustomerReviewsTitle>
        What our customers are saying about us
      </Styles.CustomerReviewsTitle>

      <Slider {...settings}>
        {reviews.map((customerReview) => (
          <CustomerReview
            key={customerReview.id}
            fullname={customerReview.user.fullname}
            rate={customerReview.rating}
            content={customerReview.content}
            avatar={customerReview.user.picture || "/avatar.png"}
          />
        ))}
      </Slider>
    </Styles.CustomerReviewsWrapper>
  );
};

export default CustomerReviews;
