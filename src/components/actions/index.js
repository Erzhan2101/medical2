import axios from "axios";

export const getProjects = () => {
    return (dispatch) => {
        axios("https://614af56ce4cc2900179eae02.mockapi.io/api/gallery")
            .then(({data}) => dispatch({type: 'GET_PROJECT', payload: data}))
    }
}

export const addProject = (data) => {
    return (dispatch) => {
axios.post('https://614af56ce4cc2900179eae02.mockapi.io/api/gallery', data)
    .then(({data}) => dispatch({type: 'ADD_PROJECT', payload: data}))
    }
}