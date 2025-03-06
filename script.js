let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
const spinnerEl = document.getElementById("spinner");

function createAndAppendSearchResult(result) {
    let resultItemEl = document.createElement("div");
    resultItemEl.classList.add("mb-5");

    let {
        link,
        title,
        description
    } = result;

    let titleEl = document.createElement("a");
    titleEl.href = link;
    titleEl.target = "_blank";
    titleEl.textContent = title;
    titleEl.classList.add("text-[22px]", "hover:underline", "text-[#007bff]");
    resultItemEl.appendChild(titleEl);

    let titleBreakEl = document.createElement("br");
    resultItemEl.appendChild(titleBreakEl);

    let urlEl = document.createElement("a");
    urlEl.classList.add("text-[#006621]", "no-underline");
    urlEl.href = link;
    urlEl.target = "_blank";
    urlEl.textContent = link;
    resultItemEl.appendChild(urlEl);

    let descriptionEl = document.createElement("p");
    descriptionEl.classList.add("text-[#444444]", "text-sm", "mt-1");
    descriptionEl.textContent = description;
    resultItemEl.appendChild(descriptionEl);

    searchResultsEl.appendChild(resultItemEl);
}

function displayResults(searchResults) {
    spinnerEl.classList.toggle("hidden");

    for (let result of searchResults) {
        createAndAppendSearchResult(result);
    }
}

function searchWikipedia(event) {
    if (event.key === "Enter") {
        spinnerEl.classList.toggle("hidden");

        searchResultsEl.textContent = "";

        let searchInput = searchInputEl.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;
        let options = {
            method: "GET",
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displayResults(search_results);
            });
    }
}

searchInputEl.addEventListener("keydown", searchWikipedia);