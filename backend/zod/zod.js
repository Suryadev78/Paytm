import zod from "zod";

const userValidateSchema = zod.object({
  userName: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.number().min(5),
});

const moneySendingSchema = zod.object({
  to: zod.string(),
  amount: zod.number(),
});

export default userValidateSchema;
export { moneySendingSchema };
