<script setup lang="ts">
const { getStats } = useApiCatalog()
const stats = getStats()

useHead({
  title: 'About — Free API Catalog',
})
</script>

<template>
  <div class="container page-about">
    <h1>About Free API Catalog</h1>

    <div class="content">
      <p>
        Free API Catalog is a curated directory of <strong>{{ stats.totalApis }} free APIs</strong>
        across <strong>{{ stats.totalCategories }} categories</strong>, built to help developers
        discover the right API for their next project.
      </p>

      <h2>Why?</h2>
      <p>
        Finding good, free APIs shouldn't be hard. There are amazing public APIs out there,
        but they're scattered across the internet. This catalog brings them together in one
        searchable, filterable place.
      </p>

      <h2>How it works</h2>
      <p>
        Each API is rated on reliability, documentation quality, and ease of use.
        APIs that require no authentication are marked — perfect for prototyping
        and learning.
      </p>

      <h2>Contributing</h2>
      <p>
        Know a great free API that's missing? Found incorrect info?
        <a href="https://github.com/ryuforthepeople/free-api-catalog" target="_blank" rel="noopener">
          Open an issue or PR on GitHub.
        </a>
      </p>

      <h2>Built by</h2>
      <p>
        This project is part of
        <a href="https://forthepeople.nl" target="_blank" rel="noopener">For the People</a>
        — building tools and software to help people.
      </p>
    </div>
  </div>
</template>

<style scoped>
.page-about {
  padding: 2rem 1.5rem 4rem;
  max-width: 720px;
}

.page-about h1 {
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
}

.content h2 {
  font-size: 1.25rem;
  font-weight: 700;
  margin-top: 2rem;
  margin-bottom: 0.5rem;
}

.content p {
  color: var(--color-text-secondary);
  margin-bottom: 1rem;
  line-height: 1.7;
}

.content a {
  color: var(--color-primary);
  text-decoration: none;
}

.content a:hover {
  text-decoration: underline;
}
</style>
