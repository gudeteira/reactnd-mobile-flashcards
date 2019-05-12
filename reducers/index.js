import {ADD_DECK, ADD_QUESTION, GET_DECKS, REMOVE_DECK, REMOVE_QUESTION, UPDATE_DECK} from '../actions';

export default function decks(state = {}, action) {
  switch (action.type) {
    case GET_DECKS:
      return {
        ...state,
        ...action.decks
      };
    case ADD_DECK:
      return {
        ...state,
        ...action.deck
      };
    case UPDATE_DECK:
      return {
        ...state,
        [action.deck.id]: {
          ...action.deck
        }
      };
    case ADD_QUESTION:
      return {
        ...state,
        [action.deckId]: {
          ...state[action.deckId],
          questions: state[action.deckId].questions.concat([action.question])
        }
      };
    case REMOVE_DECK:
      return {
        ...Object.keys(state).reduce((result, id) => {
          if (id !== action.deckId) {
            result[id] = state[id];
          }
          return result;
        }, {})
      };
    case REMOVE_QUESTION:
      return {
        ...state,
        [action.deckId]: {
          ...state[action.deckId],
          questions: state[action.deckId].questions.filter(q => {
            return q.id !== action.questionId;
          })
        }
      };
    default:
      return state;
  }
}