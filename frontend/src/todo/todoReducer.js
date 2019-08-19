const INITIAL_STATE = {
    description: '',
    todoList: []
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'DESCRIPTION_CHANGED':
            return { ...state, description: action.payload }
        case 'TODO_SEARCHED':
            return { ...state, todoList: action.payload.data }
        default:
            return state
    }
}