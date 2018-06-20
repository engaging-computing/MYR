import '../firebase';


export const INIT_LEVEL = "INIT_LEVEL"
export const NEXT_LEVEL = "NEXT_LEVEL";
export const PREV_LEVEL = "PREV_LEVEL";
export const NEXT_STAGE = "NEXT_STAGE";
export const PREV_STAGE = "PREV_STAGE";
export const RESTART_STAGE = "RESTART_STAGE";
export const LEVEL_HELP = "LEVEL_HELP";

export function fetchLevel(lvlId){
  console.log(lvlId)
  return function (dispatch) {
    dispatch(nextLvl());
    setTimeout(() => {
      dispatch(prevLvl());
    }, 5000);
  };
}
/**
 * @function - Sends a signal to the reducer to go to next section of the level
 * 
 * @param {int} lvlId
 * 
 * @returns - reducer action obj with type INIT_LEVEL and lvlId
 */
export function initLvl(lvl){
  return {type: INIT_LEVEL, lvl };
}

/**
 * @function - Sends a signal to the reducer to go to next section of the level
 * 
 * @returns - reducer action obj with type NEXT_LEVEL
 */
export function nextLvl(){
  return { type: NEXT_LEVEL};
}

/**
 * @function - Sends a signal to the reducer to return to the previous state
 * 
 * @returns - reducer action obj with type PREV_LEVEL
 */
export function prevLvl(){
  return { type: PREV_LEVEL};
}

/**
 * @function - Sends a signal to the reducer to go to next section of the level
 * 
 * @returns - reducer action obj with type NEXT_STAGE
 */
export function nextStage(){
  return { type: NEXT_STAGE};
}

/**
 * @function - Sends a signal to the reducer to return to the previous state
 * 
 * @returns - reducer action obj with type PREV_STAGE
 */
export function prevStage(){
  return { type: PREV_STAGE};
}

/**
 * @function - Sends a signal to the reducer to restart the level
 * 
 * @returns - reducer action obj with type RESTART_LEVEL
 */
export function restartStage(){
  return { type: RESTART_STAGE};
}

/**
 * @function - Sends a signal to the reducer to provide help if it is available
 * 
 * @returns - reducer action obj with type LEVEL_HELP
 */
export function help(){
  return { type: LEVEL_HELP};
}
