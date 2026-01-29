import apisData from '~/data/apis.json'
import categoriesData from '~/data/categories.json'

export interface Api {
  id: number
  name: string
  description: string
  url: string
  auth: string
  https: boolean
  category: string
  categoryEmoji: string
  score: number
  grade: string
  exampleEndpoint?: string
}

export interface Category {
  name: string
  emoji: string
  slug: string
}

export interface CatalogFilters {
  search?: string
  category?: string
  auth?: string
  minScore?: number
}

const apis: Api[] = apisData as Api[]
const categories: Category[] = categoriesData as Category[]

export function useApiCatalog() {
  /**
   * Get all APIs, optionally filtered
   */
  function getApis(filters?: CatalogFilters): Api[] {
    let result = [...apis]

    if (filters?.search) {
      const q = filters.search.toLowerCase()
      result = result.filter(
        a => a.name.toLowerCase().includes(q) || a.description.toLowerCase().includes(q)
      )
    }

    if (filters?.category) {
      result = result.filter(a => a.category === filters.category)
    }

    if (filters?.auth) {
      result = result.filter(a => a.auth === filters.auth)
    }

    if (filters?.minScore) {
      result = result.filter(a => a.score >= filters.minScore!)
    }

    return result
  }

  /**
   * Get a single API by ID
   */
  function getApi(id: number): Api | undefined {
    return apis.find(a => a.id === id)
  }

  /**
   * Get all categories with API counts
   */
  function getCategories(): (Category & { count: number })[] {
    return categories.map(cat => ({
      ...cat,
      count: apis.filter(a => a.category === cat.name).length,
    }))
  }

  /**
   * Get unique auth types
   */
  function getAuthTypes(): string[] {
    return [...new Set(apis.map(a => a.auth))].sort()
  }

  /**
   * Get catalog stats
   */
  function getStats() {
    return {
      totalApis: apis.length,
      totalCategories: categories.length,
      avgScore: Math.round(apis.reduce((sum, a) => sum + a.score, 0) / apis.length),
      noAuthCount: apis.filter(a => a.auth === 'None').length,
    }
  }

  return {
    getApis,
    getApi,
    getCategories,
    getAuthTypes,
    getStats,
  }
}
