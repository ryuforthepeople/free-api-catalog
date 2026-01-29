<script setup lang="ts">
defineProps<{
  totalApis: number
  totalCategories: number
  avgScore: number
  noAuthCount: number
}>()
</script>

<template>
  <div class="stats-bar">
    <div class="stat">
      <span class="stat__value">{{ totalApis }}</span>
      <span class="stat__label">Free APIs</span>
    </div>
    <div class="stat">
      <span class="stat__value">{{ totalCategories }}</span>
      <span class="stat__label">Categories</span>
    </div>
    <div class="stat">
      <span class="stat__value">{{ avgScore }}</span>
      <span class="stat__label">Avg Score</span>
    </div>
    <div class="stat">
      <span class="stat__value">{{ noAuthCount }}</span>
      <span class="stat__label">No Auth Needed</span>
    </div>
  </div>
</template>

<style scoped>
.stats-bar {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
}

.stat {
  text-align: center;
  padding: 1rem;
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
}

.stat__value {
  display: block;
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--color-primary);
}

.stat__label {
  display: block;
  font-size: 0.8125rem;
  color: var(--color-text-secondary);
  margin-top: 0.25rem;
}

@media (max-width: 640px) {
  .stats-bar {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
