import http from '../http-common'

class PokemonAPI {
  fetchAll() {
    return http.post('', JSON.stringify({
      query: `
    {
      getAllPokemon {
        types {
          name
        }
        sprite: shinySprite
        species
      }
    }
  `
    }))
  }

  fetchPokemon(name: string) {
    return http.post('', JSON.stringify({
      query: `
      {
        getPokemon(pokemon: ${name}) {
          sprite
          species
          types {
            name
          }
          abilities {
            first {
              name
            }
          }
          baseStatsTotal
          height
          weight
          flavorTexts {
            flavor
          }
        }
      }
      `
    }))
  }
}

export const API = new PokemonAPI()
