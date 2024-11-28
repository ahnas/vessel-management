const crews = [
    {
        name: 'John Smith',
        id: 'C001',
        role: 'Captain',
        status: 'ONBOARD',
        vesselName: 'Atlantic Voyager',
        location: 'Atlantic Ocean',
        voyageDetails: 'NY to Liverpool',
        contact: '+1234567890',
        avatar: 'assets/img/avatar-1.svg',
        class: 'badge-green'
    },
    {
        name: 'Michael Davis',
        id: 'C002',
        role: 'Chief Engineer',
        status: 'OFFBOARD',
        vesselName: '-',
        location: 'London, UK',
        voyageDetails: '-',
        contact: '+9876543210',
        avatar: 'assets/img/avatar-2.svg',
        class: 'badge-orange'
    },
    {
        name: 'John Samuel',
        id: 'C003',
        role: 'First Officer',
        status: 'ONBOARD',
        vesselName: 'Arctic Pioneer',
        location: 'Gulf of Mexico',
        voyageDetails: 'Miami to Nassau',
        contact: '+1234567891',
        avatar: 'assets/img/avatar-3.svg',
        class: 'badge-green'
    },
    {
        name: 'David Lee',
        id: 'C004',
        role: 'Deck Officer',
        status: 'ONBOARD',
        vesselName: 'Oceanic Star',
        location: 'Mediterranean Sea',
        voyageDetails: 'Barcelona to Alexandria',
        contact: '+9876543211',
        avatar: 'assets/img/avatar-4.svg',
        class: 'badge-green'
    },
    {
        name: 'Alex Smith',
        id: 'C005',
        role: 'Trainee Engineer',
        status: 'IN TRAINING',
        vesselName: '-',
        location: 'Training Center, NY',
        voyageDetails: '-',
        contact: '+1234567892',
        avatar: 'assets/img/avatar-1.svg',
        class: 'badge-blue'
    },
    {
        name: 'Emily Johnson',
        id: 'C006',
        role: 'Deck Officer',
        status: 'ONBOARD',
        vesselName: 'Atlantic Explorer',
        location: 'Atlantic Ocean',
        voyageDetails: 'NY to Liverpool',
        contact: '+1234567893',
        avatar: 'assets/img/avatar-2.svg',
        class: 'badge-green'
    },

];


let currentPage = 1;
const crewsPerPage = 5;
let filteredCrews = crews;

function updatePaginationText(startIndex, endIndex, totalCrews) {
    const paginationText = document.querySelector('.pagination-text');
    paginationText.textContent = `Showing ${startIndex + 1} to ${endIndex} of ${totalCrews} entries`;
}

function populateCrewsTable(data) {
    console.log(data);
    const tableBody = document.getElementById('crew-tracking-table-body');
    tableBody.innerHTML = '';

    const totalPages = Math.ceil(data.length / crewsPerPage);
    const startIndex = (currentPage - 1) * crewsPerPage;
    const endIndex = Math.min(startIndex + crewsPerPage, data.length);
    const crewsToDisplay = data.slice(startIndex, endIndex);

    crewsToDisplay.forEach(crew => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td class="checkbox"><label class="checkbox"><input type="checkbox"><span></span></label></td>
        <td><div class="d-flex align-items-center"><img class="rounded-circle user-img" src="${crew.avatar}" width="28" alt="vessel-logo">${crew.name}</div></td>
        <td>${crew.id}</td>
        <td>${crew.role}</td>
        <td><div class="badge-custom ${crew.class}">${crew.status}</div></td>
        <td>${crew.vesselName}</td>
        <td>${crew.location}</td>
        <td>${crew.voyageDetails}</td>
        <td>${crew.contact}</td>
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
            populateCrewsTable(filteredCrews);
        };
        pageNumbersContainer.appendChild(button);
    }

    document.getElementById('prev-page').onclick = () => {
        if (currentPage > 1) {
            currentPage--;
            populateCrewsTable(filteredCrews);
        }
    };

    document.getElementById('next-page').onclick = () => {
        if (currentPage < totalPages) {
            currentPage++;
            populateCrewsTable(filteredCrews);
        }
    };
}

// Search Functionality
const searchInput = document.getElementById('search-filter');
searchInput.addEventListener('input', function () {
    const searchTerm = searchInput.value.toLowerCase().trim(); 
    filteredCrews = crews.filter(crew => {
        return crew.name.toLowerCase().includes(searchTerm) ||
            crew.id.toLowerCase().includes(searchTerm) ||
            crew.vesselName.toLowerCase().includes(searchTerm);
    });

    currentPage = 1;
    populateCrewsTable(filteredCrews);
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
            filteredCrews = crews;
        } else {
            filteredCrews = crews.filter(crew => crew.status === status);
        }

        const searchTerm = searchInput.value.toLowerCase();
        filteredCrews = filteredCrews.filter(crew =>
            crew.name.toLowerCase().includes(searchTerm) || crew.id.includes(searchTerm)
        );

        currentPage = 1;
        populateCrewsTable(filteredCrews);
    });
});

populateCrewsTable(crews);

// checkbox
document.getElementById('checkall').addEventListener('change', function () {
    const isChecked = this.querySelector('input').checked;
    const checkboxes = document.querySelectorAll('#crew-tracking-table-body input[type="checkbox"]');

    checkboxes.forEach(checkbox => {
        checkbox.checked = isChecked;
    });
});


// Apply Filters

document.getElementById('applyFilters').addEventListener('click', function () {
    const statusFilter = document.getElementById('statusCrew').value.trim();
    const roleFilter = document.getElementById('crewRole').value.trim();

    filteredCrews = crews.filter(crew => {
        const matchesStatus = statusFilter ? crew.status === statusFilter : true;
        const matchesRole = roleFilter ? crew.role === roleFilter : true;
        return matchesStatus && matchesRole;
    });

    const searchTerm = document.getElementById('search-filter').value.toLowerCase().trim();
    filteredCrews = filteredCrews.filter(crew =>
        crew.name.toLowerCase().includes(searchTerm) || crew.id.toLowerCase().includes(searchTerm)
    );

    currentPage = 1;
    populateCrewsTable(filteredCrews);
});
