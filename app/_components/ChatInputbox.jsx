import { Button } from '@/components/ui/button'
import { Mic, Paperclip, Send } from 'lucide-react'
import React from 'react'
import AiMultiModel from './AiMultiModel'

function ChatInputbox() {
    return (
        <div className='relative min-h-screen'>
            {/* pagecontent */}
            <div>
                <AiMultiModel />
            </div>
            {/* inputbox */}
            <div className='fixed bottom-0 left-0 w-full px-4 pb-4 flex justify-center'>
                <div className='w-full max-w-2xl shadow-md rounded-xl border p-4'>
                    <input type="text" placeholder='Ask me Anything...'
                        className='border-0 outline-none '
                    />
                    <div className='flex justify-between items-center mt-2'>
                        <Button variant={"ghost"} className='' size={"icon"}>
                            <Paperclip className='w-5 h-5' />
                        </Button>
                        <div>
                            <Button variant={"ghost"} className='' size={"icon"}><Mic /></Button>
                            <Button className='' size={"icon"}><Send /></Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatInputbox
