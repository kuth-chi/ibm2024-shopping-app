import React, { createContext, useReducer } from 'react';

// The reducer - this is used to update the state, based on the action
export const AppReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_QUANTITY': {
            const new_expenses = state.expenses.map((expense) => {
                if (expense.name === action.payload.name) {
                    return { ...expense, quantity: expense.quantity + action.payload.quantity };
                }
                return expense;
            });
            return {
                ...state,
                expenses: new_expenses,
            };
        }
        case 'RED_QUANTITY': {
            const new_expenses = state.expenses.map((expense) => {
                if (expense.name === action.payload.name) {
                    const newQuantity = Math.max(expense.quantity - action.payload.quantity, 0);
                    return { ...expense, quantity: newQuantity };
                }
                return expense;
            });
            return {
                ...state,
                expenses: new_expenses,
            };
        }
        case 'DELETE_ITEM': {
            const new_expenses = state.expenses.map((expense) => {
                if (expense.name === action.payload.name) {
                    return { ...expense, quantity: 0 };
                }
                return expense;
            });
            return {
                ...state,
                expenses: new_expenses,
            };
        }
        case 'CHG_LOCATION':
            return {
                ...state,
                Location: action.payload,
            };
        default:
            return state;
    }
};

// Sets the initial state when the app loads
const initialState = {
    expenses: [
        { id: "Shirt", name: 'Shirt', quantity: 0, unitprice: 500 },
        { id: "Jeans", name: 'Jeans', quantity: 0, unitprice: 300 },
        { id: "Dress", name: 'Dress', quantity: 0, unitprice: 400 },
        { id: "Dinner set", name: 'Dinner set', quantity: 0, unitprice: 600 },
        { id: "Bags", name: 'Bags', quantity: 0, unitprice: 200 },
    ],
    Location: '£'
};

// Creates the context - this is the thing our components import and use to get the state
export const AppContext = createContext();

// Provider component - wraps the components we want to give access to the state
// Accepts the children, which are the nested (wrapped) components
export const AppProvider = (props) => {
    // Sets up the app state. Takes a reducer and an initial state
    const [state, dispatch] = useReducer(AppReducer, initialState);

    const totalExpenses = state.expenses.reduce((total, item) => {
        return total + (item.unitprice * item.quantity);
    }, 0);

    return (
        <AppContext.Provider
            value={{
                expenses: state.expenses,
                CartValue: totalExpenses,
                Location: state.Location,
                dispatch,
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};
