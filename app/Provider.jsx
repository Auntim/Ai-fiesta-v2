'use client'

import React, { use, useEffect, useState } from 'react'
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from './_components/AppSidebar'
import AppHeader from './_components/AppHeader'
import { useUser } from '@clerk/nextjs'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '@/Config/FirebaseConfig'
import { AiselectedModelContext } from '@/context/AiSelectedModelContext'
import { DefaultModel } from '@/Shared/SharedModelAi'
import { UserDetailcontext } from '@/context/UserDetailcontext'
import { Toaster } from 'sonner'

function Provider({ children, ...props }) {

    const [aiSelectedModel, setAiSelectedModel] = useState(DefaultModel);
    const [userDetails, setUserDetails] = useState();
    const [messages, setMessages] = useState();
    const { user } = useUser();

    useEffect(() => {
        if (user) {
            CreateNewuser();
        }
    }, [user])

    useEffect(() => {
        UpdateAimodelSelectionpref();
    }, [aiSelectedModel]);

    const UpdateAimodelSelectionpref = async () => {
        const docref = doc(db, "users", user?.primaryEmailAddress?.emailAddress);
        await updateDoc(docref, {
            selectedModelRef: aiSelectedModel
        })
    }

    const CreateNewuser = async () => {
        const userRef = doc(db, 'users', user?.primaryEmailAddress?.emailAddress);
        const userSnaf = await getDoc(userRef);

        if (userSnaf.exists()) {
            // console.log("user already exists");
            const userInfo = userSnaf.data();
            setAiSelectedModel(userInfo?.selectedModelRef ?? DefaultModel);
            setUserDetails(userInfo);
            return;
        }
        else {
            const userData = {
                name: user?.fullName,
                email: user?.primaryEmailAddress?.emailAddress,
                remaining: 5,//free user
                plan: "free",
                createdAt: new Date(),
                credits: 1000, //paid user
            }
            await setDoc(userRef, userData);
            // console.log("new user created");
            setUserDetails(userData);
        }

    }
    return (

        <NextThemesProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            {...props}>
            <UserDetailcontext.Provider value={{ userDetails, setUserDetails }}>
                <AiselectedModelContext.Provider value={{ aiSelectedModel, setAiSelectedModel, messages, setMessages }}>
                    <SidebarProvider>
                        <AppSidebar />
                        <div className='w-full'>
                            <AppHeader />
                            {children}
                            <Toaster />
                        </div>
                    </SidebarProvider>
                </AiselectedModelContext.Provider>
            </UserDetailcontext.Provider>
        </NextThemesProvider>

    )
}

export default Provider
