import Card from '../Card';

export interface ICards {
  img: string;
  title: string;
  star: string;
  sale: string;
  saleOff: string;
  view: string;
  from: string;
}

const cards: ICards[] = [
  {
    img: 'https://cdn.getyourguide.com/img/tour/5a7aee8d8f0c6.jpeg/99.jpg',
    title: 'Africa - Amazing African Safari',
    star: '★★★★★',
    view: '(1 Review)',
    from: 'From',
    sale: '$100',
    saleOff: '',
  },
  {
    img: 'https://cdn.getyourguide.com/img/tour/5a7aee8d8f0c6.jpeg/99.jpg',
    title: 'Dubai - All Stunning Places',
    star: '★★★★★',
    view: '(1 Review)',
    from: 'From',
    sale: '$1,200',
    saleOff: '',
  },
  {
    img: 'https://cdn.getyourguide.com/img/tour/5a7aee8d8f0c6.jpeg/99.jpg',
    title: 'Venice, Rome and Milan - 9 Days',
    star: '★★★★★',
    view: '(1 Review)',
    from: '',
    sale: '$3,500',
    saleOff: '$4,300',
  },
  {
    img: 'https://cdn.getyourguide.com/img/tour/5a7aee8d8f0c6.jpeg/99.jpg',
    title: 'Enquiry Form Only - Paris - 6 Days',
    star: '★★★★★',
    view: '(1 Review)',
    from: '',
    sale: '$2,000',
    saleOff: '$3,700',
  },
  {
    img: 'https://cdn.getyourguide.com/img/tour/5a7aee8d8f0c6.jpeg/99.jpg',
    title: '5-Day Oahu Tour: Honolulu',
    star: '★★★★★',
    view: '(1 Review)',
    from: 'From',
    sale: '$1,500',
    saleOff: '',
  },
  {
    img: 'https://cdn.getyourguide.com/img/tour/5a7aee8d8f0c6.jpeg/99.jpg',
    title: 'Molokini and Turtle Snorkeling',
    star: '',
    view: '',
    from: 'From',
    sale: '$80',
    saleOff: '',
  },
  {
    img: 'https://cdn.getyourguide.com/img/tour/5a7aee8d8f0c6.jpeg/99.jpg',
    title: 'Two Moscow Tour of 7 days',
    star: '',
    from: '',
    view: '',
    sale: '$3,500',
    saleOff: '$3,800',
  },
  {
    img: 'https://cdn.getyourguide.com/img/tour/5a7aee8d8f0c6.jpeg/99.jpg',
    title: 'Paris - Eiffel Tower, Notre Dame Cath..',
    star: '★★★★★',
    view: '(1 Review)',
    from: 'From',
    sale: '$800',
    saleOff: '',
  },
  {
    img: 'https://cdn.getyourguide.com/img/tour/5a7aee8d8f0c6.jpeg/99.jpg',
    title: 'Austria - 6 Days in Vienna, Hallstatt',
    star: '★★★★★',
    view: '(1 Review)',
    from: '',
    sale: '$2,100',
    saleOff: '$2,600',
  },
];

export const Added: React.FC<ICards> = () => {
  return (
    <div>
      {cards.map((item) => (
        <Card {...item} />
      ))}
    </div>
  );
};
