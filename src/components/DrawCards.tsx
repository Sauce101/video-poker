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

const DrawCards = () => {
  // buttonSlice and holdSlice current state
  const dispatch = useAppDispatch();
  const { data: dealCards } = useDealCardsQuery();
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

  return (
    <div>
      <div className="grid-container">
        {POSITION.map((spot, index) => (
          <div className="grid-child" key={index}>
            {spot.hold ? <p>HELD</p> : <p>❤️</p>}
            <img
              src={`${spot.card}`}
              alt="..."
              onClick={() => dispatch(spot.dis)}
            />
          </div>
        ))}
      </div>
      <div>
        <button
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
