import { LOGIN, LOGOUT } from '../actions/authActions';

const initial_state = {
  user: null,
};

export default function user(state = initial_state, action) {
  switch (action.type) {
    case LOGIN:
      return {
        user: action.user
      };
    case LOGOUT:
      return {
        user: null
      };
    default:
      return state;
  }
}
