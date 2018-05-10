export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export function login(user){
  return {type: LOGIN, user};
}

export function logout(){
  return {type: LOGOUT};
}