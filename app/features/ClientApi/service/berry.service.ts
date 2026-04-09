// Service Baies — implémente IBerryService en déléguant aux endpoints
// Couche extensible : c'est ici qu'irait la logique métier (filtre par dureté, etc.)

import type { IBerryService } from '../domain/berry/IBerryService'
import type { BerryEndpoints } from '../domain/IApiClient'

export function createBerryService(endpoints: BerryEndpoints): IBerryService {
  return {
    getAll: (query) => endpoints.getAll(query),
    getById: (id) => endpoints.getById(id),
  }
}
