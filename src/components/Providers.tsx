'use client'
import { ReactNode } from "react"
import { Provider } from "react-redux"
import store from "../redux/store"
import { MessagesProvider, useMessages } from "../context/MessagesContext"
import { ToastProvider } from "../context/ToastContext"
import MessagesPanel from "./MessagesPanel"

function DmPanelMount() {
  const { dmOpen, closeDm } = useMessages()
  return <MessagesPanel open={dmOpen} onClose={closeDm} />
}

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <MessagesProvider>
        <ToastProvider>
          {children}
          <DmPanelMount />
        </ToastProvider>
      </MessagesProvider>
    </Provider>
  )
}
