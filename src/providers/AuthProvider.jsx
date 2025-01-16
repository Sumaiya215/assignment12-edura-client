import 
{ createUserWithEmailAndPassword,
     GithubAuthProvider,
     GoogleAuthProvider,
     onAuthStateChanged,
     signInWithEmailAndPassword, 
     signInWithPopup,
     signOut, 
     updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.init";

export const AuthContext = createContext(null)
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const AuthProvider = ({children}) => {
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);

const createUser = (email, password) =>{
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
}

const signInUser = (email, password) =>{
    setLoading(true)
    return signInWithEmailAndPassword(auth,email,password)
}

const signInWithGoogle = () => {
    setLoading(true)
    return signInWithPopup(auth, googleProvider)
}

const signInWithGithub = () => {
    setLoading(true)
    return signInWithPopup(auth, githubProvider)
}

const logOut = async() =>{
    setLoading(true)
    return signOut(auth)
}

const updateUserProfile = (name,photo) =>{
    return updateProfile(auth.currentUser ,{
        displayName: name,
        photoURL: photo,
    })
}

useEffect(() =>{
    const unsubscribe = onAuthStateChanged(auth, currentUser =>{
        setUser(currentUser)
        console.log(currentUser);

        setLoading(false)
        return () =>{
            return unsubscribe()
        }
    })
},[])

const authInfo = {
        user,
        setUser,
        loading,
        setLoading,
        createUser,
        signInUser,
        signInWithGoogle,
        signInWithGithub,
        logOut,
        updateUserProfile
    }



    return (
        <AuthContext.Provider value={authInfo} >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;