import type { VegetableCategory } from '~/features/VegetableList/domain/Vegetable'
import rawData from './vegetables.json'

interface VegetableModel {
  id: string
  name: string
  category: VegetableCategory
  done: boolean
}

// Copie mutable initialisée depuis le JSON — sert de source de données en mémoire
const records = rawData.map(v => ({ ...v })) as VegetableModel[]

export default RStoreSchema.withItemType<VegetableModel>().defineCollection({
  name: 'vegetables',
  hooks: {
    fetchMany() {
      return records
    },
    fetchFirst({ key }) {
      return records.find(v => v.id === String(key))
    },
    update({ key, item }) {
      const index = records.findIndex(v => v.id === String(key))
      if (index === -1) return undefined
      records[index] = { ...records[index], ...item } as VegetableModel
      return records[index]
    },
  },
})
