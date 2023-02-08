import './App.css';
import { useAppSelector } from './app/hooks';
import { useDealCardsQuery, useShuffleCardsQuery } from './api/apiSlice';
import DealCards from './components/DealCards';
import DrawCards from './components/DrawCards';
import jacks from './assets/images/jaksPay.webp';
import FooterTwo from './components/FooterTwo';
import rotateScreen from './assets/images/rotateScreen.png';
import RetroLoading from './components/RetroLoading';
import RetroError from './components/RetroError';

export default function App() {
  // Using a query hook automatically fetches data and returns query values
  const { data: shuffleCards, error, isLoading } = useShuffleCardsQuery();
  const { data: dealCards } = useDealCardsQuery();
  // Current State
  const dealDrawState = useAppSelector((state) => state.dealDraw.value);

  return (
    <div className="App">
      {error ? (
        <RetroError />
      ) : isLoading ? (
        <RetroLoading />
      ) : // ) : dealCards || drawCards || shuffleCards ? (
      shuffleCards ? (
        <>
          <div className="flex min-h-screen flex-col place-items-center bg-blue-950	text-center font-medium text-white portrait:hidden">
            <div className="mb-8">
              <img src={jacks} alt="..." className="max-lg:hidden" />
            </div>
            <div className="my-auto mb-auto flex flex-col place-items-center">
              {dealDrawState ? (
                <DrawCards dealCards={dealCards} />
              ) : (
                <DealCards dealCards={dealCards} />
              )}
            </div>
            <FooterTwo />
          </div>
          <div className="flex min-h-screen flex-col place-items-center bg-slate-700 text-left font-medium text-white landscape:hidden">
            <img src={rotateScreen} alt="..." className="relative mt-8 p-8" />
            <h4 className="text-2xl font-bold dark:text-white">
              Please Rotate Your Device
            </h4>
          </div>
        </>
      ) : null}
    </div>
  );
}
