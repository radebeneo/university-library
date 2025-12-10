import { z } from 'zod'
export const signUpSchema = z.object({
    fullName: z.string().min(3),
    email: z.string().email(),
    studentNumber: z.coerce.number(),
    studentCard: z.string().nonempty('Student card is required '),
    password: z.string().min(8),

})

export const signInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
})