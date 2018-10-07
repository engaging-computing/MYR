import {
  LOAD_LESSON
} from '../actions/lessonActions';

const initial_state = {
  name: "Loading....",
  id: -1,
  prompt: "Please wait",
  code: "// Loading",
  next: 0,
  last: 0
};

export default function lesson(state = initial_state, action) {
  let payload;
  switch (action.type) {
    case LOAD_LESSON:
      payload = action.payload;
      return {
        name: payload.name,
        id: payload._id,
        prompt: payload.prompt,
        code: payload.code,
        next: payload.next,
        previous: payload.previous
      };
    default:
      return state;
  }
}
