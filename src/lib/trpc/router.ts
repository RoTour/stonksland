import { authController } from '../../modules/auth/adapters/controllers/auth.controller';
import { t } from './t';

export const router = t.router({
	auth: authController,
});

export type Router = typeof router;