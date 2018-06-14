import {
  PREV_LEVEL,
  NEXT_LEVEL,
  RESTART_LEVEL,
  LEVEL_HELP
} from '../actions/levelActions';

const initial_state = {
  lvlCursor: 0,
  stageCursor: 0,
  levels: [
    {
      id: 1,
      name: "Intro to MYR",
      stages: [
        {
          isQuiz: false,
          prompt: "Here we learn about functions",
          levelText: "Functions do things and stuff",
          sceneText: `sphere()`,

        },
        {
          isQuiz: true,
          prompt: "What is MYR?",
          sceneText: `sphere()\nsphere()`,
          opts: [
            {
              text: "A Lemon",
              value: false,
            },
            {
              text: "A VR Platform",
              value: true,
            },
          ]
        },
        {
          isQuiz: true,
          prompt: "Do you like it?",
          sceneText: `sphere()\nsphere()`,
          opts: [
            {
              text: "Yes",
              value: true,
            },
            {
              text: "No",
              value: true,
            },
          ]
        }
      ]
    }
  ]
};

export default function level(state = initial_state, action) {
  switch (action.type) {
    case PREV_LEVEL:
      return {
        ...state,
      };
    case NEXT_LEVEL:
      return {
        ...state,
      };
    case RESTART_LEVEL:
      return {
        ...state,
      };
    case LEVEL_HELP:
      return {
        ...state,
      };
    default:
      return state;
  }
}