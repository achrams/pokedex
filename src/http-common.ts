import axios from "axios";

export default axios.create({
  baseURL: "https://graphqlpokemon.favware.tech/v7",
  headers: {
    "Content-type": "application/json"
  }
});