const phoneCardContainer = document.getElementById('phone-card-container');
const searchBox = document.getElementById('search-box');
const seeMoreBtn = document.getElementById('see-more-btn');
const noDataFoundMsg = document.getElementById('noDataFoundMsg');
const loadingBar = document.getElementById('loadingBar');


// load all phones by api
const loadPhones = async (searchText = '13') => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones);
}

const displayPhones = (phones) => {
    // clear the card container div before inset cards
    phoneCardContainer.innerHTML = '';

    // if no data found
    if(phones.length === 0) {
        noDataFoundMsg.classList.remove('hidden');
        handleLoadingBar(false);
    }
    else {
        noDataFoundMsg.classList.add('hidden');
    }

    // only 9 card will be displayed
    if(phones.length > 9) {
        phones = phones.slice(0, 9);
        seeMoreBtn.classList.remove('hidden');
    }
    else {
        seeMoreBtn.classList.add('hidden');
    }

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
        handleLoadingBar(false);
    }
}

const searchPhones = () => {
    const searchBoxText = searchBox.value;
    if(searchBoxText.trim() === '') {
        loadPhones();
        return;
    }
    else {
        handleLoadingBar(true);
        loadPhones(searchBoxText);
    }
}

const handleLoadingBar = (isLoading) => {
    if(isLoading) {
        loadingBar.classList.remove('hidden');
    }
    else {
        loadingBar.classList.add('hidden');
    }
}

loadPhones();