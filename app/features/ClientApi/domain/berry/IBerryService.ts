// Interface du service Baies — contrat défini dans le domaine
// Le controller dépend de cette abstraction, jamais d'une implémentation concrète

import type { Berry, BerryId, BerryQuery, PaginatedResult } from './berry.types'

export interface IBerryService {
  getAll(query: BerryQuery): Promise<PaginatedResult<Berry>>
  getById(id: BerryId): Promise<Berry | null>
}
