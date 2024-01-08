import type { PrismaClient } from '@prisma/client'
import type { IStockRepository } from '../../core/interfaces/IStockRepository'

export const stockRepository = (prisma: PrismaClient): IStockRepository => ({
	getStockListing: () => {
		return prisma.stock.findMany()
	}
})