import {createContext, ReactNode, useEffect, useReducer} from 'react';
import {Auth0Client} from '@auth0/auth0-spa-js';
// @types
import {ActionMap, Auth0ContextType, AuthState, AuthUser} from '../@types/auth';
//
import {AUTH0_API} from '../components/config';
import {User, UserRole} from "../@types/graphql/graphql";

// ----------------------------------------------------------------------

let auth0Client: Auth0Client | null = null;

const initialState: AuthState = {
    isAuthenticated: false, isInitialized: false, user: null,
};

enum Types {
    init = 'INITIALIZE', login = 'LOGIN', logout = 'LOGOUT',
}

type Auth0AuthPayload = {
    [Types.init]: {
        isAuthenticated: boolean; user: AuthUser;
    }; [Types.login]: {
        user: AuthUser;
    }; [Types.logout]: undefined;
};

type Auth0Actions = ActionMap<Auth0AuthPayload>[keyof ActionMap<Auth0AuthPayload>];

const reducer = (state: AuthState, action: Auth0Actions) => {
    if (action.type === Types.init) {
        const {isAuthenticated, user} = action.payload;
        return {
            ...state, isAuthenticated, isInitialized: true, user,
        };
    }
    if (action.type === Types.login) {
        const {user} = action.payload;
        return {...state, isAuthenticated: true, user};
    }
    if (action.type === Types.logout) {
        return {
            ...state, isAuthenticated: false, user: null,
        };
    }
    return state;
};

const AuthContext = createContext<Auth0ContextType | null>(null);

// ----------------------------------------------------------------------

type AuthProviderProps = {
    children: ReactNode;
};

function AuthProvider({children}: AuthProviderProps) {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const initialize = async () => {
            try {
                auth0Client = new Auth0Client({
                    client_id: AUTH0_API.clientId || '',
                    domain: AUTH0_API.domain || '',
                    redirect_uri: window.location.origin,
                });

                await auth0Client.checkSession();

                const isAuthenticated = await auth0Client.isAuthenticated();

                if (isAuthenticated) {
                    const user = await auth0Client.getUser();

                    dispatch({
                        type: Types.init, payload: {isAuthenticated, user: user as User || null},
                    });
                } else {
                    dispatch({
                        type: Types.init, payload: {isAuthenticated, user: null},
                    });
                }
            } catch (err) {
                console.error(err);
                dispatch({
                    type: Types.init, payload: {isAuthenticated: false, user: null},
                });
            }
        };

        initialize();
    }, []);

    const login = async () => {
        await auth0Client?.loginWithPopup();
        const isAuthenticated = await auth0Client?.isAuthenticated();

        if (isAuthenticated) {
            const user = await auth0Client?.getUser();
            dispatch({type: Types.login, payload: {user: user as User || null}});
        }
    };

    const logout = () => {
        auth0Client?.logout();
        dispatch({type: Types.logout});
    };

    return (<AuthContext.Provider
            value={{
                ...state, method: 'auth0', user: {
                    id: state?.user?.id || '',
                    role: UserRole.ADMIN,
                    createdAt: state?.user?.createdAt,
                    updatedAt: state?.user?.updatedAt,
                    email: state?.user?.email || '',
                    emailActive: state?.user?.emailActive || false,
                    hashedPassword: '',
                    ...state.user,
                    enrollments: state?.user?.enrollments || []
                }, login, logout,
            }}
        >
            {children}
        </AuthContext.Provider>);
}

export {AuthContext, AuthProvider};
