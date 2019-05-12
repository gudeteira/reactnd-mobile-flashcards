import {getData, saveDeck, saveQuestion, saveScore} from '../services/Api';

export const GET_DECKS = 'GET_DECKS';
export const ADD_DECK = 'ADD_DECK';
export const REMOVE_DECK = 'REMOVE_DECK';
export const UPDATE_DECK = 'UPDATE_DECK';
export const ADD_QUESTION = 'ADD_QUESTION';
export const REMOVE_QUESTION = 'REMOVE_QUESTION';

export const getDecks = (decks) => {
  return {
    type: GET_DECKS,
    decks
  };
};

export const handleGetDecks = () => {
  return (dispatch, getState) => {
    return getData().then(data => {
      dispatch(getDecks(data));
    }).catch(e => console.error(e));
  };
};

export const addDeck = (deck) => {
  return {
    type: ADD_DECK,
    deck
  };
};

export const handleAddDeck = (name) => {
  return (dispatch) => {
    return saveDeck(name).then(deck => {
      dispatch(addDeck(deck));
    }).catch(e => {
      console.error(e);
    });

  };
};

export const removeDeck = (deckId) => {
  return {
    type: REMOVE_DECK,
    deckId
  };
};

export const updateDeck = (deck) => {
  return {
    type: UPDATE_DECK,
    deck,
  };
};

export const handleUpdateScore = (deck, score) => {
  return (dispatch, getState) => {
    return saveScore(deck, score).then(updatedDeck => {
      dispatch(updateDeck(updatedDeck));
    }).catch(e => console.error(e));
  };
};

export const addQuestion = (deckId, question) => {
  return {
    type: ADD_QUESTION,
    deckId,
    question,

  };
};

export const handleAddQuestion = (question, deck) => {
  return (dispatch, getState) => {
    return saveQuestion(question, deck).then(question => {
      dispatch(addQuestion(deck.id, question));
    }).catch(e => {
      console.error(e);
    });

  };
};

export const removeQuestion = (deckId, questionId) => {
  return {
    type: REMOVE_QUESTION,
    deckId,
    questionId
  };
};