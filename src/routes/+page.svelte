<script lang="ts">
	import StockList from '../modules/stocks/ui/StockList.svelte';
	import type { PageServerData } from './$types';

	export let data: PageServerData;

	$: stockListing = data.stockListing.map((it) => it.symbol).join(', ');
</script>

<h1 class="text-2xl text-amber-400">Stonks land</h1>

<StockList stocks={data.stockListing} />
