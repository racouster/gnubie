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
        var unsubscribeAuthStateChangedListener = onAuthStateChangedListener(async (auth) => {
            if (auth ?? auth.user) {
                await createUserDocumentFromAuth(auth.user);
            }
            setCurrentUser(auth.user);
        });

        return unsubscribeAuthStateChangedListener;
    }, []);

    return <UserContext.Provider value={currentUserState}>{children}</UserContext.Provider>
};