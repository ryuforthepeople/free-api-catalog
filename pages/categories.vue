<script setup lang="ts">
const { getCategories } = useApiCatalog()
const categories = getCategories()

useHead({
  title: 'Categories — Free API Catalog',
})
</script>

<template>
  <div class="container page-categories">
    <h1>API Categories</h1>
    <p class="subtitle">Browse {{ categories.length }} categories of free APIs</p>

    <div class="category-grid">
      <NuxtLink
        v-for="cat in categories"
        :key="cat.slug"
        :to="`/?category=${encodeURIComponent(cat.name)}`"
        class="category-card"
      >
        <span class="category-card__emoji">{{ cat.emoji }}</span>
        <h2 class="category-card__name">{{ cat.name }}</h2>
        <span class="category-card__count">{{ cat.count }} APIs</span>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.page-categories {
  padding: 2rem 1.5rem 4rem;
}

.page-categories h1 {
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: var(--color-text-secondary);
  margin-bottom: 2rem;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1rem;
}

.category-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1.5rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  text-decoration: none;
  color: inherit;
  transition: box-shadow 0.2s, transform 0.2s;
}

.category-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.category-card__emoji {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.category-card__name {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.category-card__count {
  font-size: 0.8125rem;
  color: var(--color-text-secondary);
}
</style>
