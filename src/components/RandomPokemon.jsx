import { useEffect, useState } from "react"
import "../styles/RandomPokemon.css";
import { useLocalStorage } from "react-use";

export default function RandomPokemon(){
	const [pokemonName, setPokemonName] = useState("")
	const [imageUrl, setImageUrl] = useState(null);

	const [pokemonNameLs, setPokemonNameLs, removePokemonNameLs] = useLocalStorage("pokemonName","");
	const [imageUrlLs, setImageUrlLs, removeImageUrlLs] = useLocalStorage("imageUrl","");

	// useEffect(callback, dependencyArray);
	useEffect(() => {

		// Check localstorage ASAP so that the rest of our code can use it!
		// If localstorage has values, apply those values to state!!!
		if (pokemonNameLs){
			// eslint-disable-next-line react-hooks/set-state-in-effect
			setPokemonName(pokemonNameLs);
		}
		if (imageUrlLs){
			setImageUrl(imageUrlLs);
		}

		
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
		if (pokemonNameLs || imageUrlLs){
			console.log("Loading Pokemon data from localStorage!");
		} else {
			getRandomPokemon();
		}
		



		// return in a useEffect = componentWillUnmount 
		return (() => {
			console.log("RandomPokemon component is unmounting! See ya!");
		})

		// Empty dependency array = componentDidMount
		// Disable this linting rule specifically because this is componentDidMount
		// We do NOT care if pokemonNameLs or imageUrlLs change afterwards,
		// the componentDidMount just runs once and that's it
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		console.log("Pokemon name changed! It is now: " + pokemonName);

		if (pokemonName){
			setPokemonNameLs(pokemonName);
		}
		if (imageUrl){
			setImageUrlLs(imageUrl);
		}
		

		// Putting a variable into the dependency array
		// turns this useEffect into componentDidUpdate
	}, [pokemonName, imageUrl, setPokemonNameLs, setImageUrlLs])



	return <div>
		<h1>{pokemonName}</h1>
		{imageUrl ? <img src={imageUrl} /> : null}
	</div>
}