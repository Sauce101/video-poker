import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { deal } from '../features/dealDrawSlice';
import {
  rotateFalse,
  rotateTrue,
  fiveCredits,
  fiveCreditsFalse,
} from '../features/rotateSlice';
import {
  holdReset1,
  holdReset2,
  holdReset3,
  holdReset4,
  holdReset5,
} from '../features/holdOneSlice';
import {
  useDealNextCardsMutation,
  useReturnCardsMutation,
  useReShuffleCardsMutation,
} from '../api/apiSlice';
import redback from '../assets/images/2B.svg';

interface DealProps {
  success: boolean;
  deck_id: string;
  cards: {
    code: string;
    image: string;
    images: { svg: string; png: string };
    value: string;
    suit: string;
  }[];
  remaining: number;
}

const DealCards = ({ dealCards }: { dealCards: DealProps | undefined }) => {
  const dispatch = useAppDispatch();
  // mutations
  const [returnCards] = useReturnCardsMutation();
  const [reShuffle] = useReShuffleCardsMutation();
  const [dealNext] = useDealNextCardsMutation();
  // card State
  const isActive = useAppSelector((state) => state.rotate.value);
  const playFive = useAppSelector((state) => state.rotate.credits);

  // hold State
  const holdState1 = useAppSelector((state) => state.holdCardOne.toggleHold1);
  const holdState2 = useAppSelector((state) => state.holdCardOne.toggleHold2);
  const holdState3 = useAppSelector((state) => state.holdCardOne.toggleHold3);
  const holdState4 = useAppSelector((state) => state.holdCardOne.toggleHold4);
  const holdState5 = useAppSelector((state) => state.holdCardOne.toggleHold5);

  const POSITION = [
    {
      hold: holdState1,
      delt: dealCards?.cards[0].image,
      drawn: dealCards?.cards[5].image,
      back: redback,
    },
    {
      hold: holdState2,
      delt: dealCards?.cards[1].image,
      drawn: dealCards?.cards[6].image,
      back: redback,
    },
    {
      hold: holdState3,
      delt: dealCards?.cards[2].image,
      drawn: dealCards?.cards[7].image,
      back: redback,
    },
    {
      hold: holdState4,
      delt: dealCards?.cards[3].image,
      drawn: dealCards?.cards[8].image,
      back: redback,
    },
    {
      hold: holdState5,
      delt: dealCards?.cards[4].image,
      drawn: dealCards?.cards[9].image,
      back: redback,
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(rotateTrue());
    }, 400);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    const timer2 = setTimeout(() => {
      dispatch(fiveCredits());
    }, 1000);
    return () => clearTimeout(timer2);
  }, []);

  const dealHand = () => {
    dealNext();
    returnCards();
    reShuffle();
    dispatch(holdReset1());
    dispatch(holdReset2());
    dispatch(holdReset3());
    dispatch(holdReset4());
    dispatch(holdReset5());
    dispatch(rotateFalse());
    dispatch(fiveCreditsFalse());
    dispatch(deal());
  };

  return (
    <>
      {playFive && (
        <div className="w-3/8 fixed top-1/2 z-[10] my-auto bg-blue-800 max-lg:top-1/3">
          <p className="play__five p-2 text-center align-middle text-4xl font-bold text-red-700">
            PLAY 5 CREDITS
          </p>
        </div>
      )}
      <div className="scene w-9/12">
        <div className="grid grid-cols-5 gap-2">
          {POSITION.map((spot, index) => (
            <div key={index}>
              {spot.hold ? (
                <div className="mb-8">
                  <p>HELD</p>
                  <img src={`${spot.delt}`} alt="..." className="mt-2" />
                </div>
              ) : (
                <div className={`card mb-8 ${isActive ? 'is-flipped' : null}`}>
                  <div className="card__face card__face--front">
                    <p>&nbsp;</p>
                    <img src={spot.back} alt="..." className="mt-2" />
                  </div>
                  <div className="card__face card__face--back">
                    <p>&nbsp;</p>
                    <img src={`${spot.drawn}`} alt="..." className="mt-2" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div>
          <button
            className="w-34 rounded border-4 border-r-yellow-700 border-l-yellow-600 border-b-yellow-700 bg-yellow-500 py-2 px-4 font-bold text-black hover:border-gray-500 hover:bg-yellow-400 md:w-40"
            onClick={dealHand}
          >
            DEAL
          </button>
        </div>
      </div>
    </>
  );
};
export default DealCards;
