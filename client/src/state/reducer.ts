import {IAction, IState, IReducer, actionTypes} from "./types";

const reducer: IReducer = (state: IState, action: IAction) => {
    let nextState: IState = state;
    switch(action.type) {
        case actionTypes.ADD_MESSAGE:         
            if(action.message) {
                const nextMessages = [...state.messages];
                nextMessages.push(action.message);
                nextState = {...state, messages: nextMessages};
                console.log(`ADD_MESSAGE nextstate = `)
                console.dir(nextState)
            }
            break;
        case actionTypes.SET_MESSAGES:
            if(action.messages) {
                nextState = {...state, messages: action.messages};
                console.log(`SET_MESSAGES nextstate = `)
                console.dir(nextState);    
            }
            break;
    }
    return nextState;
};

export default reducer;
