const vessels = [

    {
        name: 'Atlantic Voyager',
        id: '1234567',
        status: 'IN TRANSIT',
        departurePort: 'New York, USA',
        departureDate: '21 Nov, 9:00 AM',
        arrivalPort: 'Liverpool, UK',
        eta: '24 Nov, 12:30 PM',
        location: 'Atlantic Ocean',
        captain: 'John Smith',
        avatar: 'assets/img/avatar-1.svg',
        class: 'badge-blue'
    },
    {
        name: 'MV Pacific',
        id: '7654321',
        status: 'DOCKED',
        departurePort: 'Rotterdam, NL',
        departureDate: 'N/A',
        arrivalPort: 'N/A',
        eta: 'N/A',
        location: 'Rotterdam, NL',
        captain: 'John Samuel',
        avatar: 'assets/img/avatar-2.svg',
        class: 'badge-orange'
    },
    {
        name: 'Arctic Pioneer',
        id: '1122334',
        status: 'IDLE',
        departurePort: 'Hamburg, DE',
        departureDate: 'N/A',
        arrivalPort: 'N/A',
        eta: 'N/A',
        location: 'Hamburg, DE',
        captain: 'Michael Davis',
        avatar: 'assets/img/avatar-3.svg',
        class: 'badge-red'
    },
    {
        name: 'Oceanic Star',
        id: '9876543',
        status: 'ACTIVE',
        departurePort: 'Miami, USA',
        departureDate: '20 Nov, 7:30 PM',
        arrivalPort: 'Nassau, Bahamas',
        eta: '22 Nov, 10:00 AM',
        location: 'Gulf of Mexico',
        captain: 'David Lee',
        avatar: 'assets/img/avatar-4.svg',
        class: 'badge-green'
    },
    {
        name: 'Atlantic Voyager',
        id: '1234567',
        status: 'IN TRANSIT',
        departurePort: 'New York, USA',
        departureDate: '21 Nov, 9:00 AM',
        arrivalPort: 'Liverpool, UK',
        eta: '24 Nov, 12:30 PM',
        location: 'Atlantic Ocean',
        captain: 'John Smith',
        avatar: 'assets/img/avatar-1.svg',
        class: 'badge-blue'
    },
    {
        name: 'MV Pacific',
        id: '7654321',
        status: 'DOCKED',
        departurePort: 'Rotterdam, NL',
        departureDate: 'N/A',
        arrivalPort: 'N/A',
        eta: 'N/A',
        location: 'Rotterdam, NL',
        captain: 'John Samuel',
        avatar: 'assets/img/avatar-2.svg',
        class: 'badge-orange'
    },
    {
        name: 'Arctic Pioneer',
        id: '1122334',
        status: 'IDLE',
        departurePort: 'Hamburg, DE',
        departureDate: 'N/A',
        arrivalPort: 'N/A',
        eta: 'N/A',
        location: 'Hamburg, DE',
        captain: 'Michael Davis',
        avatar: 'assets/img/avatar-3.svg',
        class: 'badge-red'
    },
    {
        name: 'Oceanic Star',
        id: '9876543',
        status: 'ACTIVE',
        departurePort: 'Miami, USA',
        departureDate: '20 Nov, 7:30 PM',
        arrivalPort: 'Nassau, Bahamas',
        eta: '22 Nov, 10:00 AM',
        location: 'Gulf of Mexico',
        captain: 'David Lee',
        avatar: 'assets/img/avatar-4.svg',
        class: 'badge-green'
    },
    {
        name: 'Atlantic Voyager',
        id: '1234567',
        status: 'IN TRANSIT',
        departurePort: 'New York, USA',
        departureDate: '21 Nov, 9:00 AM',
        arrivalPort: 'Liverpool, UK',
        eta: '24 Nov, 12:30 PM',
        location: 'Atlantic Ocean',
        captain: 'John Smith',
        avatar: 'assets/img/avatar-1.svg',
        class: 'badge-blue'
    },
    {
        name: 'MV Pacific',
        id: '7654321',
        status: 'DOCKED',
        departurePort: 'Rotterdam, NL',
        departureDate: 'N/A',
        arrivalPort: 'N/A',
        eta: 'N/A',
        location: 'Rotterdam, NL',
        captain: 'John Samuel',
        avatar: 'assets/img/avatar-2.svg',
        class: 'badge-orange'
    },
    {
        name: 'Arctic Pioneer',
        id: '1122334',
        status: 'IDLE',
        departurePort: 'Hamburg, DE',
        departureDate: 'N/A',
        arrivalPort: 'N/A',
        eta: 'N/A',
        location: 'Hamburg, DE',
        captain: 'Michael Davis',
        avatar: 'assets/img/avatar-3.svg',
        class: 'badge-red'
    },
    {
        name: 'Oceanic Star',
        id: '9876543',
        status: 'ACTIVE',
        departurePort: 'Miami, USA',
        departureDate: '20 Nov, 7:30 PM',
        arrivalPort: 'Nassau, Bahamas',
        eta: '22 Nov, 10:00 AM',
        location: 'Gulf of Mexico',
        captain: 'David Lee',
        avatar: 'assets/img/avatar-4.svg',
        class: 'badge-green'
    }

];




let currentPage = 1;
const vesselsPerPage = 5;
let filteredVessels = vessels;

function updatePaginationText(startIndex, endIndex, totalVessels) {
    const paginationText = document.querySelector('.pagination-text');
    paginationText.textContent = `Showing ${startIndex + 1} to ${endIndex} of ${totalVessels} entries`;
}


function populateVesselTable(data) {
    const tableBody = document.getElementById('vessel-table-body');
    tableBody.innerHTML = '';

    const totalPages = Math.ceil(data.length / vesselsPerPage);
    const startIndex = (currentPage - 1) * vesselsPerPage;
    const endIndex = Math.min(startIndex + vesselsPerPage, data.length);
    const vesselsToDisplay = data.slice(startIndex, endIndex);

    vesselsToDisplay.forEach(vessel => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td class="checkbox"><label class="checkbox"><input type="checkbox"><span></span></label></td>
        <td>${vessel.name}</td>
        <td>${vessel.id}</td>
        <td><div class="badge-custom ${vessel.class}">${vessel.status}</div></td>
        <td>${vessel.departurePort}</td>
        <td>${vessel.departureDate}</td>
        <td>${vessel.arrivalPort}</td>
        <td>${vessel.eta}</td>
        <td>${vessel.location}</td>
        <td><div class="d-flex align-items-center"><img class="rounded-circle user-img" src="${vessel.avatar}" width="28" alt="vessel-logo">${vessel.captain}</div></td>
        <td><div class="dropdown table-dropdown">
                <button class="btn btn-more" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="icon-bx-dots-vertical-rounded"></i>
                </button>
                <ul class="dropdown-menu dropdown-menu-end">
                    <li><a class="dropdown-item" href="#"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" style="transform: ;msFilter:;"><path d="M12 14c2.206 0 4-1.794 4-4s-1.794-4-4-4-4 1.794-4 4 1.794 4 4 4zm0-6c1.103 0 2 .897 2 2s-.897 2-2 2-2-.897-2-2 .897-2 2-2z"></path><path d="M11.42 21.814a.998.998 0 0 0 1.16 0C12.884 21.599 20.029 16.44 20 10c0-4.411-3.589-8-8-8S4 5.589 4 9.995c-.029 6.445 7.116 11.604 7.42 11.819zM12 4c3.309 0 6 2.691 6 6.005.021 4.438-4.388 8.423-6 9.73-1.611-1.308-6.021-5.294-6-9.735 0-3.309 2.691-6 6-6z"></path></svg>View</a></li>
                    <hr class="dropdown-divider">
                    <li><a class="dropdown-item" href="#"><i class="icon-bx-edit-alt"></i>Edit</a></li>
                    <hr class="dropdown-divider">
                    <li><a class="dropdown-item" href="#"><i class="icon-bx-trash"></i>Delete</a></li>
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
            populateVesselTable(filteredVessels);
        };
        pageNumbersContainer.appendChild(button);
    }

    document.getElementById('prev-page').onclick = () => {
        if (currentPage > 1) {
            currentPage--;
            populateVesselTable(filteredVessels);
        }
    };

    document.getElementById('next-page').onclick = () => {
        if (currentPage < totalPages) {
            currentPage++;
            populateVesselTable(filteredVessels);
        }
    };
}

// Search Functionality
const searchInput = document.getElementById('search-filter');
searchInput.addEventListener('input', function () {
    const searchTerm = searchInput.value.toLowerCase();
    filteredVessels = vessels.filter(vessel =>
        vessel.name.toLowerCase().includes(searchTerm) || vessel.id.includes(searchTerm)
    );
    currentPage = 1;
    populateVesselTable(filteredVessels);
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
            filteredVessels = vessels;
        } else {
            filteredVessels = vessels.filter(vessel => vessel.status === status);
        }

        const searchTerm = searchInput.value.toLowerCase();
        filteredVessels = filteredVessels.filter(vessel =>
            vessel.name.toLowerCase().includes(searchTerm) || vessel.id.includes(searchTerm)
        );

        currentPage = 1;
        populateVesselTable(filteredVessels);
    });
});

populateVesselTable(vessels);

// checkbox
document.getElementById('checkall').addEventListener('change', function () {
    const isChecked = this.querySelector('input').checked;
    const checkboxes = document.querySelectorAll('#vessel-table-body input[type="checkbox"]');

    checkboxes.forEach(checkbox => {
        checkbox.checked = isChecked;
    });
});


// Apply Filters

document.getElementById('applyFilters').addEventListener('click', function () {
    const statusFilter = document.getElementById('statusVesselSelect').value.trim().toUpperCase();
    const captainFilter = document.getElementById('captainNameSelect').value.trim();

    filteredVessels = vessels.filter(vessel => {
        const matchesStatus = statusFilter ? vessel.status === statusFilter : true;
        const matchesCaptain = captainFilter ? vessel.captain === captainFilter : true;

        return matchesStatus && matchesCaptain;
    });

    currentPage = 1;
    populateVesselTable(filteredVessels);
});




