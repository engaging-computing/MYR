import {
  PREV_LEVEL,
  NEXT_LEVEL,
  PREV_STAGE,
  NEXT_STAGE,
  RESTART_STAGE,
  LEVEL_HELP
} from '../actions/levelActions';

const lessonBook = {
  levels: [
    {
      id: 1,
      name: "Intro to MYR",
      stages: [
        {
          isQuiz: false,
          prompt: "Welcome to the Mix Your Reality (MYR for short) Project.",
          levelText: "Computers have changed our world in so many way. Today there is barely anything that is not somehow connected to computers. The power of computing has grown so great we can now make our own worlds. MYR helps us do that by providing a sandbox to create and modify any world you want to create. Press the green play button at the top of the screen. When done, click next.",
          sceneText:
            `box();
           setPosition(0,1,0);
           sphere();`,
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
  ],
};


const initial_state = {
  lvlName: "Intro to MYR",
  lvlCursor: 0,
  stageCursor: 0,
  crntStage: lessonBook.levels[0].stages[0]
};

export default function level(state = initial_state, action) {
  let crntStage;
  let newLvlCursor;
  let stageCursor;
  switch (action.type) {
    case PREV_LEVEL:
      // DO NOT USE ++ and --, there is no need to update the value
      newLvlCursor = state.lvlCursor > 0 ? state.lvlCursor - 1 : 0;
      crntStage = lessonBook.levels[newLvlCursor].stages[0];
      return {
        ...state,
        lvlCursor: newLvlCursor,
        stageCursor: 0,  // If we are getting a new lesson we should also restart the stage
        crntStage
      };
    case NEXT_LEVEL:
      newLvlCursor = state.lvlCursor + 1 < lessonBook.levels.length ? state.lvlCursor + 1: state.lvlCursor;
      crntStage = lessonBook.levels[newLvlCursor].stages[0];
      return {
        ...state,
        lvlCursor: newLvlCursor,
        stageCursor: 0,  // If we are getting a new lesson we should also restart the stage
        crntStage
      };
    case PREV_STAGE:
      stageCursor = state.stageCursor > 0 ? state.stageCursor - 1 : 0;
      crntStage = lessonBook.levels[state.lvlCursor].stages[stageCursor];
      return {
        ...state,
        stageCursor,
        crntStage
      };
    case NEXT_STAGE:
      let numStages = lessonBook.levels[state.lvlCursor].stages.length;
      stageCursor = state.stageCursor + 1 < numStages ? state.stageCursor + 1 : 0;
      crntStage = lessonBook.levels[state.lvlCursor].stages[stageCursor];
      return {
        ...state,
        stageCursor,
        crntStage
      };
    case RESTART_STAGE:
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