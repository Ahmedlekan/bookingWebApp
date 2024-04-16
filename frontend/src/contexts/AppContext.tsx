import React, {createContext, useContext} from 'react'

type ToastMessage = {
    message: string;
    type: "SUCCESS" | "ERROR";
}

type AppContextProps = {
    showToast: (toastMessage: ToastMessage)=> void
}

const AppContext = createContext<AppContextProps | undefined>(undefined)

export const AppContextProvider = ({children}:{children: React.ReactNode}) => {
  return (
    <AppContext.Provider value={{
        showToast:(toastMessage)=> console.log(toastMessage)
    }}>
        {children}
    </AppContext.Provider>
  )
}

export const useAppContext = ()=>{
    const context = useContext(AppContext)
    return context as AppContext
}