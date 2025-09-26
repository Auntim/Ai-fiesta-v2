'use client'

import { Button } from "@/components/ui/button"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
} from "@/components/ui/sidebar"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes";
import Image from "next/image"

export function AppSidebar() {
    const { theme, setTheme } = useTheme();
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
                    <Button className='w-full' size='lg'>  + New Chat </Button>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup className='p-2'>
                    <h2 className="text-md font-semibold">Chat History</h2>
                    <p className="text-sm text-gray-500">sign in to start chatting with multiple ai model</p>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <div className="mb-4">
                    <Button className={'w-full'} size='lg'>
                        Sign in / Sign Up
                    </Button>
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}