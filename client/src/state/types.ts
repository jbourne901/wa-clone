import IMessage from "../types/message";

export const actionTypes = {
    ADD_MESSAGE: "ADD_MESSAGE",
    SET_MESSAGES: "SET_MESSAGES"
};

export interface IAction {
    type: string;
    messages?: IMessage[],
    message?: IMessage
}

export interface IState {
    messages: IMessage[]
}

export const initialState: IState = {
    messages: []
};

export type IReducer = (state: IState, action: IAction) => IState;

export interface IReducerDispatch {
    state: IState,
    dispatch: React.Dispatch<IAction>
};

