
export type LoadingStateType ={
    isLoading: boolean
}


const initState: LoadingStateType = {
    isLoading: false
}

type ActionsType = LoadingActionType

export const loadingReducer = (state = initState, action: ActionsType): LoadingStateType => { // fix any
    switch (action.type) {
        case 'CHANGE_LOADING':
            return {...state, isLoading: action.isLoading}
        default:
            return state
    }
}

type LoadingActionType = {
    type: 'CHANGE_LOADING'
    isLoading: boolean
}

export const loadingAC = (isLoading: boolean): LoadingActionType => ({
    type: 'CHANGE_LOADING',
    isLoading
})
