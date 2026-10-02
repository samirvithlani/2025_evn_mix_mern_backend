const zod = require("zod")

const userValidationSchema = zod.object({
    name:zod.string().min(2,"min 2 chars are required"),
    email:zod.string().email(),
    password:zod.string().min(6),
    age:zod.number().min(18),
    bloodGroup:zod.enum(["A+","A-","B+","B-"]),
    status:zod.boolean().optional().default(true),
    roleId:zod.string()
}).strict()

module.exports = userValidationSchema