import './App.css';
import { useAppSelector } from './app/hooks';
import {
  useDealCardsQuery,
  useShuffleCardsQuery,
  useDrawCardsQuery,
} from './api/apiSlice';
import DealCards from './components/DealCards';
import DrawCards from './components/DrawCards';
import jacks from './assets/jaksPay.webp';
import Footer from './components/Footer';
import rotateScreen from './assets/rotateScreen.png';

export default function App() {
  // Using a query hook automatically fetches data and returns query values
  const { data: shuffleCards } = useShuffleCardsQuery();
  const { data: dealCards, error, isLoading } = useDealCardsQuery();
  const { data: drawCards, error: err, isLoading: isLo } = useDrawCardsQuery();
  // Current State
  const dealDrawState = useAppSelector((state) => state.dealDraw.value);

  return (
    <div className="App">
      {error || err ? (
        <>Oh no, there was an error</>
      ) : isLoading || isLo ? (
        <>Loading...</>
      ) : dealCards || drawCards || shuffleCards ? (
        <>
          <div className="flex min-h-screen flex-col place-items-center bg-blue-950 text-center	font-medium text-white portrait:hidden">
            <div className="mb-8">
              <img src={jacks} alt="..." className="max-lg:hidden" />
            </div>
            {dealDrawState ? <DrawCards /> : <DealCards />}
            <Footer />
          </div>
          <div className="flex min-h-screen flex-col place-items-center bg-slate-700 text-left	font-medium text-white landscape:hidden">
            <img src={rotateScreen} alt="..." className="relative mt-8 p-8" />
            <p className="m-4">Please rotate your device for Video Poker.</p>
          </div>
        </>
      ) : null}
    </div>
  );
}
