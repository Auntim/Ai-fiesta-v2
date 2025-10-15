import { Button } from '@/components/ui/button'
import { SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'

function AppHeader() {
    return (
        <div className=' border-b '>
            <SidebarTrigger />
        </div>
    )
}

export default AppHeader
