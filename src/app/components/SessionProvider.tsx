import { SessionProvider } from "next-auth/react";

export const SessionProviderComp = ({ children,session }: { children: React.ReactNode,session:any }) => {
    return (
        <SessionProvider session={session}>
            { children }
        </SessionProvider>
    )
}