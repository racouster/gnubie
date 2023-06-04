import { createContext, useState, useEffect } from "react";
import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../utils/firebase/firebase.util";

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
});

export const UserContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const currentUserState = { currentUser, setCurrentUser };

    useEffect(() => {
        var unsubscribeAuthStateChangedListener = onAuthStateChangedListener(async (user) => {
            if (user) {
                await createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
        });

        return unsubscribeAuthStateChangedListener;
    }, []);

    return <UserContext.Provider value={currentUserState}>{children}</UserContext.Provider>
};