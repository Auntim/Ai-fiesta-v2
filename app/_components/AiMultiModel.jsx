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
import { MessageSquare, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AiselectedModelContext } from '@/context/AiSelectedModelContext'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '@/Config/FirebaseConfig'
import { useUser } from '@clerk/nextjs'

function AiMultiModel() {
    const { user } = useUser();
    const [aimodelList, setAimodelList] = useState(AiModelList)
    const { aiSelectedModel, setAiSelectedModel } = useContext(AiselectedModelContext);

    console.log(aiSelectedModel);

    const onToggleChange = (model, value) => {
        setAimodelList((prev) => prev.map((m) =>
            m.model === model ? { ...m, enable: value } : m
        ))
    }

    const onSelectedValue = async (parentModel, value) => {
        setAiSelectedModel(prev => ({
            ...prev,
            [parentModel]: {
                modelId: value
            }
        }))

        // update to firebase database
        const docref = doc(db, "users", user?.primaryEmailAddress?.emailAddress);
        await updateDoc(docref, {
            selectedModelRef: aiSelectedModel
        })
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
                </div>
            ))}
        </div>
    )
}

export default AiMultiModel
