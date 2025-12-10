import {ReactNode} from "react";
import Image from "next/image";

const Layout = ({ children } : { children: ReactNode }) => {
    return <main className="auth-container">
        <section className="auth-form">
            <div className="auth-box">
                <div className="flex flex-row gap-3">
                    <Image src="/icons/logo.svg" width={37} height={37} alt="Logo"/>
                    <h1 className="text-2xl font-semibold text-white">Library </h1>
                </div>
                <div >{children}</div>
            </div>
            <section className="auth-illustration">
                <Image src="/images/auth-illustration.png" alt="auth illustration" width={1000} height={1000} className="size-full object-contain"/>
            </section>

        </section>

    </main>

}
export default Layout
