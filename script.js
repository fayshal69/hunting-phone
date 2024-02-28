const phoneCardContainer = document.getElementById('phone-card-container');
const searchBox = document.getElementById('search-box');
const seeMoreBtn = document.getElementById('see-more-btn');
const noDataFoundMsg = document.getElementById('noDataFoundMsg');
const loadingBar = document.getElementById('loadingBar');


// load all phones by api
const loadPhones = async (searchText = '13', isSeeAllPhone) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones, isSeeAllPhone);
}

const displayPhones = (phones, isSeeAllPhone) => {
    // clear the card container div before inset cards
    phoneCardContainer.innerHTML = '';

    // if no data found
    if (phones.length === 0) {
        noDataFoundMsg.classList.remove('hidden');
        //turn off the loading bar
        handleLoadingBar(false);
    }
    else {
        noDataFoundMsg.classList.add('hidden');
    }

    // only 9 card will be displayed and if see all btn is not clicked
    if (phones.length > 9 && !isSeeAllPhone) {  //here isSeeAllPhone is undefined if not clicked on see all btn
        phones = phones.slice(0, 9);
        seeMoreBtn.classList.remove('hidden');
    }
    //if clicked on see all btn
    else {
        seeMoreBtn.classList.add('hidden');
    }

    phones.forEach((phone) => {
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
                    <button class="btn btn-primary" onclick="seeDetailsHandler('${phone.slug}')">See Details</button>
                </div>
            </div>
        `;
        phoneCardContainer.appendChild(phoneCard);
    })
    // loading bar calling for turn off
    handleLoadingBar(false);
}

const searchPhones = (isSeeAllPhone) => {
    // loading bar calling for on
    handleLoadingBar(true);
    const searchBoxText = searchBox.value;
    if (searchBoxText.trim() === '') {
        loadPhones();
        return;
    }
    else {
        loadPhones(searchBoxText, isSeeAllPhone);
    }
}

const handleLoadingBar = (isLoading) => {
    if (isLoading) {
        loadingBar.classList.remove('hidden');
    }
    else {
        loadingBar.classList.add('hidden');
    }
}

const seeAllPhones = () => {
    searchPhones(true);
}

const seeDetailsHandler = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const details = data.data;
    showPhoneDetails(details);
}

const showPhoneDetails = (details) => {
    const showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.innerHTML = `
        <div class="text-center"><img src="${details.image}" class="inline"></div>
        <div class="space-y-3">
            <h3 class="text-xl font-semibold">${details?.name || 'Not defined'}</h3>
            <div class="space-y-2 opacity-80">
                <p><span class="font-semibold">Storage: </span> ${details?.mainFeatures?.storage || 'Not defined'}</p>
                <p><span class="font-semibold">Display Size: </span> ${details?.mainFeatures?.displaySize || 'Not defined'}</p>
                <p><span class="font-semibold">Chipset: </span> ${details?.mainFeatures?.chipSet || 'Not defined'}</p>
                <p><span class="font-semibold">Memory: </span> ${details?.mainFeatures?.memory || 'Not defined'}</p>
                <p><span class="font-semibold">Slug: </span> ${details?.slug || 'Not defined'}</p>
                <p><span class="font-semibold">Release data: </span> ${details?.releaseDate || 'Not defined'}</p>
                <p><span class="font-semibold">Brand: </span> ${details?.brand || 'Not defined'}</p>
                <p><span class="font-semibold">GPS: </span> ${details?.others?.GPS || 'Not defined'}</p>
            </div>
        </div>
    `;
    // display the modal
    my_modal_5.showModal();
}

loadPhones();