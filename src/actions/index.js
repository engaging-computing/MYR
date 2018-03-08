export const EDITOR_RENDER = 'EDITOR_RENDER'
export const EDITOR_REFRESH = 'EDITOR_REFRESH'


export function render(text){
  return { type: EDITOR_RENDER, text}
}

export function refresh(text){
  return { type: EDITOR_REFRESH, text}
}
