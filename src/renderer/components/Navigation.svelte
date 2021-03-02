<script lang="ts">
  import { Link } from 'svelte-navigator';

  function getProps({
    href,
    isPartiallyCurrent,
    isCurrent,
  }: Link.GetPropsParams): {
    class?: string;
  } {
    const isActive = href === '/' ? isCurrent : isPartiallyCurrent || isCurrent;

    return { class: isActive ? 'active' : '' };
  }
</script>

<Link to="/" {getProps}>Home</Link>

<Link to="/about" {getProps}>About</Link>
