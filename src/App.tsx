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
        <div className="flex min-h-screen flex-col place-items-center bg-blue-950 text-center	font-medium text-white portrait:origin-center portrait:rotate-90">
          <div className="mb-8 flex justify-center">
            <img src={jacks} alt="..." className="" />
          </div>
          {dealDrawState ? <DrawCards /> : <DealCards />}
        </div>
      ) : null}
    </div>
  );
}
