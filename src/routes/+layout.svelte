<script lang="ts">
  import "../app.css";
  import { supabase } from "$lib/supabase/client";
  import { goto } from '$app/navigation';

  export let data: LayoutServerData

  const logout = async () => {
    await supabase.auth.signOut();
    const url = `/auth/logout/?action=logout`
    console.log("logging out", url);
    goto(url);
  }
</script>

<p> Connected user: {data.user?.id || "none"} </p>
<nav>
  {#if data.user}
    <button on:click={logout}>Logout</button>
  {:else}
    <a href="/auth/login">Login</a>
    <a href="/auth/register">Register</a>
  {/if}
</nav>
<div class="max-w-[640px] m-auto">
  <slot/>
</div>