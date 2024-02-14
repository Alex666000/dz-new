const initState: ThemeStateType = {
    themeId: 1,
}

type ThemeStateType = {
    themeId: number
}

export const themeReducer = (state = initState, action: changeThemeIdACT): ThemeStateType => { // fix any
    switch (action.type) {
        case 'SET_THEME_ID':
            return {...state, themeId: action.id}
        default:
            return state
    }
}

export const changeThemeId = (id: number): changeThemeIdACT => ({ type: 'SET_THEME_ID', id }) // fix any

type changeThemeIdACT = {
    type: 'SET_THEME_ID',
    id: number
}