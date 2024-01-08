import { authProcedure } from '$lib/trpc/auth.procedure';
import { t } from '$lib/trpc/t';
import { useGetStockListing } from '../../usecases/useGetStockListing';
import { stockRepository } from '../repositories/stock.repository';

export const stockController = t.router({
	getStockListing: authProcedure.query(async ({ ctx }) => {
		const repository = stockRepository(ctx.prisma);
		return useGetStockListing(repository).launch();
	})
});