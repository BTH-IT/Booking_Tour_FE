import Card from '../Card';

export interface ICards {
  img: string;
  title: string;
  star: string;
  sale: string;
  saleOff: string;
  view: string;
  bed: string;
  from: string;
}

const cards: ICards[] = [
  {
    img: 'https://cdn.getyourguide.com/img/tour/5a7aee8d8f0c6.jpeg/99.jpg',
    title: 'Luxury Suite',
    star: '★★★★★',
    view: '(1 Review)',
    bed: 'King Beds',
    from: 'From',
    sale: '$90',
    saleOff: '',
  },
  {
    img: 'https://cdn.getyourguide.com/img/tour/5a7aee8d8f0c6.jpeg/99.jpg',
    title: 'Standard Deluxe',
    star: '★★★★★',
    view: '(1 Review)',
    from: 'From',
    bed: 'King Beds',
    sale: '$75',
    saleOff: '$90',
  },
  {
    img: 'https://cdn.getyourguide.com/img/tour/5a7aee8d8f0c6.jpeg/99.jpg',
    title: 'The Penthouse',
    star: '★★★★★',
    view: '(1 Review)',
    from: 'From',
    bed: 'King Beds',
    sale: '$200',
    saleOff: '',
  },
  {
    img: 'https://cdn.getyourguide.com/img/tour/5a7aee8d8f0c6.jpeg/99.jpg',
    title: 'Grand Suite Room',
    star: '★★★★★',
    view: '(1 Review)',
    from: 'From',
    sale: '$150',
    bed: 'Double Beds',
    saleOff: '$120',
  },
  {
    img: 'https://cdn.getyourguide.com/img/tour/5a7aee8d8f0c6.jpeg/99.jpg',
    title: 'Junior Suite Room',
    star: '★★★★★',
    view: '(1 Review)',
    bed: 'Double Beds',
    from: 'From',
    sale: '$79',
    saleOff: '',
  },
  {
    img: 'https://cdn.getyourguide.com/img/tour/5a7aee8d8f0c6.jpeg/99.jpg',
    title: 'Standard Room',
    star: '★★★★★',
    view: '(1 Review)',
    from: 'From',
    bed: 'Double Beds',
    sale: '$90',
    saleOff: '',
  },
];

export const HotelRoom: React.FC<ICards> = () => {
  return (
    <div>
      {cards.map((item) => (
        <Card {...item} />
      ))}
    </div>
  );
};
