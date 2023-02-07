import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
// api calls
import { draw } from '../features/dealDrawSlice';
import { useDealCardsQuery } from '../api/apiSlice';
// actions
import { rotateFalse, rotateTrue } from '../features/rotateSlice';
import {
  holdOne,
  holdTwo,
  holdThree,
  holdFour,
  holdFive,
} from '../features/holdOneSlice';
// card back
import redback from '../assets/2B.svg';

const DrawCards = () => {
  const dispatch = useAppDispatch();
  const { data: dealCards } = useDealCardsQuery();
  // card State
  const isActive = useAppSelector((state) => state.rotate.value);
  // hold State
  const holdState1 = useAppSelector((state) => state.holdCardOne.toggleHold1);
  const holdState2 = useAppSelector((state) => state.holdCardOne.toggleHold2);
  const holdState3 = useAppSelector((state) => state.holdCardOne.toggleHold3);
  const holdState4 = useAppSelector((state) => state.holdCardOne.toggleHold4);
  const holdState5 = useAppSelector((state) => state.holdCardOne.toggleHold5);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(rotateTrue());
    }, 150);
    return () => clearTimeout(timer);
  });

  const drawHand = () => {
    dispatch(draw());
    dispatch(rotateFalse());
  };

  const POSITION = [
    {
      hold: holdState1,
      card: dealCards?.cards[0].image,
      dis: holdOne(),
      back: redback,
    },
    {
      hold: holdState2,
      card: dealCards?.cards[1].image,
      dis: holdTwo(),
      back: redback,
    },
    {
      hold: holdState3,
      card: dealCards?.cards[2].image,
      dis: holdThree(),
      back: redback,
    },
    {
      hold: holdState4,
      card: dealCards?.cards[3].image,
      dis: holdFour(),
      back: redback,
    },
    {
      hold: holdState5,
      card: dealCards?.cards[4].image,
      dis: holdFive(),
      back: redback,
    },
  ];

  return (
    <div className="scene w-9/12">
      <div className="grid grid-cols-5 gap-2">
        {POSITION.map((spot, index) => (
          <div
            className={`card mx-auto mb-8 ${isActive ? 'is-flipped' : null}`}
            key={index}
          >
            <div className="card__face card__face--front">
              {spot.hold ? <p>HELD</p> : <p>&nbsp;</p>}
              <img className="z-4 mt-2" src={spot.back} alt="..." />
            </div>
            {/* CARDS */}
            <div className="card__face card__face--back">
              {spot.hold ? <p>HELD</p> : <p>&nbsp;</p>}
              <img
                className="z-4 mt-2 w-full"
                src={`${spot.card}`}
                alt="..."
                onClick={() => dispatch(spot.dis)}
                aria-hidden="true"
              />
            </div>
          </div>
        ))}
      </div>

      <div>
        <button
          className="w-34 rounded border-4 border-r-yellow-700 border-l-yellow-600 border-b-yellow-700 bg-yellow-500 py-2 px-4 font-bold text-black hover:border-gray-500 hover:bg-yellow-400 md:w-40"
          onClick={drawHand}
        >
          DRAW
        </button>
      </div>
    </div>
  );
};
export default DrawCards;
