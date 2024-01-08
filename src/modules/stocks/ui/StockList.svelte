<script lang="ts">
	import type { Stock } from "@prisma/client";

  export let stocks: Stock[] = [];
</script>

<ul class="flex">
  {#each stocks as stock}
   <li class="flex">
      <span class="text-amber-400">{stock.symbol}</span>
      <span class="text-amber-400">{stock.name}</span>
   </li> 
  {/each}
</ul>