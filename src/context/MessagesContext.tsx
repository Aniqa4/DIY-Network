'use client'
import { createContext, useContext, useState, ReactNode } from "react"

interface MessagesContextValue {
  dmOpen: boolean
  openDm: (userId?: string) => void
  closeDm: () => void
  targetUser: string | null
}

const MessagesContext = createContext<MessagesContextValue>({
  dmOpen: false,
  openDm: () => {},
  closeDm: () => {},
  targetUser: null,
})

export function MessagesProvider({ children }: { children: ReactNode }) {
  const [dmOpen, setDmOpen] = useState(false)
  const [targetUser, setTargetUser] = useState<string | null>(null)

  function openDm(userId?: string) {
    setTargetUser(userId ?? null)
    setDmOpen(true)
  }

  function closeDm() {
    setDmOpen(false)
  }

  return (
    <MessagesContext.Provider value={{ dmOpen, openDm, closeDm, targetUser }}>
      {children}
    </MessagesContext.Provider>
  )
}

export function useMessages() {
  return useContext(MessagesContext)
}
