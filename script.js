const phoneCardContainer = document.getElementById('phone-card-container');
const searchBox = document.getElementById('search-box');

// load all phones by api
const loadPhones = async (searchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones);
}

const displayPhones = (phones) => {
    for (let phone of phones) {
        
        // create card div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card max-w-96 bg-base-100 shadow-xl`;
        phoneCard.innerHTML = `
            <figure>
                <img src="${phone.image}" />
            </figure>
            <div class="card-body">
                <h2 class="card-title">${phone.phone_name}</h2>
                <p>There are many variations of passages of available, but the majority have suffered</p>
                <div class="card-actions justify-center">
                    <button class="btn btn-primary">See Details</button>
                </div>
            </div>
        `;
        phoneCardContainer.appendChild(phoneCard);
    }
}

const searchPhones = () => {
    const searchBoxText = searchBox.value;
    loadPhones(searchBoxText);
}

loadPhones();