/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
// actions
import { draw } from '../features/dealDrawSlice';
import { rotateFalse, rotateTrue } from '../features/rotateSlice';
import { useDealCardsQuery } from '../api/apiSlice';
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
  const { data: dealCards } = useDealCardsQuery();
  const dispatch = useAppDispatch();
  const holdState1 = useAppSelector((state) => state.holdCardOne.toggleHold1);
  const holdState2 = useAppSelector((state) => state.holdCardOne.toggleHold2);
  const holdState3 = useAppSelector((state) => state.holdCardOne.toggleHold3);
  const holdState4 = useAppSelector((state) => state.holdCardOne.toggleHold4);
  const holdState5 = useAppSelector((state) => state.holdCardOne.toggleHold5);
  // card State
  const isActive = useAppSelector((state) => state.rotate.value);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(rotateTrue());
    }, 200);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
              />
            </div>
          </div>
        ))}
      </div>

      <div>
        <button
          className="w-40 rounded border-4 border-r-yellow-700 border-l-yellow-600 border-b-yellow-700 bg-yellow-500 py-2 px-4 font-bold text-black hover:border-gray-500 hover:bg-yellow-400"
          onClick={() => {
            dispatch(draw());
            dispatch(rotateFalse());
          }}
        >
          DRAW
        </button>
      </div>
    </div>
  );
};
export default DrawCards;
