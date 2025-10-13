'use client'

import React, { useEffect, useState } from 'react'
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from './_components/AppSidebar'
import AppHeader from './_components/AppHeader'
import { useUser } from '@clerk/nextjs'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '@/Config/FirebaseConfig'
import { AiselectedModelContext } from '@/context/AiSelectedModelContext'
import { DefaultModel } from '@/Shared/SharedModelAi'
import { UserDetailcontext } from '@/context/UserDetailcontext'

function Provider({ children, ...props }) {

    const [aiSelectedModel, setAiSelectedModel] = useState(DefaultModel);
    const [userDetails, setUserDetails] = useState();
    const { user } = useUser();

    useEffect(() => {
        if (user) {
            CreateNewuser();
        }
    }, [user])

    const CreateNewuser = async () => {
        const userRef = doc(db, 'users', user?.primaryEmailAddress?.emailAddress);
        const userSnaf = await getDoc(userRef);

        if (userSnaf.exists()) {
            console.log("user already exists");
            const userInfo = userSnaf.data();
            setAiSelectedModel(userInfo?.selectedModelRef);
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
            console.log("new user created");
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
                <AiselectedModelContext.Provider value={{ aiSelectedModel, setAiSelectedModel }}>
                    <SidebarProvider>
                        <AppSidebar />
                        <div className='w-full'>
                            <AppHeader />
                            {children}
                        </div>
                    </SidebarProvider>
                </AiselectedModelContext.Provider>
            </UserDetailcontext.Provider>
        </NextThemesProvider>

    )
}

export default Provider
