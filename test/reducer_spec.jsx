import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';
describe('reducer', () => {
  it('handles SET_STATE', () => {
    const initialState = Map();
    const action = {
      type: 'SET_STATE',
      state: Map({
        vote: Map({
          pair: List.of('trains', 'days'),
          tally: Map({trains: 5})
        })
      })
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['trains', 'days'],
        tally: {trains: 5}
      }
    }));
  });

  it('handles SET_STATE with plain JS payload', () => {
    const initialState = Map();
    const action = {
      type: 'SET_STATE',
      state: {
        vote: {
          pair: ['trains', 'days'],
          tally: {trains: 5}
        }
      }
    };

    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['trains', 'days'],
        tally: {trains: 5}
      }
    }));
  });

  it('handles SET_STATE without initial state', () => {
    const action = {
      type: 'SET_STATE',
      state: {
        vote: {
          pair: ['trains', 'days'],
          tally: {trains: 5}
        }
      }
    };
    const nextState = reducer(undefined, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['trains', 'days'],
        tally: {trains: 5}
      }
    }));
  });

  it('handles VOTE by setting hasVoted', () => {
    const state = fromJS({
      vote: {
        pair: ['trains', 'days'],
        tally: {trains: 5}
      }
    });
    const action = {type: 'VOTE', entry: 'trains'};
    const nextState = reducer(state, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['trains', 'days'],
        tally: {trains: 5}
      },
      hasVoted: 'trains'
    }));
  });

  it('does not set hasVoted for VOTE on invalid entry', () => {
    const state = fromJS({
      vote: {
        pair: ['trains', 'days'],
        tally: {trains: 5}
      }
    });
    const action = {type: 'VOTE', entry: 'bla'};
    const nextState = reducer(state, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['trains', 'days'],
        tally: {trains: 5}
      }
    }));
  });

  it('removes hasVoted on SET_STATE if pair changes', () => {
    const initialState = fromJS({
      vote: {
        pair: ['trains', 'days'],
        tally: {trains: 5}
      },
      hasVoted: 'trains'
    });
    const action = {
      type: 'SET_STATE',
      state: {
        vote: {
          pair: ['sunshine', 'slumdog']
        }
      }
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['sunshine', 'slumdog']
      }
    }));
  });
});
