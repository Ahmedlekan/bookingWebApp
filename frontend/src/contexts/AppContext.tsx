import React, {createContext, useContext, useState} from 'react'
import Toast from '../components/Toast'
import * as apiClient from "../api-client";
import { useQuery } from '@tanstack/react-query'
import { loadStripe, Stripe } from '@stripe/stripe-js';

type ToastMessage = {
    message: string;
    type: "SUCCESS" | "ERROR";
}

type AppContextProps = {
    showToast: (toastMessage: ToastMessage)=> void
    isLoggedIn: boolean
    stripePromise: Promise<Stripe | null>;
}

const STRIPE_PUB_KEY = import.meta.env.VITE_STRIPE_PUB_KEY || ""
const stripePromise = loadStripe(STRIPE_PUB_KEY);

const AppContext = createContext<AppContextProps | undefined>(undefined)


export const AppContextProvider = ({children}:{children: React.ReactNode}) => {
    
    const [toast, setToast] = useState<ToastMessage | undefined>(undefined)
    const {isError} = useQuery({
        queryKey: ["validateToken"],
        queryFn: apiClient.validateToken
    })

  return (
    <AppContext.Provider value={{
        showToast: (toastMessage) => setToast(toastMessage),
        isLoggedIn: !isError,
        stripePromise
    }}>
        {toast && (
            <Toast message={toast.message} type={toast.type} onClose={ () => setToast(undefined)} />
        )}
        {children}
    </AppContext.Provider>
  )
}

export const useAppContext = ()=>{
    const context = useContext(AppContext)
    
    if (!context) {
        throw new Error('useAppContext must be used within an AppContextProvider');
    }
    return context;
}