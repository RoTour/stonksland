import { z } from 'zod';

export const loginDtoSchema = z.object({
	email: z.string(),
	password: z.string()
});

export const registerDtoSchema = z.object({
	email: z.string(),
	password: z.string(),
	confirmPassword: z.string(),
	username: z.string()
});