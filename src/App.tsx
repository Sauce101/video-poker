import './App.css';
import { useAppSelector } from './app/hooks';
import {
  useDealCardsQuery,
  useShuffleCardsQuery,
  // useReShuffleCardsMutation,
  // useDealNextCardsMutation,
  useDrawCardsQuery,
} from './api/apiSlice';
import DealCards from './components/DealCards';
import DrawCards from './components/DrawCards';
import jacks from './assets/jaksPay.webp';

export default function App() {
  // Using a query hook automatically fetches data and returns query values
  const { data: shuffleCards } = useShuffleCardsQuery();
  const { data: dealCards, error, isLoading } = useDealCardsQuery();
  const { data: drawCards, error: err, isLoading: isLo } = useDrawCardsQuery();
  // mutations
  // const [dealNext] = useDealNextCardsMutation();
  const dealDrawState = useAppSelector((state) => state.dealDraw.value);

  return (
    <div className="App">
      {error || err ? (
        <>Oh no, there was an error</>
      ) : isLoading || isLo ? (
        <>Loading...</>
      ) : dealCards || drawCards || shuffleCards ? (
        <div>
          {/* <h2>VIDEO POKER</h2> */}
          <img src={jacks} alt="..." />
          {dealDrawState ? <DrawCards /> : <DealCards />}
        </div>
      ) : null}
    </div>
  );
}
