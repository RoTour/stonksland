import type { Stock } from '@prisma/client';

export interface IStockRepository {
	getStockListing(): Promise<Stock[]>;
}