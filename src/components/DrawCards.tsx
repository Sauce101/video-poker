/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { useDealCardsQuery } from '../api/apiSlice';
import { draw } from '../features/dealDrawSlice';

import {
  holdOne,
  holdTwo,
  holdThree,
  holdFour,
  holdFive,
} from '../features/holdOneSlice';
import redback from '../assets/2B.svg';

const DrawCards = () => {
  // buttonSlice and holdSlice current state
  const dispatch = useAppDispatch();
  const { data: dealCards } = useDealCardsQuery();
  const dealDrawState = useAppSelector((state) => state.dealDraw.value);
  const holdState1 = useAppSelector((state) => state.holdCardOne.toggleHold1);
  const holdState2 = useAppSelector((state) => state.holdCardOne.toggleHold2);
  const holdState3 = useAppSelector((state) => state.holdCardOne.toggleHold3);
  const holdState4 = useAppSelector((state) => state.holdCardOne.toggleHold4);
  const holdState5 = useAppSelector((state) => state.holdCardOne.toggleHold5);

  const POSITION = [
    {
      hold: holdState1,
      card: dealCards?.cards[0].image,
      dis: holdOne(),
    },
    {
      hold: holdState2,
      card: dealCards?.cards[1].image,
      dis: holdTwo(),
    },
    {
      hold: holdState3,
      card: dealCards?.cards[2].image,
      dis: holdThree(),
    },
    {
      hold: holdState4,
      card: dealCards?.cards[3].image,
      dis: holdFour(),
    },
    {
      hold: holdState5,
      card: dealCards?.cards[4].image,
      dis: holdFive(),
    },
  ];

  const REDCARD = [redback, redback, redback, redback, redback];

  return (
    <div className="w-9/12">
      {dealDrawState ? (
        <div className="mb-8 grid grid-cols-5 gap-2">
          {POSITION.map((spot, index) => (
            <div className="mx-auto" key={index}>
              {spot.hold ? <p>HELD</p> : <p>❤️</p>}
              <img
                className="z-4 mt-2"
                src={`${spot.card}`}
                alt="..."
                onClick={() => dispatch(spot.dis)}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="mb-8 grid grid-cols-5 gap-2">
          {REDCARD.map((red, i) => (
            <img src={red} alt="..." key={i} className="z-2" />
          ))}
        </div>
      )}

      <div>
        <button
          className="w-35 rounded border-4 border-r-yellow-700 border-l-yellow-600 border-b-yellow-700 bg-yellow-500 py-2 px-4 font-bold text-black hover:border-gray-500 hover:bg-yellow-400"
          onClick={() => {
            dispatch(draw());
          }}
        >
          DRAW
        </button>
      </div>
    </div>
  );
};
export default DrawCards;
