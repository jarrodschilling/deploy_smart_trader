import { z } from 'zod'

export const addTransactionFormSchema = z.object({
    ticker: z
        .string({
            required_error: "Ticker required"
        })
        .min(1, {
            message: "Must be at least 1 character"
        })
        .max(5, {
            message: "Cannot be longer than 5 characters"
        })
        .toUpperCase(),
    date: z
        .string({
            message: "Transaction date required"
        })
        .min(1, {
            message: "Transaction date required"
        }),
    buySell: z
        .enum(["buy", "sell"], {
            errorMap: (issue, ctx) => {
                return {message: 'Please select buy or sell'};
            },
        }),
    shares: z.coerce
        .number({
            required_error: "Shares required"
        })
        .lte(1000000, {
            message: "1,000,000 share max"
        })
        .positive(),
    price: z.coerce
        .number({
            required_error: "Price required"
        })
        .gte(1, {
            message: "Price must be above $1"
        })
        .lte(25000, {
            message: "Price must be less than $25,000"
        })
        .positive(),
    shaper: z
        .optional(
            z.string({
                message: "Must be a string"
            })
            .max(50, {
                message: "Cannot be longer than 50 characters"
            })
        ),
    tactical: z
        .optional(
            z.string({
                message: "Must be a string"
            })
            .max(50, {
                message: "Cannot be longer than 50 characters"
            })
        ),
    closeTrade: z
        .optional(
            z.enum(['true', 'false']).transform((value) => value === 'true')
        ),
    openTrade: z
        .optional(
            // z.coerce.boolean()
            z.enum(['true', 'false']).transform((value) => value === 'true')
        ),
    // name: z
    //     .optional (
    //         z.string({
    //             required_error: "Name required"
    //         })
    //         .min(1, {
    //             message: "Must be at least 1 character"
    //         }),
    //     ),
    // userId: z
    //     .string({
    //         required_error: "Name required"
    //     })
    //     .min(1, {
    //         message: "Must be at least 1 character"
    //     }),
})



const passwordValidation = new RegExp(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/);

export const userRegisterSchema = z.object({
    name: z
        .string({
            required_error: "name required"
        })
        .min(1, {
            message: "Must be at least 1 character"
        })
        .max(60, {
            message: "Cannot be longer than 60 characters"
        }),
    email: z
        .string({
            required_error: "Email required"
        })
        .email({
            message: "Invalid email"
        }),
    password: z
        .string({
            required_error: "Password required"
        })
        // .min(1, {
        //     message: "Must be at least 1 character"
        // })
        .regex(passwordValidation, {
            message: "Your password is NOT valid"
        }),
    confirmPassword: z
        .string({
            required_error: "Password required"
        })
        // .min(1, {
        //     message: "Must be at least 1 character"
        // })
        .regex(passwordValidation, {
            message: "Your password is NOT valid"
        }),
}).superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
        ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ['confirmPassword']
        });
    }
});

export const userLoginSchema = z.object({
    email: z
        .string({
            required_error: "Email required"
        })
        .email({
            message: "Invalid email"
        }),
    password: z
        .string({
            required_error: "Password required"
        })
        .min(1, {
            message: "Must be at least 1 character"
        })
})

export const userSettingsSchema = z.object({
    name: z
        .string({
            required_error: "Email required"
        })
        .min(1, {
            message: "Must be at least 1 character"
        }),
    portfolioValue: z.coerce
        .number({
            required_error: "Portfolio value required"
        })
        .gte(1, {
            message: "Must be above $1"
        })
        .positive(),
})

export const deleteUserSchema = z.object({

})