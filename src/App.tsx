import './App.css';
import { Destinations } from './components/Destination/renderCard';
import { Popular } from './components/Popular/renderCard';
import { Added } from './components/Added/renderCard';
import { HotelRoom } from './components/HotelRoom/renderCard';

function App() {
  return (
    <div>
      {/* <Destinations />
      <Popular />
      <Added /> */}
      <HotelRoom />
    </div>
  );
}

export default App;
