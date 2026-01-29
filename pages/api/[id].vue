<script setup lang="ts">
const route = useRoute()
const { getApi, getApis } = useApiCatalog()

const id = Number(route.params.id)
const api = getApi(id)

if (!api) {
  throw createError({ statusCode: 404, message: 'API not found' })
}

// Related APIs in same category
const related = computed(() =>
  getApis({ category: api.category })
    .filter(a => a.id !== api.id)
    .slice(0, 4)
)

function gradeColor(grade: string): string {
  if (grade.startsWith('A')) return 'var(--color-success)'
  if (grade.startsWith('B')) return 'var(--color-primary)'
  if (grade.startsWith('C')) return 'var(--color-warning)'
  return 'var(--color-danger)'
}

useHead({
  title: `${api.name} — Free API Catalog`,
  meta: [
    { name: 'description', content: api.description },
  ],
})
</script>

<template>
  <div class="container page-detail">
    <nav class="breadcrumb">
      <NuxtLink to="/">← Back to catalog</NuxtLink>
    </nav>

    <article class="api-detail">
      <header class="api-detail__header">
        <div>
          <h1 class="api-detail__name">{{ api.name }}</h1>
          <p class="api-detail__description">{{ api.description }}</p>
        </div>
        <div class="api-detail__score">
          <span class="grade" :style="{ color: gradeColor(api.grade) }">{{ api.grade }}</span>
          <span class="score">{{ api.score }}/100</span>
        </div>
      </header>

      <div class="api-detail__meta">
        <span class="badge badge--neutral">
          {{ api.categoryEmoji }} {{ api.category }}
        </span>
        <span
          class="badge"
          :class="api.auth === 'None' ? 'badge--success' : 'badge--info'"
        >
          {{ api.auth === 'None' ? '🔓 No auth required' : `🔑 ${api.auth}` }}
        </span>
        <span v-if="api.https" class="badge badge--success">🔒 HTTPS</span>
      </div>

      <div class="api-detail__actions">
        <a :href="api.url" target="_blank" rel="noopener" class="btn btn--primary">
          Visit API →
        </a>
        <a
          v-if="api.exampleEndpoint"
          :href="api.exampleEndpoint"
          target="_blank"
          rel="noopener"
          class="btn btn--secondary"
        >
          Try it live ⚡
        </a>
      </div>

      <section v-if="api.exampleEndpoint" class="api-detail__example">
        <h2>Example endpoint</h2>
        <code>{{ api.exampleEndpoint }}</code>
      </section>

      <section class="api-detail__info">
        <h2>Details</h2>
        <dl class="info-grid">
          <div>
            <dt>Authentication</dt>
            <dd>{{ api.auth === 'None' ? 'None required' : api.auth }}</dd>
          </div>
          <div>
            <dt>HTTPS</dt>
            <dd>{{ api.https ? 'Yes' : 'No' }}</dd>
          </div>
          <div>
            <dt>Category</dt>
            <dd>{{ api.categoryEmoji }} {{ api.category }}</dd>
          </div>
          <div>
            <dt>Quality Score</dt>
            <dd>{{ api.score }}/100 ({{ api.grade }})</dd>
          </div>
        </dl>
      </section>
    </article>

    <section v-if="related.length" class="related">
      <h2>More in {{ api.categoryEmoji }} {{ api.category }}</h2>
      <div class="related-grid">
        <ApiCard v-for="r in related" :key="r.id" :api="r" />
      </div>
    </section>
  </div>
</template>

<style scoped>
.page-detail {
  padding: 2rem 1.5rem 4rem;
  max-width: 900px;
}

.breadcrumb {
  margin-bottom: 1.5rem;
}

.breadcrumb a {
  color: var(--color-text-secondary);
  text-decoration: none;
  font-size: 0.875rem;
}

.breadcrumb a:hover {
  color: var(--color-primary);
}

.api-detail {
  margin-bottom: 3rem;
}

.api-detail__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1.5rem;
  margin-bottom: 1.25rem;
}

.api-detail__name {
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
}

.api-detail__description {
  color: var(--color-text-secondary);
  font-size: 1.125rem;
}

.api-detail__score {
  text-align: center;
  flex-shrink: 0;
}

.grade {
  display: block;
  font-size: 2rem;
  font-weight: 800;
}

.score {
  font-size: 0.8125rem;
  color: var(--color-text-secondary);
}

.api-detail__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.api-detail__actions {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 2rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  padding: 0.625rem 1.25rem;
  border-radius: var(--radius);
  font-weight: 600;
  font-size: 0.9375rem;
  text-decoration: none;
  transition: background 0.2s, transform 0.1s;
}

.btn:active {
  transform: scale(0.98);
}

.btn--primary {
  background: var(--color-primary);
  color: white;
}

.btn--primary:hover {
  background: var(--color-primary-hover);
}

.btn--secondary {
  background: var(--color-surface);
  color: var(--color-text);
  border: 1px solid var(--color-border);
}

.btn--secondary:hover {
  background: var(--color-border);
}

.api-detail__example {
  margin-bottom: 2rem;
}

.api-detail__example h2 {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.api-detail__example code {
  display: block;
  padding: 0.75rem 1rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  font-size: 0.8125rem;
  color: var(--color-text-secondary);
  word-break: break-all;
  overflow-x: auto;
}

.api-detail__info h2 {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
}

.info-grid div {
  padding: 0.75rem 1rem;
  background: var(--color-surface);
  border-radius: var(--radius);
  border: 1px solid var(--color-border);
}

.info-grid dt {
  font-size: 0.75rem;
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.25rem;
}

.info-grid dd {
  font-weight: 600;
}

.related {
  border-top: 1px solid var(--color-border);
  padding-top: 2rem;
}

.related h2 {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
}

@media (max-width: 640px) {
  .api-detail__header {
    flex-direction: column;
  }

  .api-detail__name {
    font-size: 1.5rem;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }

  .api-detail__actions {
    flex-direction: column;
  }
}
</style>
