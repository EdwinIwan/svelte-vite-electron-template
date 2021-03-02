<svelte:options immutable={true} />

<script lang="ts">
  export let page: () => Promise<typeof import('*.svelte')>;

  let component: any = null;

  $: page()
    .then((result) => {
      component = result?.default;
    })
    .catch(() => {
      component = null;
    });
</script>

<svelte:component this={component} />
