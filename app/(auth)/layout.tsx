import {ReactNode} from "react";
import Image from "next/image";
import {auth} from "@/auth";
import {redirect} from "next/navigation"

const Layout = async ({ children } : { children: ReactNode }) => {

    const session = await auth()

    if(session) redirect('/')

    return <main className="auth-container">

        <section className="auth-form">
            <section className="auth-illustration">
                <Image src="/images/auth-illustration.png" alt="auth illustration" width={1000} height={1000} className="size-full object-contain"/>
            </section>
            <div className="auth-box">
                <div className="flex flex-row gap-3">
                    <Image src="/icons/logo.svg" width={37} height={37} alt="Logo"/>
                    <h1 className="text-2xl font-semibold text-white">Library </h1>
                </div>
                <div >{children}</div>
            </div>
        </section>

    </main>

}
export default Layout
