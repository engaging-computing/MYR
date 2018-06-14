export const NEXT_LEVEL = "NEXT_LEVEL";
export const PREV_LEVEL = "PREV_LEVEL";
export const RESTART_LEVEL = "RESTART_LEVEL";
export const LEVEL_HELP = "LEVEL_HELP";
/**
 * @function - Sends a signal to the reducer to go to next section of the level
 * 
 * @returns - reducer action obj with type NEXT_LEVEL
 */
export function next(){
  return { type: NEXT_LEVEL};
}

/**
 * @function - Sends a signal to the reducer to return to the previous state
 * 
 * @returns - reducer action obj with type PREV_LEVEL
 */
export function prev(){
  return { type: PREV_LEVEL};
}

/**
 * @function - Sends a signal to the reducer to restart the level
 * 
 * @returns - reducer action obj with type RESTART_LEVEL
 */
export function restart(){
  return { type: RESTART_LEVEL};
}

/**
 * @function - Sends a signal to the reducer to provide help if it is available
 * 
 * @returns - reducer action obj with type LEVEL_HELP
 */
export function help(){
  return { type: LEVEL_HELP};
}
