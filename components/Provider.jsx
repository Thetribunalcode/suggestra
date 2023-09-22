
'use client'

import { SessionProvider } from 'next-auth/react'
export const Provider = ( {children, session}) => {
  return (
    <SessionProvider>{ children}</SessionProvider>
  )
}
