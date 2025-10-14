import { Progress } from '@/components/ui/progress'
import { SignOutButton } from '@clerk/nextjs'
import React from 'react'

function CreditProgress({ remainingToken }) {
    return (
        <div className='p-2 border-2   rounded-2xl flex flex-col gap-2 mb-3'>
            <h2 className='font-bold text-md'>Free Plan</h2>
            <p className='text-sm text-gray-400'>{5 - remainingToken}/5 message Used</p>
            <Progress value={100 - ((5 - remainingToken) / 5) * 100} />
        </div>
    )
}

export default CreditProgress
