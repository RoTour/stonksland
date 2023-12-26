<script lang="ts">
	import { enhance } from "$app/forms";
	import { page } from "$app/stores";
	import { handleSubmit } from "$lib/utils/form.helper";

  $: errorMsg = $page.form?.message ?? '';
</script>

<form action="?/register" use:enhance={() => handleSubmit()} method="post"
  class="flex flex-col">
  <label for="email">Email</label>
  <input id="email" type="email" name="email" />

  <label for="username">Username</label>
  <input id="username" type="text" name="username" />

  <label for="password">Password</label>
  <input id="password" type="password" name="password" />

  <label for="confirmPassword">Password Confirmation</label>
  <input id="confirmPassword" type="password" name="confirmPassword" />

  {#if errorMsg}
    <p class="text-red-500">{errorMsg}</p>
  {/if}
  <button type="submit">Register</button>
</form>