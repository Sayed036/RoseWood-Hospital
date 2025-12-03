import { createContext } from "react";


export const AppContext = createContext()

const currency = '₹'

const AppContextProvider = (props) => {

    const calculateAge = (dob)=> {
        const today = new Date();
        const birthDate = new Date(dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        return age 
    }
    const value = {
        calculateAge, currency
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider