const initialState = {
  token: '',
};

const reducer = (state = initialState, { type, payload } = {}) => {
  switch (type) {
    case 'GET_TOKEN': {
      return {
        ...state,
        token: payload,
      };
    }

    default:
      return state;
  }
};

export default reducer;
