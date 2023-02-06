/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { deal } from '../features/dealDrawSlice';
// import { rotateTrue } from '../features/rotateSlice';
import {
  holdReset1,
  holdReset2,
  holdReset3,
  holdReset4,
  holdReset5,
} from '../features/holdOneSlice';
import {
  useDealCardsQuery,
  useDealNextCardsMutation,
  useDrawCardsQuery,
  useReShuffleCardsMutation,
} from '../api/apiSlice';
import redback from '../assets/2B.svg';

const DealCards = () => {
  const [isActive, setActive] = useState(false);
  const toggleClass = () => {
    setActive(!isActive);
  };
  // const rotateState = useAppSelector((state) => state.rotate.value);
  const dispatch = useAppDispatch();
  const { data: dealCards } = useDealCardsQuery();
  const { data: drawCards } = useDrawCardsQuery();
  // mutations
  const [reShuffle] = useReShuffleCardsMutation();
  const [dealNext] = useDealNextCardsMutation();
  const holdState1 = useAppSelector((state) => state.holdCardOne.toggleHold1);
  const holdState2 = useAppSelector((state) => state.holdCardOne.toggleHold2);
  const holdState3 = useAppSelector((state) => state.holdCardOne.toggleHold3);
  const holdState4 = useAppSelector((state) => state.holdCardOne.toggleHold4);
  const holdState5 = useAppSelector((state) => state.holdCardOne.toggleHold5);

  const POSITION = [
    {
      hold: holdState1,
      delt: dealCards?.cards[0].image,
      drawn: drawCards?.cards[0].image,
      back: redback,
    },
    {
      hold: holdState2,
      delt: dealCards?.cards[1].image,
      drawn: drawCards?.cards[1].image,
      back: redback,
    },
    {
      hold: holdState3,
      delt: dealCards?.cards[2].image,
      drawn: drawCards?.cards[2].image,
      back: redback,
    },
    {
      hold: holdState4,
      delt: dealCards?.cards[3].image,
      drawn: drawCards?.cards[3].image,
      back: redback,
    },
    {
      hold: holdState5,
      delt: dealCards?.cards[4].image,
      drawn: drawCards?.cards[4].image,
      back: redback,
    },
  ];

  useEffect(() => {
    toggleClass();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dealHand = () => {
    reShuffle(),
      dealNext(),
      dispatch(holdReset1()),
      dispatch(holdReset2()),
      dispatch(holdReset3()),
      dispatch(holdReset4()),
      dispatch(holdReset5()),
      dispatch(deal());
  };

  // () => dispatch(rotateTrue());
  // console.log(rotateState);
  return (
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
                  <img src={spot.back} alt="..." className="z-4 mt-2" />
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
          className="w-40 rounded border-4 border-r-yellow-700 border-l-yellow-600 border-b-yellow-700 bg-yellow-500 py-2 px-4 font-bold text-black hover:border-gray-500 hover:bg-yellow-400"
          onClick={() => dealHand()}
        >
          DEAL
        </button>
      </div>
    </div>
  );
};
export default DealCards;
