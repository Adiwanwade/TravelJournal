const initialState = {
    entries: [],
  };
  
  export default function journalReducer(state = initialState, action) {
    switch (action.type) {
      case 'ADD_ENTRY':
        return { ...state, entries: [...state.entries, action.payload] };
      case 'DELETE_ENTRY':
        return {
          ...state,
          entries: state.entries.filter((entry) => entry.id !== action.payload),
        };
      default:
        return state;
    }
  }
  