export const EDITOR_RENDER = 'EDITOR_RENDER'
export const EDITOR_REFRESH = 'EDITOR_REFRESH'
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const NAME_SCENE = 'NAME_SCENE'


export function render(text){
  return { type: EDITOR_RENDER, text}
}

export function refresh(text){
  return { type: EDITOR_REFRESH, text}
}

export function login(user){
  return {type: LOGIN, user}
}

export function logout(){
  return {type: LOGOUT}
}

export function nameScene(name){
  return {type: NAME_SCENE, name}
}