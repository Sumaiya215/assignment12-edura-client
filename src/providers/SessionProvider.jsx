import { createContext, useContext, useState } from "react";

const SessionContext = createContext();

export const useSession = () => useContext(SessionContext);

const SessionProvider = ({children}) => {
    const [sessionData, setSessionData] = useState(null)
    return (
        <SessionContext.Provider value={{sessionData, setSessionData}}>
            {children}
        </SessionContext.Provider>
    );
};

export default SessionProvider;