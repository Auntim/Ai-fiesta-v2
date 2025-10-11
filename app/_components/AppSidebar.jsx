'use client'

import { Button } from "@/components/ui/button"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
} from "@/components/ui/sidebar"
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { Bold, Bolt, Moon, Sun, User2, Zap } from "lucide-react"
import { useTheme } from "next-themes";
import Image from "next/image"
import CreditProgress from "./CreditProgress";

export function AppSidebar() {
    const { theme, setTheme } = useTheme();
    const { user } = useUser();
    return (
        <Sidebar>
            <SidebarHeader >
                <div className="flex items-center justify-between ">
                    <div className="flex items-center justify-between space-x-1">
                        <Image src={'/logo.svg'} alt="logo" height={50} width={50}
                            className="p-3"
                        />
                        <span className="text-xl font-bold">Ai-Fiesta</span>
                    </div>
                    <div>
                        {theme == 'light' ? <Button variant="ghost" size="icon" onClick={() => setTheme('dark')}>
                            <Sun />
                        </Button> : <Button variant="ghost" size="icon" onClick={() => setTheme('light')}>
                            <Moon />
                        </Button>}
                    </div>
                </div>
                <div className="mt-1 w-full">
                    {user ?
                        <Button className='w-full' size='lg'>  + New Chat </Button>
                        :
                        <SignInButton>
                            <Button className='w-full' size='lg'>  + New Chat </Button>
                        </SignInButton>
                    }
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup className='p-2'>
                    <h2 className="text-md font-semibold">Chat History</h2>
                    {!user ? <p className="text-sm text-gray-500">sign in to start chatting with multiple ai model</p>
                        :
                        <h2>history</h2>
                    }
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <div className="mb-4">
                    {!user ? <SignInButton mode="modal">
                        <Button className={'w-full'} size='lg'>
                            Sign in / Sign Up
                        </Button>
                    </SignInButton>
                        :
                        <div>
                            <CreditProgress />
                            <Button className={'w-full mb-3'}><Zap />Upgrade Plan</Button>
                            <Button className={' gap-2 flex justify-between'} variant={'ghost'}>
                                <User2 />
                                <h2>Settings</h2>
                            </Button>
                            <SignOutButton>
                                <Button className={'w-full mt-3'} variant={'destructive'}>Sign Out</Button>
                            </SignOutButton>
                        </div>
                    }
                </div>
            </SidebarFooter>
        </Sidebar >
    )
}