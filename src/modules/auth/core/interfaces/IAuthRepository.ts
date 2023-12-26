import type { User } from "@prisma/client";

export interface IAuthRepository {
	signInUser: (email: string, password: string) => Promise<User | null>;
	createUser: (email: string, password: string, username: string) => Promise<User>;
}