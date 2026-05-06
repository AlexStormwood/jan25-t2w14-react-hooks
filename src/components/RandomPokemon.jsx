import { useEffect, useState } from "react"

export default function RandomPokemon(){
	const [pokemonName, setPokemonName] = useState("")
	const [imageUrl, setImageUrl] = useState(null);

	// useEffect(callback, dependencyArray);
	useEffect(() => {
		
		console.log("Hello from RandomPokemon in the componentDidMount useEffect")

		// Anything async/promise-based must happen inside an async function
		// We cannot put async on the callback declaration,
		// we can only declare an async function and call it within the useEffect instead.
		async function getRandomPokemon(){
			// generate a random number
			let randomPokemonId = Math.floor(Math.random() * 1025) + 1;

			// make a fetch request using the random number
			let response = await fetch("https://pokeapi.co/api/v2/pokemon/" + randomPokemonId);

			// save the result 
			let responseBody = await response.json();

			// pass the result into the setters of our state hooks 
			setPokemonName(responseBody.name);
			setImageUrl(responseBody.sprites.front_default);
		}
		getRandomPokemon();



		// return in a useEffect = componentWillUnmount 
		return (() => {
			console.log("RandomPokemon component is unmounting! See ya!");
		})

		// Empty dependency array = componentDidMount
	}, []);

	useEffect(() => {
		console.log("Pokemon name changed! It is now: " + pokemonName);
		// Putting a variable into the dependency array
		// turns this useEffect into componentDidUpdate
	}, [pokemonName])



	return <div>
		<h1>{pokemonName}</h1>
		{imageUrl ? <img src={imageUrl} /> : null}
	</div>
}