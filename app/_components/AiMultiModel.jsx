import AiModelList from '@/Shared/AiModelList'
import Image from 'next/image'
import React, { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Switch } from '@/components/ui/switch'
import { MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'

function AiMultiModel() {
    const [aimodelList, setAimodelList] = useState(AiModelList)

    const onToggleChange = (model, value) => {
        setAimodelList((prev) => prev.map((m) =>
            m.model === model ? { ...m, enable: value } : m
        ))
    }
    return (
        <div className='flex flex-1 h-[75vh] border-b'>
            {aimodelList.map((model, index) => (
                <div key={index} className={`flex flex-col border-r overflow-auto flex-1  h-full ${model.enable ? ' min-w-[300px]' : 'flex-none max-w-[100px]'}`}>
                    <div className='flex items-center w-full justify-between border-b p-4 h-[56px]'>
                        <div className='flex items-center gap-4'>
                            <Image src={model.icon} alt='model' width={24} height={24} />

                            {model.enable && <Select>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder={model.subModel[0].name} />
                                </SelectTrigger>
                                <SelectContent>
                                    {model.subModel.map((submodel, index) => (
                                        <SelectItem key={index} value={submodel.name}>{submodel.name}</SelectItem>
                                    ))}

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
