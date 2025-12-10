"use client"

import React from 'react'
import {signUpSchema} from "@/lib/validations";
import AuthForm from "@/components/AuthForm";



const Page = () => (
    <AuthForm
        type="SIGN_UP"
        schema={signUpSchema}
        defaultValues={{
            email: '',
            password: '',
            fullName: '',
            studentNumber: 0,
            studentCard: '',
        }}
        onSubmit={() =>{}}
    />
)
export default Page
