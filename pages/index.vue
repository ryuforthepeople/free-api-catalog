<script setup lang="ts">
const { getApis, getCategories, getAuthTypes, getStats } = useApiCatalog()

const search = ref('')
const selectedCategory = ref('')
const selectedAuth = ref('')

const stats = getStats()
const categories = getCategories()
const authTypes = getAuthTypes()

const filteredApis = computed(() =>
  getApis({
    search: search.value,
    category: selectedCategory.value || undefined,
    auth: selectedAuth.value || undefined,
  })
)

useHead({
  title: 'Free API Catalog — 500+ Free APIs for Developers',
})
</script>

<template>
  <div class="container page-catalog">
    <section class="hero">
      <h1>Free API Catalog</h1>
      <p class="hero__subtitle">
        Curated collection of {{ stats.totalApis }} free APIs across {{ stats.totalCategories }} categories.
        Search, filter, and find the perfect API for your next project.
      </p>
    </section>

    <StatsBar v-bind="stats" />

    <CatalogSearch
      v-model="search"
      :categories="categories"
      :auth-types="authTypes"
      :selected-category="selectedCategory"
      :selected-auth="selectedAuth"
      @update:selected-category="selectedCategory = $event"
      @update:selected-auth="selectedAuth = $event"
    />

    <p class="results-count">
      {{ filteredApis.length }} API{{ filteredApis.length !== 1 ? 's' : '' }} found
      <template v-if="search || selectedCategory || selectedAuth">
        ·
        <button class="clear-btn" @click="search = ''; selectedCategory = ''; selectedAuth = ''">
          Clear filters
        </button>
      </template>
    </p>

    <div class="api-grid">
      <ApiCard v-for="api in filteredApis" :key="api.id" :api="api" />
    </div>

    <p v-if="filteredApis.length === 0" class="no-results">
      No APIs found matching your criteria. Try adjusting your filters.
    </p>
  </div>
</template>

<style scoped>
.page-catalog {
  padding: 2rem 1.5rem 4rem;
}

.hero {
  text-align: center;
  margin-bottom: 2.5rem;
}

.hero h1 {
  font-size: 2.25rem;
  font-weight: 800;
  margin-bottom: 0.75rem;
}

.hero__subtitle {
  font-size: 1.125rem;
  color: var(--color-text-secondary);
  max-width: 640px;
  margin: 0 auto;
}

.results-count {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  margin-bottom: 1rem;
}

.clear-btn {
  background: none;
  border: none;
  color: var(--color-primary);
  cursor: pointer;
  font-size: inherit;
  padding: 0;
}

.clear-btn:hover {
  text-decoration: underline;
}

.api-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 1rem;
}

.no-results {
  text-align: center;
  color: var(--color-text-secondary);
  padding: 3rem 0;
  font-size: 1.0625rem;
}

@media (max-width: 640px) {
  .hero h1 {
    font-size: 1.75rem;
  }

  .api-grid {
    grid-template-columns: 1fr;
  }
}
</style>
