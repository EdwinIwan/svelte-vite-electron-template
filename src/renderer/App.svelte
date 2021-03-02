<script lang="ts">
  import {
    Router,
    Route,
    createHistory,
    createMemorySource,
  } from 'svelte-navigator';
  import Home from '/@/pages/Home.svelte';
  import Navigation from '/@/components/Navigation.svelte';
  import LazyPage from '/@/components/LazyPage.svelte';

  const About = () => import('/@/pages/About.svelte');
  const history = createHistory(createMemorySource());
</script>

<Router {history}>
  <Navigation />

  <Route path={'/'} primary={false}>
    <Home />
  </Route>

  <Route path={'/about'} primary={false}>
    <LazyPage page={About} />
  </Route>
</Router>
