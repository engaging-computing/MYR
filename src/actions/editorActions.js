export const EDITOR_RENDER = 'EDITOR_RENDER';
export const EDITOR_REFRESH = 'EDITOR_REFRESH';

/**
 * @function - Sends a signal to the reducer to render the Aframe scene with the given text
 * 
 * @param {string} text - Text from the Ace Editor component
 * 
 * @returns - reducer action obj with type and text
 */
export function render(text){
  return { type: EDITOR_RENDER, text};
}

/**
 * @function - Sends a signal to the reducer to refresh with the given text
 * 
 * @param {string} text - Text from the Ace Editor component
 * 
 * @returns - reducer action obj with type and text
 */
export function refresh(text){
  return { type: EDITOR_REFRESH, text};
}