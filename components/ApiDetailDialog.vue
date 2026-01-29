<script setup lang="ts">
import type { Api } from '~/composables/useApiCatalog'

const props = defineProps<{
  api: Api
}>()

const emit = defineEmits<{
  close: []
}>()

const activeTab = ref<'javascript' | 'curl' | 'python'>('javascript')
const playgroundResponse = ref<string | null>(null)
const playgroundLoading = ref(false)
const playgroundError = ref<string | null>(null)

// Close on Escape
function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') emit('close')
}

onMounted(() => {
  document.addEventListener('keydown', onKeydown)
  document.body.style.overflow = 'hidden'
})

onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})

// Quick start code generators
function getJsCode(api: Api): string {
  if (api.exampleEndpoint) {
    if (api.auth === 'None') {
      return `const res = await fetch("${api.exampleEndpoint}");
const data = await res.json();
console.log(data);`
    }
    return `const res = await fetch("${api.exampleEndpoint}", {
  headers: { "Authorization": "Bearer YOUR_API_KEY" }
});
const data = await res.json();
console.log(data);`
  }
  if (api.auth === 'None') {
    return `const res = await fetch("${api.url}/api/endpoint");
const data = await res.json();
console.log(data);`
  }
  return `const res = await fetch("${api.url}/api/endpoint", {
  headers: { "Authorization": "Bearer YOUR_API_KEY" }
});
const data = await res.json();
console.log(data);`
}

function getCurlCode(api: Api): string {
  const url = api.exampleEndpoint || `${api.url}/api/endpoint`
  if (api.auth === 'None') {
    return `curl -s "${url}" | json_pp`
  }
  return `curl -s "${url}" \\
  -H "Authorization: Bearer YOUR_API_KEY" | json_pp`
}

function getPythonCode(api: Api): string {
  const url = api.exampleEndpoint || `${api.url}/api/endpoint`
  if (api.auth === 'None') {
    return `import requests

r = requests.get("${url}")
print(r.json())`
  }
  return `import requests

r = requests.get("${url}",
    headers={"Authorization": "Bearer YOUR_API_KEY"})
print(r.json())`
}

function getActiveCode(): string {
  switch (activeTab.value) {
    case 'javascript': return getJsCode(props.api)
    case 'curl': return getCurlCode(props.api)
    case 'python': return getPythonCode(props.api)
  }
}

async function copyCode() {
  await navigator.clipboard.writeText(getActiveCode())
}

async function tryIt() {
  if (!props.api.exampleEndpoint) return
  playgroundLoading.value = true
  playgroundError.value = null
  playgroundResponse.value = null

  try {
    const res = await fetch(props.api.exampleEndpoint)
    const text = await res.text()
    try {
      playgroundResponse.value = JSON.stringify(JSON.parse(text), null, 2)
    } catch {
      playgroundResponse.value = text
    }
  } catch (e) {
    playgroundError.value = 'CORS blocked or network error. Try the cURL command instead.'
  } finally {
    playgroundLoading.value = false
  }
}

function gradeColor(grade: string): string {
  if (grade.startsWith('A')) return 'var(--color-success)'
  if (grade.startsWith('B')) return 'var(--color-primary)'
  if (grade.startsWith('C')) return 'var(--color-warning)'
  return 'var(--color-danger)'
}
</script>

<template>
  <Teleport to="body">
    <div class="dialog-overlay" @click.self="emit('close')">
      <div class="dialog" role="dialog" aria-modal="true">
        <header class="dialog__header">
          <button class="dialog__close" @click="emit('close')" aria-label="Close">✕</button>
        </header>

        <div class="dialog__body">
          <!-- Hero -->
          <div class="dialog__hero">
            <div class="dialog__title-row">
              <h1>{{ api.name }}</h1>
              <span class="dialog__grade" :style="{ color: gradeColor(api.grade) }">
                {{ api.grade }}
                <small>{{ api.score }}/100</small>
              </span>
            </div>
            <p class="dialog__description">{{ api.description }}</p>
            <div class="dialog__badges">
              <span class="badge badge--neutral">{{ api.categoryEmoji }} {{ api.category }}</span>
              <span class="badge" :class="api.auth === 'None' ? 'badge--success' : 'badge--info'">
                {{ api.auth === 'None' ? '🔓 No auth' : `🔑 ${api.auth}` }}
              </span>
              <span v-if="api.https" class="badge badge--success">HTTPS</span>
            </div>
          </div>

          <!-- Quick Start -->
          <section class="dialog__section">
            <h2>⚡ Quick Start</h2>
            <div class="code-tabs">
              <button
                v-for="tab in (['javascript', 'curl', 'python'] as const)"
                :key="tab"
                class="code-tab"
                :class="{ active: activeTab === tab }"
                @click="activeTab = tab"
              >
                {{ tab === 'javascript' ? 'JavaScript' : tab === 'curl' ? 'cURL' : 'Python' }}
              </button>
              <button class="code-copy" @click="copyCode" title="Copy code">📋</button>
            </div>
            <pre class="code-block"><code>{{ getActiveCode() }}</code></pre>
          </section>

          <!-- Playground -->
          <section v-if="api.exampleEndpoint" class="dialog__section">
            <h2>🚀 Try it live</h2>
            <div class="playground">
              <div class="playground__url">
                <code>GET {{ api.exampleEndpoint }}</code>
              </div>
              <button
                class="btn btn--primary"
                :disabled="playgroundLoading"
                @click="tryIt"
              >
                {{ playgroundLoading ? 'Loading...' : 'Send Request ⚡' }}
              </button>
              <div v-if="playgroundResponse" class="playground__response">
                <h3>Response</h3>
                <pre><code>{{ playgroundResponse.slice(0, 2000) }}{{ playgroundResponse.length > 2000 ? '\n...(truncated)' : '' }}</code></pre>
              </div>
              <div v-if="playgroundError" class="playground__error">
                {{ playgroundError }}
              </div>
            </div>
          </section>

          <!-- Links -->
          <section class="dialog__section">
            <h2>🔗 Links</h2>
            <div class="dialog__links">
              <a :href="api.url" target="_blank" rel="noopener" class="btn btn--primary">
                API Documentation →
              </a>
              <a
                v-if="api.exampleEndpoint"
                :href="api.exampleEndpoint"
                target="_blank"
                rel="noopener"
                class="btn btn--secondary"
              >
                Open endpoint in browser
              </a>
            </div>
          </section>

          <!-- Info grid -->
          <section class="dialog__section">
            <h2>📋 Details</h2>
            <dl class="info-grid">
              <div>
                <dt>Authentication</dt>
                <dd>{{ api.auth === 'None' ? 'None — just call it' : api.auth }}</dd>
              </div>
              <div>
                <dt>HTTPS</dt>
                <dd>{{ api.https ? '✅ Yes' : '⚠️ No' }}</dd>
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
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.dialog-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.dialog {
  background: var(--color-bg);
  border-radius: var(--radius-lg);
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
}

@media (max-width: 640px) {
  .dialog-overlay {
    padding: 0;
  }
  .dialog {
    max-width: 100%;
    max-height: 100vh;
    height: 100vh;
    border-radius: 0;
  }
}

.dialog__header {
  position: sticky;
  top: 0;
  z-index: 1;
  display: flex;
  justify-content: flex-end;
  padding: 0.75rem 1rem;
  background: var(--color-bg);
  border-bottom: 1px solid var(--color-border);
}

.dialog__close {
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
  color: var(--color-text-secondary);
  padding: 0.25rem 0.5rem;
  border-radius: var(--radius);
  transition: background 0.2s;
}

.dialog__close:hover {
  background: var(--color-surface);
  color: var(--color-text);
}

.dialog__body {
  padding: 1.5rem;
}

.dialog__hero {
  margin-bottom: 2rem;
}

.dialog__title-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.dialog__title-row h1 {
  font-size: 1.75rem;
  font-weight: 800;
}

.dialog__grade {
  font-size: 1.75rem;
  font-weight: 800;
  text-align: center;
  flex-shrink: 0;
}

.dialog__grade small {
  display: block;
  font-size: 0.75rem;
  color: var(--color-text-secondary);
  font-weight: 500;
}

.dialog__description {
  color: var(--color-text-secondary);
  font-size: 1.0625rem;
  margin-bottom: 0.75rem;
}

.dialog__badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
}

.dialog__section {
  margin-bottom: 2rem;
}

.dialog__section h2 {
  font-size: 1.125rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
}

/* Code tabs */
.code-tabs {
  display: flex;
  gap: 0;
  border-bottom: 1px solid var(--color-border);
  margin-bottom: 0;
}

.code-tab {
  padding: 0.5rem 1rem;
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  color: var(--color-text-secondary);
  cursor: pointer;
  font-size: 0.8125rem;
  font-weight: 600;
  transition: color 0.2s, border-color 0.2s;
}

.code-tab.active {
  color: var(--color-primary);
  border-bottom-color: var(--color-primary);
}

.code-tab:hover {
  color: var(--color-text);
}

.code-copy {
  margin-left: auto;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  padding: 0.5rem;
  opacity: 0.5;
  transition: opacity 0.2s;
}

.code-copy:hover {
  opacity: 1;
}

.code-block {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-top: none;
  border-radius: 0 0 var(--radius) var(--radius);
  padding: 1rem;
  overflow-x: auto;
  font-size: 0.8125rem;
  line-height: 1.6;
}

.code-block code {
  color: var(--color-text);
}

/* Playground */
.playground {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.playground__url {
  padding: 0.625rem 1rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  overflow-x: auto;
}

.playground__url code {
  font-size: 0.8125rem;
  color: var(--color-text-secondary);
}

.playground__response {
  margin-top: 0.5rem;
}

.playground__response h3 {
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--color-text-secondary);
  margin-bottom: 0.5rem;
}

.playground__response pre {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: 1rem;
  overflow-x: auto;
  font-size: 0.75rem;
  line-height: 1.5;
  max-height: 300px;
  overflow-y: auto;
}

.playground__error {
  padding: 0.75rem 1rem;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: var(--radius);
  color: #991b1b;
  font-size: 0.875rem;
}

/* Links */
.dialog__links {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  padding: 0.625rem 1.25rem;
  border-radius: var(--radius);
  font-weight: 600;
  font-size: 0.875rem;
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition: background 0.2s, transform 0.1s;
}

.btn:active { transform: scale(0.98); }
.btn:disabled { opacity: 0.5; cursor: not-allowed; }

.btn--primary {
  background: var(--color-primary);
  color: white;
}

.btn--primary:hover:not(:disabled) {
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

/* Info grid */
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

.info-grid dd { font-weight: 600; }

@media (max-width: 640px) {
  .dialog__title-row h1 { font-size: 1.375rem; }
  .info-grid { grid-template-columns: 1fr; }
  .dialog__links { flex-direction: column; }
}
</style>
