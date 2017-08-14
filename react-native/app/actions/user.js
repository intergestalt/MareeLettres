export const GET_USER_ID = 'GET_USER_ID';
export const GET_USER_LETTER = 'GET_USER_LETTER';

export const getUserLetter = () => ({
  typer: GET_USER_LETTER,
})

export const getUserId = () => ({
  type: GET_USER_ID,
})
