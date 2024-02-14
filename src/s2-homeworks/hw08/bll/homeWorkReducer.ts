import {UserType} from '../HW8'

type ActionType =
    | { type: 'sort'; payload: 'up' | 'down' }
    | { type: 'check'; payload: number }

export const homeWorkReducer = (state: UserType[], action: ActionType): UserType[] => { // need to fix any
    switch (action.type) {
        case 'sort': {
            const stateCopy = [...state]
            switch (action.payload)
            {
                case 'up':
                    return stateCopy.sort((a, b) => a.name.localeCompare(b.name))
                case 'down':
                    return stateCopy.sort((a, b) => b.name.localeCompare(a.name))
                default:
                    return state
            }
        }
        case 'check': {
            return state.filter(u => u.age >= action.payload)
        }
        default:
            return state
    }
}
