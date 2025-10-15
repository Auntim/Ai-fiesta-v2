'use client'

import { Button } from '@/components/ui/button'
import { Mic, Paperclip, Send } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import AiMultiModel from './AiMultiModel'
import { AiselectedModelContext } from '@/context/AiSelectedModelContext'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '@/Config/FirebaseConfig'
import { useAuth, useUser } from '@clerk/nextjs'
import { useSearchParams } from 'next/navigation'
import { toast } from 'sonner'


function ChatInputbox() {
    const [userInput, setUserInput] = useState()
    const { aiSelectedModel, setAiSelectedModel, messages, setMessages } = useContext(AiselectedModelContext);
    const [chatId, setChatId] = useState();
    const { user } = useUser();
    const params = useSearchParams();
    const [loading, setLoading] = useState(false);
    const { has } = useAuth();
    // const paidUser = has({ plan: 'premium' })


    useEffect(() => {
        const chatid = params.get('chatId');
        if (chatid) {
            setChatId(chatid);
            getMessages(chatId);
        }
        else {
            setMessages({});
            setChatId(uuidv4());
        }

    }, [params])

    const handleSend = async () => {
        if (!userInput.trim()) return;
        setLoading(true);

        // deduct anc check tokens here
        if (!has({ plan: 'premium' })) {
            const result = await axios.post('/api/user-remain-msg', {
                token: 1
            });
            const remainingToken = result?.data?.remainingToken;
            if (remainingToken <= 0) {
                console.log('token exceed')
                toast.error("Daily Limit Excceded😑")
                setLoading(false);
                return;
            }
        }


        // 1️⃣ Add user message to all enabled models
        setMessages((prev) => {
            const updated = { ...prev };
            Object.keys(aiSelectedModel).forEach((modelKey) => {
                if (aiSelectedModel[modelKey].enable) {
                    updated[modelKey] = [
                        ...(updated[modelKey] ?? []),
                        { role: "user", content: userInput },
                    ];
                }
            });
            return updated;
        });

        const currentInput = userInput; // capture before reset
        setUserInput("");

        // 2️⃣ Fetch response from each enabled model
        Object.entries(aiSelectedModel).forEach(async ([parentModel, modelInfo]) => {
            if (!modelInfo.modelId || aiSelectedModel[parentModel].enable == false) return;

            // Add loading placeholder before API call
            setMessages((prev) => ({
                ...prev,
                [parentModel]: [
                    ...(prev[parentModel] ?? []),
                    { role: "assistant", content: "loading", model: parentModel, loading: true },
                ],
            }));


            try {
                const result = await axios.post("/api/ai-multi-model", {
                    model: modelInfo.modelId,
                    message: [{ role: "user", content: currentInput }],
                    parentModel,
                });

                const { aiResponse, model } = result.data;

                // 3️⃣ Add AI response to that model’s messages
                setMessages((prev) => {
                    const updated = [...(prev[parentModel] ?? [])];
                    const loadingIndex = updated.findIndex((m) => m.loading);

                    if (loadingIndex !== -1) {
                        updated[loadingIndex] = {
                            role: "assistant",
                            content: aiResponse,
                            model,
                            loading: false,
                        };
                    } else {
                        // fallback if no loading msg found
                        updated.push({
                            role: "assistant",
                            content: aiResponse,
                            model,
                            loading: false,
                        });
                    }

                    return { ...prev, [parentModel]: updated };
                });
            } catch (err) {
                console.error(err);
                setMessages((prev) => ({
                    ...prev,
                    [parentModel]: [
                        ...(prev[parentModel] ?? []),
                        { role: "assistant", content: "⚠️ Error fetching response." },
                    ],
                }));
            }
        });
        console.log('Enable model:', aiSelectedModel)
    };

    useEffect(() => {
        if (messages) {
            saveMessages();
        }
    }, [messages])

    const saveMessages = async () => {
        const docref = doc(db, 'chatHistory', chatId);
        await setDoc(docref, {
            chatId: chatId,
            userEmail: user?.primaryEmailAddress?.emailAddress,
            messages: messages,
            lastUpdated: Date.now(),
        })
    }

    const getMessages = async (chatId) => {
        const docref = doc(db, 'chatHistory', chatId);
        const docSnap = await getDoc(docref);
        console.log(docSnap.data())
        const chatData = docSnap.data();
        setMessages(chatData?.messages);
    }

    return (
        <div className='relative min-h-screen'>
            {/* pagecontent */}
            <div>
                <AiMultiModel />
            </div>
            {/* inputbox */}
            <div className='fixed bottom-0 left-0 w-full px-4 pb-4 flex justify-center mt-6'>
                <div className='w-full max-w-2xl shadow-md rounded-xl border-2 p-4 ml-20'>
                    <input type="text" placeholder='Ask me Anything...'
                        className='border-0 outline-none w-full '
                        onChange={(event) => setUserInput(event.target.value)}
                        value={userInput}
                    />
                    <div className='flex justify-between items-center mt-2'>
                        <Button variant={"ghost"} className='' size={"icon"}>
                            <Paperclip className='w-5 h-5' />
                        </Button>
                        <div>
                            <Button variant={"ghost"} className='' size={"icon"}><Mic /></Button>
                            <Button className='' size={"icon"} onClick={handleSend} ><Send /></Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatInputbox
