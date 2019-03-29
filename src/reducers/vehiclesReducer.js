export const vehiclesReducer = (state = [], action) => {
  switch(action.type) {
    case 'STORE_VEHICLES':
      return action.vehicles;
    default:
      return state;
  }
};