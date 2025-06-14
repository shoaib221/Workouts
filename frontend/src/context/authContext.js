import { createContext, useReducer, useEffect } from 'react';
import { initURL } from '../constants/urls';

export const AuthContext = createContext();

export const authReducer = (state, action) => {
    if (action.type === 'LOGIN') return { user: action.payload };
    else if ( action.type === 'LOGOUT' ) return { user: null };
    else return state;
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, { user: null });

    async function  Init() {
        
        const user = JSON.parse(localStorage.getItem('user'));
        if(!user) return;
        
        
        const response = await fetch(initURL, {
            headers: {'Authorization': `Bearer ${user.token}`} 
        });
        
        const json = await response.json();
        if( response.ok ) dispatch({ type: 'LOGIN', payload: user });
        else 
        {
            localStorage.removeItem('user');
            dispatch( { type: 'LOGOUT' } );
        }
        
    }

    useEffect(() => {
        Init();
    }, [])

    //console.log('AuthContext state:', state)
    
    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
        { children }
        </AuthContext.Provider>
    )

}

