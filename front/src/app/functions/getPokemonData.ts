export async function getPokemonData(index: number) {

  let response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${index+1}`
  )
  let result = await response.json()
  // console.log(result)

  const types = result.types.length == 1 ? [result.types[0].type.name] : [result.types[0].type.name, result.types[1].type.name] // ["fire", "flying"]

  const height = result.height / 10 // result.height from API is in "decimetres"

  const weight = result.weight / 10  // result.weight from API is in "hectograms"
  
  response = await fetch(
    `https://pokeapi.co/api/v2/pokemon-species/${index+1}`
  )
  result = await response.json()
  // console.log(result)
  
  const flavorTextEntries = result.flavor_text_entries
  const descriptions = []
  for (var i = 0; i < flavorTextEntries.length; i++) {
    if (flavorTextEntries[i].language.name == "en") {
      descriptions.push(
        flavorTextEntries[i].flavor_text
          .replace("", " ")
          .replace("POKéMON", "Pokémon")
      )
    }
  }
  // console.log(descriptions)
  const description = `${descriptions[0]} ${descriptions[4]} ${descriptions[9]}`

  // const type = result.genera.filter((e:any) => {e.language.name == "en"}).genus
  // console.log(result.genera.filter((e:any) => {e.language.name == "en"}))
  const type = result.genera.find((e: any) => e.language.name == "en").genus // Charizard => "Flame Pokémon"

  return {
    id: index + 1,
    types,
    height,
    weight,
    description,
    type
  }
}
