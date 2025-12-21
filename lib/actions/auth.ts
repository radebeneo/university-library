"use server"

import {db} from "@/database/drizzle";
import {users} from "@/database/schema";
import {eq} from "drizzle-orm";
import {hash} from "bcryptjs";

const signUp = async (params: AuthCredentials) => {
    const {fullName, email, password, studentNumber, studentCard} = params;

    // Check if a user already exists
    const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1)

    if(existingUser.length > 0) {
        return { success: false, message: "User already exists" }
    }

    const hashedPassword = await hash(password, 10);

    try{
        await db.insert(users).values({fullName, email, password: hashedPassword, studentNumber, studentCard})
        return { success: true }

    } catch (error) {
        console.log(error, 'Signup error')
        return { success: false, message: "An error occurred while signing up" }

    }
}

