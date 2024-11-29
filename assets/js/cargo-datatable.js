let cargo = JSON.parse(localStorage.getItem('cargo')) || [
    {
        id: 'CG001',
        description: 'Machinery Parts',
        type: 'Containerized',
        weight: '150',
        vesselName: 'Atlantic Voyager',
        origin: 'Hamburg',
        destination: 'New York',
        status: 'IN TRANSIT',
        eta: '24 Nov 2024',
        class: 'badge-blue'
    },
];


let currentPage = 1;
const cargoPerPage = 5;
let filteredCargo = cargo;

function updatePaginationText(startIndex, endIndex, totalCargo) {
    const paginationText = document.querySelector('.pagination-text');
    paginationText.textContent = `Showing ${startIndex + 1} to ${endIndex} of ${totalCargo} entries`;
}

function populateCargoTable(data) {
    const tableBody = document.getElementById('cargo-table-body');
    tableBody.innerHTML = '';

    const totalPages = Math.ceil(data.length / cargoPerPage);
    const startIndex = (currentPage - 1) * cargoPerPage;
    const endIndex = Math.min(startIndex + cargoPerPage, data.length);
    const cargoToDisplay = data.slice(startIndex, endIndex);

    cargoToDisplay.forEach(cargo => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td class="checkbox"><label class="checkbox"><input type="checkbox"><span></span></label></td>
        <td>${cargo.id}</td>
        <td>${cargo.description}</td>
        <td>${cargo.type}</td>
        <td>${cargo.weight}</td>
        <td>${cargo.vesselName}</td>
        <td>${cargo.origin}</td>
        <td>${cargo.destination}</td>
        <td><div class="badge-custom ${cargo.class}">${cargo.status}</div></td>
        <td>${cargo.eta}</td>
        <td>
            <div class="dropdown table-dropdown">
                <button class="btn btn-more" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="icon-bx-dots-vertical-rounded"></i>
                </button>
                <ul class="dropdown-menu dropdown-menu-end">
                    <li>
                        <a class="dropdown-item" href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                                <path d="M12 14c2.206 0 4-1.794 4-4s-1.794-4-4-4-4 1.794-4 4 1.794 4 4 4zm0-6c1.103 0 2 .897 2 2s-.897 2-2 2-2-.897-2-2 .897-2 2-2z"></path>
                                <path d="M11.42 21.814a.998.998 0 0 0 1.16 0C12.884 21.599 20.029 16.44 20 10c0-4.411-3.589-8-8-8S4 5.589 4 9.995c-.029 6.445 7.116 11.604 7.42 11.819zM12 4c3.309 0 6 2.691 6 6.005.021 4.438-4.388 8.423-6 9.73-1.611-1.308-6.021-5.294-6-9.735 0-3.309 2.691-6 6-6z"></path>
                            </svg>View
                        </a>
                    </li>
                    <hr class="dropdown-divider">
                    <li onclick="openEditCargoModal('${cargo.id}')" ><a class="dropdown-item" href="#"><i class="icon-bx-edit-alt"></i>Edit</a></li>
                    <hr class="dropdown-divider">
                    <li onclick="deleteCargo('${cargo.id}')"><a class="dropdown-item" href="#"><i class="icon-bx-trash"></i>Delete</a></li>
                </ul>
            </div>
        </td>`;

        tableBody.appendChild(row);
    });

    updatePagination(totalPages);
    updatePaginationText(startIndex, endIndex, data.length);
}

function updatePagination(totalPages) {
    const pageNumbersContainer = document.getElementById('page-numbers');
    pageNumbersContainer.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.innerText = i;
        button.className = (i === currentPage) ? 'active-next' : '';
        button.onclick = () => {
            currentPage = i;
            populateCargoTable(filteredCargo);
        };
        pageNumbersContainer.appendChild(button);
    }

    document.getElementById('prev-page').onclick = () => {
        if (currentPage > 1) {
            currentPage--;
            populateCargoTable(filteredCargo);
        }
    };

    document.getElementById('next-page').onclick = () => {
        if (currentPage < totalPages) {
            currentPage++;
            populateCargoTable(filteredCargo);
        }
    };
}

// Search Functionality
const searchInput = document.getElementById('search-filter');
searchInput.addEventListener('input', function () {
    const searchTerm = searchInput.value.toLowerCase().trim();
    filteredCargo = cargo.filter(detail => {
        return detail.id.toLowerCase().includes(searchTerm) ||
            detail.type.toLowerCase().includes(searchTerm) ||
            detail.destination.toLowerCase().includes(searchTerm) ||
            detail.vesselName.toLowerCase().includes(searchTerm);
    });

    currentPage = 1;
    populateCargoTable(filteredCargo);
});

// Status Filter Functionality
const statusButtons = document.querySelectorAll('.table-btn');
statusButtons.forEach(button => {
    button.addEventListener('click', function () {
        statusButtons.forEach(btn => {
            btn.classList.remove('btn-solid-blue');
            btn.classList.add('btn-light-darkblue');
        });
        this.classList.remove('btn-light-darkblue');
        this.classList.add('btn-solid-blue');

        const status = this.getAttribute('data-status');
        if (status === 'all') {
            filteredCargo = cargo;
        } else {
            filteredCargo = cargo.filter(detail => detail.status === status);
        }

        const searchTerm = searchInput.value.toLowerCase();
        filteredCargo = filteredCargo.filter(detail =>
            detail.id.toLowerCase().includes(searchTerm) || detail.id.includes(searchTerm)
        );

        currentPage = 1;
        populateCargoTable(filteredCargo);
    });
});

populateCargoTable(cargo);

// checkbox
document.getElementById('checkall').addEventListener('change', function () {
    const isChecked = this.querySelector('input').checked;
    const checkboxes = document.querySelectorAll('#cargo-table-body input[type="checkbox"]');

    checkboxes.forEach(checkbox => {
        checkbox.checked = isChecked;
    });
});

// Apply Filters
document.getElementById('applyFilters').addEventListener('click', function () {
    const cargoTypeFilter = document.getElementById('cargoTypeSelect').value.trim();
    const shipmentStatusFilter = document.getElementById('shipmentStatusSelect').value.trim();

    console.log("Filters Applied:");
    console.log("Cargo Type:", cargoTypeFilter);
    console.log("Shipment Status:", shipmentStatusFilter);

    filteredCargo = cargo.filter(detail => {
        const matchesCargoType = cargoTypeFilter
            ? detail.type.toLowerCase() === cargoTypeFilter.toLowerCase()
            : true;
        const matchesShipmentStatus = shipmentStatusFilter
            ? detail.status.toLowerCase() === shipmentStatusFilter.toLowerCase()
            : true;

        console.log("Checking Cargo:", detail, matchesCargoType, matchesShipmentStatus);
        return matchesCargoType && matchesShipmentStatus;
    });

    console.log("Filtered Results:", filteredCargo);
    currentPage = 1;
    populateCargoTable(filteredCargo);
});



function openAddCargoModal() {
    document.getElementById('cargoForm').reset();
    const newCargoID = generateCargoID();
    document.getElementById('cargoID').value = newCargoID;
    document.getElementById('cargoID').disabled = true;
    document.getElementById('modal-title-sub').innerText = "Add New Cargo";
}

function openEditCargoModal(cargoID) {
    const cargoItem = cargo.find(item => item.id === cargoID);
    console.log(cargoItem);

    if (cargoItem) {
        const etaString = cargoItem.eta;
        const isoFormattedEta = convertToISO(etaString);

        document.getElementById('modal-title-sub').innerText = "Edit Cargo";
        const myModal = new bootstrap.Modal(document.getElementById('addCargoModal'));
        myModal.show();
        document.getElementById('cargoID').value = cargoItem.id;
        document.getElementById('description').value = cargoItem.description;
        document.getElementById('cargoType').value = cargoItem.type;
        document.getElementById('weight').value = cargoItem.weight;
        document.getElementById('vesselName').value = cargoItem.vesselName;
        document.getElementById('origin').value = cargoItem.origin;
        document.getElementById('destination').value = cargoItem.destination;
        document.getElementById('status').value = cargoItem.status;
        document.getElementById('eta').value = isoFormattedEta;
        document.getElementById('cargoID').disabled = true;
    }
}


function saveCargo() {
    const cargoID = document.getElementById('cargoID').value;
    const etaValue = document.getElementById('eta').value;
    const formattedEta = formatDate(etaValue);

    const cargoItem = {
        id: cargoID,
        description: document.getElementById('description').value,
        type: document.getElementById('cargoType').value,
        weight: document.getElementById('weight').value,
        vesselName: document.getElementById('vesselName').value,
        origin: document.getElementById('origin').value,
        destination: document.getElementById('destination').value,
        status: document.getElementById('status').value,
        eta: formattedEta,
        class: getStatusClass(document.getElementById('status').value)
    };
    const existingCargoIndex = cargo.findIndex(item => item.id === cargoID);
    if (existingCargoIndex !== -1) {
        cargo[existingCargoIndex] = cargoItem;
    } else {
        cargo.push(cargoItem);
        updateLastCargoID(generateCargoID());
    }
    localStorage.setItem('cargo', JSON.stringify(cargo));
    filteredCargo = cargo;
    currentPage = 1;
    populateCargoTable(filteredCargo);
    const myModal = new bootstrap.Modal(document.getElementById('addCargoModal'));
    myModal.hide();
}

function generateCargoID() {
    let lastCargoID = localStorage.getItem('lastCargoID');
    let newCargoID = lastCargoID ? 'CG' + (parseInt(lastCargoID.replace('CG', '')) + 1) : 'CG1000';
    return newCargoID;
}

function updateLastCargoID(newCargoID) {
    localStorage.setItem('lastCargoID', newCargoID);
}

function getStatusClass(status) {
    switch (status) {
        case 'PENDING':
            return 'badge-orange';
        case 'DELIVERED':
            return 'badge-green';
        case 'IN TRANSIT':
            return 'badge-blue';
    }
}

function deleteCargo(id) {
    const index = cargo.findIndex(detail => detail.id === id);
    if (index !== -1) {
        cargo.splice(index, 1);
        localStorage.setItem('cargo', JSON.stringify(cargo));
        filteredCargo = cargo;
        currentPage = 1;
        populateCargoTable(filteredCargo);
    }
}

function formatDate(etaValue) {
    console.log(etaValue);
    if (!etaValue) return '';
    const date = new Date(etaValue);
    const dateOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-GB', dateOptions);
    const timeOptions = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    };
    const formattedTime = date.toLocaleTimeString('en-GB', timeOptions);
    return `${formattedDate} ${formattedTime}`;
}

function convertToISO(etaString) {
    const date = new Date(etaString);
    if (isNaN(date)) {
        console.error('Invalid date format');
        return '';
    }
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
}