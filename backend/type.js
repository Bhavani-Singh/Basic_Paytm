const z = require("zod");

const userNameSchema = z.object({
    username: z.string().email(),
});

const passwordSchema = z.object({
    password: z.string()
              .min(6, "The password must be longer than 6 characters")
              .regex(/[A-Z]/)
              .regex(/[a-z]/)
              .regex(/[0-9]/)
              .regex(/[@$!%*?&#]/)
});

const firstNameSchema = z.object({
    firstname: z.string().min(3).max(30)
});

const lastNameSchema = z.object({
    lastname: z.string().min(3).max(30)
});

module.exports = {
    userNameSchema,
    passwordSchema,
    firstNameSchema,
    lastNameSchema
}