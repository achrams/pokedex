export default interface pokemon {
  species: string,
  sprite: string,
  abilities: {
    first: {
      name: string
    }
  },
  weight: number,
  types: Array<any>,
  baseStatsTotal: number,
  height: number,
  flavorTexts: Array<any>
}