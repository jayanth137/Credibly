import { Button } from '@/components/ui/button'
import { signOut } from 'next-auth/react'
import React from 'react'

function Logout() {
    return (
        <Button variant={'destructive'} onClick={() => signOut({ callbackUrl: '/' })}>Logout</Button>
    )
}

export default Logout