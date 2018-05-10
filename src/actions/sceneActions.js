export const NAME_SCENE = 'NAME_SCENE';
export const NEW_SCENE = 'NEW_SCENE';
export const SAVE_SCENE = 'SAVE_SCENE';
export const LOAD_SCENE = 'LOAD_SCENE';

export function nameScene(name){
  return {type: NAME_SCENE, name};
}

export function newScene(){
  return {type: NEW_SCENE };
}

export function loadScene(id){
  return {type: LOAD_SCENE, id };
}