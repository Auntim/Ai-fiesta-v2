import AiModelList from '@/Shared/AiModelList'
import Image from 'next/image'
import React, { useContext, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Switch } from '@/components/ui/switch'
import { MessageSquare, Lock, Loader } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AiselectedModelContext } from '@/context/AiSelectedModelContext'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '@/Config/FirebaseConfig'
import { useUser } from '@clerk/nextjs'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

function AiMultiModel() {
    const { user } = useUser();
    const [aimodelList, setAimodelList] = useState(AiModelList)
    const { aiSelectedModel, setAiSelectedModel, messages, setMessages } = useContext(AiselectedModelContext);


    // console.log(aiSelectedModel);

    const onToggleChange = (model, value) => {
        setAimodelList((prev) => prev.map((m) =>
            m.model === model ? { ...m, enable: value } : m
        ))

        setAiSelectedModel((prev) => ({
            ...prev,
            [model]: {
                ...(prev[model] ?? {}),
                enable: value
            }
        }))
        console.log(aiSelectedModel)

    }

    const onSelectedValue = async (parentModel, value) => {
        setAiSelectedModel(prev => ({
            ...prev,
            [parentModel]: {
                modelId: value
            }
        }))

        // update to firebase database

    }
    return (
        <div className='flex flex-1 h-[75vh] border-b'>
            {aimodelList.map((model, index) => (
                <div key={index} className={`flex flex-col border-r overflow-auto flex-1  h-full ${model.enable ? ' min-w-[300px]' : 'flex-none max-w-[100px]'}`}>
                    <div className='flex items-center w-full justify-between border-b p-4 h-[56px]'>
                        <div className='flex items-center gap-4'>
                            <Image src={model.icon} alt='model' width={24} height={24} />

                            {model.enable &&
                                <Select defaultValue={aiSelectedModel[model.model]?.modelId}
                                    onValueChange={(value) => onSelectedValue(model.model, value)}
                                    disabled={model.premium}
                                >
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder={aiSelectedModel[model.model]?.modelId
                                        } />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Free</SelectLabel>
                                            {model.subModel.map((submodel, index) => submodel.premium == false && (
                                                <SelectItem key={index} value={submodel.id}>{submodel.name}</SelectItem>
                                            ))}
                                        </SelectGroup>
                                        <SelectGroup>
                                            <SelectLabel>Premium</SelectLabel>
                                            {model.subModel.map((submodel, index) => submodel.premium == true && (
                                                <SelectItem key={index} value={submodel.id} disabled={submodel.premium}>{submodel.name}   {submodel.premium && <Lock className='h-4 w-4' />}</SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>}
                        </div>

                        <div>
                            {model.enable ? <Switch checked={model.enable}
                                onCheckedChange={(v) => onToggleChange(model.model, v)}
                            /> : <MessageSquare onClick={() => onToggleChange(model.model, true)} />}
                        </div>

                    </div >
                    {model.premium && model.enable && <div className='flex items-center justify-center h-full'>
                        <Button >Upgarde to Unlock</Button>
                    </div>}

                    {model.enable && <div className='flex-1 p-4'>
                        <div className='flex-1 p-4 space-y-2'>
                            {messages?.[model.model]?.map((m, i) => (

                                <div className={`p-2 rounded-md ${m.role == 'user' ? 'bg-blue-100 text-right' : 'bg-gray-200 text-left'}`} key={i}>

                                    {m.role == 'assistant' && (
                                        <span className='text-gray-400 text-sm'>{m.model ?? model.model}</span>
                                    )}
                                    <div className='flex items-center gap-1'>
                                        {m.content == 'loading' && <><Loader className='animate-spin' /><span>Thinking...</span> </>}
                                        {m.content !== 'loading' &&
                                            <Markdown remarkPlugins={[remarkGfm]}  >
                                                {m.content}
                                            </Markdown>
                                        }

                                    </div>
                                </div>
                            )
                            )}
                        </div>
                    </div>}
                </div>

            ))}

        </div>

    )
}

export default AiMultiModel
