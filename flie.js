//Stefano, a me non riuscivano le cose nonostantate il codice mi sembri giusto
//Controllando mi dice che la key API non è valida.Ho provato a risolvere il problema, ma non ci sono riuscito.
//Se puoi darmi qualche consiglio
const apiKey = "YI4Rf3ZW27ACB7DOlwbOWnK3xNBVFRAD60hiVtMSdFEkxp1hCd9yH1tRg"
const apiUrl = "https://api.pexels.com/v1/search?query=mountains"

class ApiClient {
    constructor(apiKey, baseUrl) {
        this.apiKey = apiKey;
        this.baseUrl = baseUrl
    }

    get(endpoint) {
        const url = `${this.baseUrl}/${endpoint}`
        return fetch(url, {
            headers: {
                Authorization: this.apiKey
            }
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Errore HTTP! Stato: ${response.status}`)
                }
                return response.json()
            })
    }
}

const loadApiButton = document.getElementById("loadApiButton")
const cardsContainer = document.getElementById("cardsContainer")

loadApiButton.addEventListener("click", () => {
    const apiClient = new ApiClient(apiKey, apiUrl) 

    apiClient
        .get("") 
        .then((data) => {
            cardsContainer.innerHTML = ""
            data.photos.forEach((photo) => {
                const cardHtml = `
                    <div class="col-md-4">
                        <div class="card shadow-sm mb-4">
                            <img
                                src="${photo.src.medium}"
                                class="card-img-top bd-placeholder-img"
                            />
                            <div class="card-body">
                                <h5 class="card-title">${photo.photographer}</h5>
                                <p class="card-text">
                                    Photo ID: ${photo.id}
                                </p>
                                <div
                                    class="d-flex align-items-center justify-content-between"
                                >
                                    <div class="btn-group">
                                        <button
                                            type="button"
                                            class="btn btn-outline-secondary btn-sm"
                                        >
                                            View
                                        </button>
                                        <button
                                            type="button"
                                            class="btn btn-outline-secondary btn-sm"
                                        >
                                            <a href="${photo.url}" target="_blank">Pexels</a>
                                        </button>
                                    </div>
                                    <small class="text-muted">Width: ${photo.width}, Height: ${photo.height}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                cardsContainer.innerHTML += cardHtml
            })
        })
        .catch((error) => {
            console.error("Errore durante il caricamento dei dati API:", error)
        })
})