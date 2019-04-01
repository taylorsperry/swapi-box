export const planetsReducer = (state=[], action) => {
  switch(action.type) {
    case 'STORE_PLANETS': 
      return action.planets;
    default: 
      return state;
  }
};