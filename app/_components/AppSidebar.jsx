'use client'

import { Button } from "@/components/ui/button"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
} from "@/components/ui/sidebar"
import { SignInButton, SignOutButton, useAuth, UserProfile, useUser } from "@clerk/nextjs";
import { Bold, Bolt, Moon, Sun, User2, Zap } from "lucide-react"
import { useTheme } from "next-themes";
import Image from "next/image"
import CreditProgress from "./CreditProgress";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/Config/FirebaseConfig";
import { useContext, useEffect, useState } from "react";
import moment from "moment/moment";
import Link from "next/link";
import axios from "axios";
import { AiselectedModelContext } from "@/context/AiSelectedModelContext";
import PricingModal from "./PricingModal";

export function AppSidebar() {
    const { theme, setTheme } = useTheme();
    const { user } = useUser();
    const [chatHistory, setChatHistory] = useState([]);
    const [remainingToken, setRemainingToken] = useState(0);
    const { aiSelectedModel, setAiSelectedModel, messages, setMessages } = useContext(AiselectedModelContext);
    const { has } = useAuth();
    // const paidUser = has({ plan: 'premium' })

    useEffect(() => {
        user && getChatHistory();

    }, [user])


    useEffect(() => {
        getRenainingToken();
    }, [messages])

    const getChatHistory = async () => {
        const q = query(collection(db, 'chatHistory'), where("userEmail", "==", user?.primaryEmailAddress?.emailAddress));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            setChatHistory((prev) => [...prev, doc.data()])
        })
    }


    const getLastUsermsgfromChat = (chat) => {

        const allMessages = Object.values(chat.messages).flat();
        const userMessages = allMessages.filter(msg => msg.role === 'user');
        const lastUserMessage = userMessages[userMessages.length - 1]?.content || null;
        const lastUpdated = chat.lastUpdated || Date.now();
        const formatedDate = moment(lastUpdated).fromNow();
        return {
            chatId: chat.chatId,
            message: lastUserMessage,
            lastUpdated: formatedDate,
        }

    }

    const getRenainingToken = async () => {
        const result = await axios.post('/api/user-remain-msg');
        console.log(result.data);
        setRemainingToken(result.data.remainingToken);

    }

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
                        <Link href={'/'}>
                            <Button className='w-full' size='lg'>  + New Chat </Button></Link>
                        :
                        <SignInButton>
                            <Button className='w-full' size='lg'>  + New Chat </Button>
                        </SignInButton>
                    }
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup className='p-2'>
                    <div>
                        <h2 className="text-xl font-semibold"> History</h2>
                        {!user && <p className="text-sm text-gray-500">sign in to start chatting with multiple ai model</p>

                        }
                        {chatHistory.map((chat, index) => (
                            <Link href={'?chatId=' + chat.chatId} key={index} className="mt-2">
                                <div className="hover:bg-gray-100 cursor-pointer p-2 rounded-md">
                                    <h2 className="text-sm text-gray-500">{getLastUsermsgfromChat(chat).lastUpdated}</h2>
                                    <h2 className="text-md line-clamp-1">{getLastUsermsgfromChat(chat).message}</h2>

                                </div>
                                <hr className="my-1" />
                            </Link>
                        ))}

                    </div>
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
                            {!has({ plan: 'premium' }) &&
                                <div>
                                    <CreditProgress remainingToken={remainingToken} />
                                    <PricingModal>
                                        <Button className={'w-full mb-3'}><Zap />Upgrade Plan</Button>
                                    </PricingModal>
                                </div>}
                            <Button className={' gap-2 flex justify-center w-full'} variant={'ghost'}>
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