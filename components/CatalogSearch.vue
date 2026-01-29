<script setup lang="ts">
const props = defineProps<{
  modelValue: string
  categories: { name: string; emoji: string; count: number }[]
  authTypes: string[]
  selectedCategory: string
  selectedAuth: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'update:selectedCategory': [value: string]
  'update:selectedAuth': [value: string]
}>()
</script>

<template>
  <div class="catalog-search">
    <div class="search-row">
      <div class="search-input-wrapper">
        <span class="search-icon">🔍</span>
        <input
          type="search"
          :value="modelValue"
          placeholder="Search 500+ free APIs..."
          class="search-input"
          @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        />
      </div>
    </div>

    <div class="filter-row">
      <select
        :value="selectedCategory"
        class="filter-select"
        @change="emit('update:selectedCategory', ($event.target as HTMLSelectElement).value)"
      >
        <option value="">All categories</option>
        <option
          v-for="cat in categories"
          :key="cat.name"
          :value="cat.name"
        >
          {{ cat.emoji }} {{ cat.name }} ({{ cat.count }})
        </option>
      </select>

      <select
        :value="selectedAuth"
        class="filter-select"
        @change="emit('update:selectedAuth', ($event.target as HTMLSelectElement).value)"
      >
        <option value="">All auth types</option>
        <option v-for="auth in authTypes" :key="auth" :value="auth">
          {{ auth === 'None' ? '🔓 No auth needed' : `🔑 ${auth}` }}
        </option>
      </select>
    </div>
  </div>
</template>

<style scoped>
.catalog-search {
  margin-bottom: 2rem;
}

.search-row {
  margin-bottom: 1rem;
}

.search-input-wrapper {
  position: relative;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.125rem;
  pointer-events: none;
}

.search-input {
  padding-left: 2.75rem !important;
  font-size: 1.0625rem !important;
  padding: 0.875rem 1rem !important;
}

.filter-row {
  display: flex;
  gap: 0.75rem;
}

.filter-select {
  flex: 1;
}

@media (max-width: 640px) {
  .filter-row {
    flex-direction: column;
  }
}
</style>
