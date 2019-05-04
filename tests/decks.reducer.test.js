import {ADD_DECK, ADD_QUESTION, REMOVE_DECK, REMOVE_QUESTION} from '../actions';
import decks from '../reducers';

describe('Decks reducer', () => {

  it('should add a deck', () => {
    expect(
      decks(undefined, {
        type: ADD_DECK,
        deck: {
          '1': {
            id: '1',
            name: 'Deck name',
            questions: []
          }
        }
      })
    ).toEqual({
      '1': {
        id: '1',
        name: 'Deck name',
        questions: []
      }
    });
  });

  it('should add a new deck', () => {
    expect(
      decks({'1': {id: '1', name: 'Deck name', questions: []}}, {
        type: ADD_DECK,
        deck: {
          '2': {
            id: '2',
            name: 'Deck 2 name',
            questions: []
          }
        }
      })
    ).toEqual({
      '1': {id: '1', name: 'Deck name', questions: []},
      '2': {id: '2', name: 'Deck 2 name', questions: []}
    });
  });

  it('should remove deck', () => {
    expect(
      decks({
        '1': {id: '1', name: 'Deck name', questions: []},
        '2': {id: '2', name: 'Deck 2 name', questions: []}
      }, {
        type: REMOVE_DECK,
        deckId: '1'
      })
    ).toEqual({'2': {id: '2', name: 'Deck 2 name', questions: []}});
  });

  it('should add question to deck', () => {
    expect(
      decks({'1': {id: '1', name: 'Deck name', questions: []}}, {
        type: ADD_QUESTION,
        deckId: '1',
        question: {

          id: '1',
          question: 'question',
          answer: 'answer'

        }
      })
    ).toEqual({
      '1': {
        id: '1',
        name: 'Deck name',
        questions: [{id: '1', question: 'question', answer: 'answer'}]
      }
    });
  });

  it('should add a new question to deck', () => {
    expect(
      decks(
        {
          '1': {
            id: '1', name: 'Deck name',
            questions: [{id: '1', question: 'question', answer: 'answer'}]
          }
        }, {
          type: ADD_QUESTION,
          deckId: '1',
          question: {
            id: '2',
            question: 'question 2',
            answer: 'answer for question 2'
          }
        }
      )
    ).toEqual(
      {
        '1': {
          id: '1',
          name: 'Deck name',
          questions: [{id: '1', question: 'question', answer: 'answer'}, {
            id: '2',
            question: 'question 2',
            answer: 'answer for question 2'
          }]
        }
      }
    );
  });

  it('should remove question from deck', () => {
    expect(
      decks(
        {
          '1': {
            id: '1',
            name: 'Deck name',
            questions: [
              {
                id: '1', question: 'question', answer: 'answer'
              },
              {
                id: '2', question: 'question 2', answer: 'answer for question 2'
              }]
          },
          '2': {id: '2', name: 'Deck 2 name', questions: []}
        }, {
          type: REMOVE_QUESTION,
          deckId: '1',
          questionId: '2'
        }
      )
    ).toEqual(
      {
        '1': {
          id: '1',
          name: 'Deck name',
          questions: [{id: '1', question: 'question', answer: 'answer'}]
        },
        '2': {id: '2', name: 'Deck 2 name', questions: []}
      }
    );
  });

});