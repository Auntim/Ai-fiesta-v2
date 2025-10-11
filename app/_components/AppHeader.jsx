import { Button } from '@/components/ui/button'
import { SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'

function AppHeader() {
    return (
        <div className='w-full h-16 border-b flex items-center justify-between px-4'>
            <SidebarTrigger />

        </div>
    )
}

export default AppHeader
