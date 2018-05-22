export const NAME_SCENE = 'NAME_SCENE';
export const NEW_SCENE = 'NEW_SCENE';
export const LOAD_SCENE = 'LOAD_SCENE';

/**
* @summary - This function registers the scene's name with Redux
* 
* @param {string} name - the name is givn by the user or when a scene is loarded
* 
* @returns - a reducer action with type:NAME_SCENE
*/
export function nameScene(name){
  return {type: NAME_SCENE, name};
}

/**
* @summary - This function registers the scene's id with Redux
* 
* @param {string} id - the id of the loaded scene
* 
* @returns - a reducer action with type:LOAD_SCENE
*/
export function loadScene(id){
  return {type: LOAD_SCENE, id };
}