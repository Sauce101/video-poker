/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { deal } from '../features/dealDrawSlice';
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

const DealCards = () => {
  const { data: dealCards } = useDealCardsQuery();
  const { data: drawCards } = useDrawCardsQuery();
  // mutations
  const [reShuffle] = useReShuffleCardsMutation();
  const [dealNext] = useDealNextCardsMutation();
  const dispatch = useAppDispatch();
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
    },
    {
      hold: holdState2,
      delt: dealCards?.cards[1].image,
      drawn: drawCards?.cards[1].image,
    },
    {
      hold: holdState3,
      delt: dealCards?.cards[2].image,
      drawn: drawCards?.cards[2].image,
    },
    {
      hold: holdState4,
      delt: dealCards?.cards[3].image,
      drawn: drawCards?.cards[3].image,
    },
    {
      hold: holdState5,
      delt: dealCards?.cards[4].image,
      drawn: drawCards?.cards[4].image,
    },
  ];

  return (
    <div>
      <div className="grid-container">
        {POSITION.map((spot, index) => (
          <div className="grid-child" key={index}>
            {spot.hold ? (
              <>
                <p>HELD</p>
                <img src={`${spot.delt}`} alt="..." />
              </>
            ) : (
              <>
                <p>💛</p>
                <img src={`${spot.drawn}`} alt="..." />
              </>
            )}
          </div>
        ))}
      </div>
      <div>
        <button
          onClick={() => {
            // eslint-disable-next-line no-sequences
            reShuffle(),
              dealNext(),
              dispatch(holdReset1()),
              dispatch(holdReset2()),
              dispatch(holdReset3()),
              dispatch(holdReset4()),
              dispatch(holdReset5()),
              dispatch(deal());
          }}
        >
          DEAL
        </button>
      </div>
    </div>
  );
};
export default DealCards;
