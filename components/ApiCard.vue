<script setup lang="ts">
import type { Api } from '~/composables/useApiCatalog'

defineProps<{
  api: Api
}>()

function gradeColor(grade: string): string {
  if (grade.startsWith('A')) return 'var(--color-success)'
  if (grade.startsWith('B')) return 'var(--color-primary)'
  if (grade.startsWith('C')) return 'var(--color-warning)'
  return 'var(--color-danger)'
}
</script>

<template>
  <article class="api-card">
    <div class="api-card__header">
      <h3 class="api-card__name">
        <a :href="api.url" target="_blank" rel="noopener">{{ api.name }}</a>
      </h3>
      <span class="api-card__grade" :style="{ color: gradeColor(api.grade) }">
        {{ api.grade }}
      </span>
    </div>

    <p class="api-card__description">{{ api.description }}</p>

    <div class="api-card__meta">
      <span class="badge badge--neutral">
        {{ api.categoryEmoji }} {{ api.category }}
      </span>
      <span
        class="badge"
        :class="api.auth === 'None' ? 'badge--success' : 'badge--info'"
      >
        {{ api.auth === 'None' ? '🔓 No auth' : `🔑 ${api.auth}` }}
      </span>
      <span v-if="api.https" class="badge badge--success">HTTPS</span>
    </div>

    <div v-if="api.exampleEndpoint" class="api-card__example">
      <code>{{ api.exampleEndpoint }}</code>
    </div>
  </article>
</template>

<style scoped>
.api-card {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 1.25rem;
  background: var(--color-bg);
  box-shadow: var(--shadow-sm);
  transition: box-shadow 0.2s, transform 0.2s;
}

.api-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-1px);
}

.api-card__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
}

.api-card__name {
  font-size: 1.0625rem;
  font-weight: 600;
}

.api-card__name a {
  color: var(--color-text);
  text-decoration: none;
}

.api-card__name a:hover {
  color: var(--color-primary);
}

.api-card__grade {
  font-weight: 700;
  font-size: 0.9375rem;
  flex-shrink: 0;
  margin-left: 0.75rem;
}

.api-card__description {
  color: var(--color-text-secondary);
  font-size: 0.875rem;
  margin-bottom: 0.75rem;
}

.api-card__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
}

.api-card__example {
  margin-top: 0.75rem;
  padding: 0.5rem 0.75rem;
  background: var(--color-surface);
  border-radius: var(--radius);
  overflow-x: auto;
}

.api-card__example code {
  font-size: 0.75rem;
  color: var(--color-text-secondary);
  word-break: break-all;
}
</style>
