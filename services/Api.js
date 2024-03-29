import {AsyncStorage} from 'react-native';

const DECKS_STORAGE_KEY = 'MobileFlashCards:deck';

export function getData() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((data) => {
      return null === data ? {} : JSON.parse(data);
    });
}

export const saveDeck = (name) => {
  const newDeck = {
    id: generateUID(),
    name,
    questions: [],
    lastScore: '',
    bestScore: ''
  };
  return merge(newDeck).then(() => {
    return newDeck;
  });
};

export const removeDeck = (deckId) => {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results);
      data[deckId] = undefined;
      delete data[deckId];
      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data));
    });
};

export const saveScore = (deck, score) => {
  const roundedScore = Math.round(score);
  const data = {
    lastScore: roundedScore,
    bestScore: (roundedScore > deck.bestScore) ? roundedScore : deck.bestScore
  };
  return updateDeck(deck, data);
};

export const updateDeck = (deck, changes) => {
  const updatedDeck = {
    ...deck,
    ...changes
  };
  return merge(updatedDeck).then(() => {
    return updatedDeck;
  });
};

export const saveQuestion = (question, deck) => {
  question['id'] = generateUID();
  const updatedDeck = {
    ...deck,
    questions: deck.questions.concat([question])
  };
  return merge(updatedDeck).then(() => {
    return question;
  });
};

export const removeQuestion = (question, deck) => {
  const updatedDeck = {
    ...deck,
    questions: deck.questions.filter(q => q.id !== question.id)
  };
  return merge(updatedDeck).then(() => {
    return question;
  });
};

const merge = (deck) => {
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
    [deck.id]: deck
  }));
};

function generateUID() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}
