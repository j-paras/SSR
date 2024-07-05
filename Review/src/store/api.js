import fetch from "isomorphic-fetch";

export function fetchCircuits( ) {
    console.log("Fetching circuits data...");
    return fetch("https://www.olx.in/api/relevance/v4/search?category=81&facet_limit=1000&relaxedFilters=true&user=010609093561668215&lang=en-IN")
        .then((res) => {
            console.log("API response status:", res.status);
            return res.json();
        })
        .then((res) => {
            console.log("API response data:", res.data.data);
            return res.data.data;
        })
        .catch((error) => {
            console.error("Error fetching circuits:", error);
            throw error; 
        });
}