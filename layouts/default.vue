<template>
  <div class="layout">
    <header class="site-header">
      <div class="container">
        <NuxtLink to="/" class="logo">
          <span class="logo-icon">📡</span>
          <span class="logo-text">Free API Catalog</span>
        </NuxtLink>
        <nav class="nav">
          <NuxtLink to="/" class="nav-link">Catalog</NuxtLink>
          <NuxtLink to="/categories" class="nav-link">Categories</NuxtLink>
          <NuxtLink to="/about" class="nav-link">About</NuxtLink>
        </nav>
      </div>
    </header>

    <main class="main">
      <slot />
    </main>

    <footer class="site-footer">
      <div class="container">
        <p>
          Built by <a href="https://forthepeople.nl" target="_blank" rel="noopener">For the People</a>
          · Data is community-curated · <a href="https://github.com/ryuforthepeople/free-api-catalog" target="_blank" rel="noopener">Contribute</a>
        </p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.site-header {
  border-bottom: 1px solid var(--color-border, #e2e8f0);
  padding: 1rem 0;
}

.site-header .container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: inherit;
  font-weight: 700;
  font-size: 1.25rem;
}

.logo-icon {
  font-size: 1.5rem;
}

.nav {
  display: flex;
  gap: 1.5rem;
}

.nav-link {
  text-decoration: none;
  color: var(--color-text-secondary, #64748b);
  font-weight: 500;
  transition: color 0.2s;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: var(--color-text, #0f172a);
}

.main {
  flex: 1;
}

.site-footer {
  border-top: 1px solid var(--color-border, #e2e8f0);
  padding: 2rem 0;
  text-align: center;
  color: var(--color-text-secondary, #64748b);
  font-size: 0.875rem;
}

.site-footer a {
  color: var(--color-primary, #3b82f6);
  text-decoration: none;
}

.site-footer a:hover {
  text-decoration: underline;
}
</style>
