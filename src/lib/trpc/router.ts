import { appController } from '$lib/adapters/controllers/app.controller';
import { authController } from '../../modules/auth/adapters/controllers/auth.controller';
import { stockController } from '../../modules/stocks/adapters/controllers/stock.controller';
import { t } from './t';

export const router = t.router({
	app: appController,
	auth: authController,
	stock: stockController,
});

export type Router = typeof router;