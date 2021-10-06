const initialState = {
    projects: []
}

export const reducer = (state = initialState, action) => {
    switch (action.type){
        case 'GET_PROJECT':
            return {...state, projects: action.payload}
        case 'ADD_PROJECT':
            return {projects: [...state.projects, action.payload]}
        default:
            return state
    }
}