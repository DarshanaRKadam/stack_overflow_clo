export const serCurrentUser = (data) => {
    return{
        type: 'FETCH_CURRENT_USER',
        payload: data
    }
}
