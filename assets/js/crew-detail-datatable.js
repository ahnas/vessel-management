const certificates = [
    {
        id: 1,
        certification: 'Safety at Sea',
        issuedBy: 'Maritime Safety Board',
        issueDate: '01 Jan 2023',
        expiryDate: '31 Dec 2025',
        certificateLevel: 'Advanced',
        status: 'ACTIVE',
        statusClass: 'badge-green'
    },
    {
        id: 2,
        certification: 'Medical First Aid',
        issuedBy: 'Global Maritime Academy',
        issueDate: '15 Mar 2022',
        expiryDate: '14 Mar 2025',
        certificateLevel: 'Intermediate',
        status: 'EXPIRING SOON',
        statusClass: 'badge-orange'
    },
    {
        id: 3,
        certification: 'Firefighting Techniques',
        issuedBy: 'National Safety Bureau',
        issueDate: '10 Jun 2021',
        expiryDate: '09 Jun 2024',
        certificateLevel: 'Basic',
        status: 'ACTIVE',
        statusClass: 'badge-green'
    },
    {
        id: 4,
        certification: 'Navigation Basics',
        issuedBy: 'Marine Authority HQ',
        issueDate: '20 Aug 2023',
        expiryDate: '19 Aug 2026',
        certificateLevel: 'Advanced',
        status: 'ACTIVE',
        statusClass: 'badge-green'
    },
    {
        id: 5,
        certification: 'Environmental Awareness',
        issuedBy: 'Green Marine Institute',
        issueDate: '05 May 2020',
        expiryDate: '04 May 2023',
        certificateLevel: 'Intermediate',
        status: 'EXPIRED',
        statusClass: 'badge-red'
    },
    {
        id: 12,
        certification: 'Medical First Aid',
        issuedBy: 'Global Maritime Academy',
        issueDate: '15 Mar 2022',
        expiryDate: '14 Mar 2025',
        certificateLevel: 'Intermediate',
        status: 'EXPIRING SOON',
        statusClass: 'badge-orange'
    },
];

let currentPage = 1;
const certificatesPerPage = 5;
let filteredDetails = certificates;

function updatePaginationText(startIndex, endIndex, totalDetails) {
    const paginationText = document.querySelector('.pagination-text');
    paginationText.textContent = `Showing ${startIndex + 1} to ${endIndex} of ${totalDetails} entries`;
}

function populateDetailTable(data) {
    const tableBody = document.getElementById('certificate-table-body');
    tableBody.innerHTML = '';

    const totalPages = Math.ceil(data.length / certificatesPerPage);
    const startIndex = (currentPage - 1) * certificatesPerPage;
    const endIndex = Math.min(startIndex + certificatesPerPage, data.length);
    const certificatesToDisplay = data.slice(startIndex, endIndex);

    certificatesToDisplay.forEach(certificate => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td class="checkbox"><label class="checkbox"><input type="checkbox"><span></span></label></td>
        <td><div class="d-flex align-items-center"><i class="icon-bx-file doc-icon"></i>${certificate.certification}</div></td>
        <td>${certificate.issuedBy}</td>
        <td>${certificate.issueDate}</td>
        <td>${certificate.expiryDate}</td>
        <td>${certificate.certificateLevel}</td>
        <td><div class="badge-custom ${certificate.statusClass}">${certificate.status}</div></td>
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
            populateDetailTable(filteredDetails);
        };
        pageNumbersContainer.appendChild(button);
    }

    document.getElementById('prev-page').onclick = () => {
        if (currentPage > 1) {
            currentPage--;
            populateDetailTable(filteredDetails);
        }
    };

    document.getElementById('next-page').onclick = () => {
        if (currentPage < totalPages) {
            currentPage++;
            populateDetailTable(filteredDetails);
        }
    };
}

// Search Functionality
const searchInput = document.getElementById('search-filter');
searchInput.addEventListener('input', function () {
    const searchTerm = searchInput.value.toLowerCase().trim();
    filteredDetails = certificates.filter(certificate => {
        return certificate.certification.toLowerCase().includes(searchTerm);
    });

    currentPage = 1;
    populateDetailTable(filteredDetails);
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
            filteredDetails = certificates;
        } else {
            filteredDetails = certificates.filter(certificate => certificate.status === status);
        }

        const searchTerm = searchInput.value.toLowerCase();
        filteredDetails = filteredDetails.filter(certificate =>
            certificate.id.toLowerCase().includes(searchTerm) || certificate.id.includes(searchTerm)
        );

        currentPage = 1;
        populateDetailTable(filteredDetails);
    });
});

populateDetailTable(certificates);


// checkbox
document.getElementById('checkall').addEventListener('change', function () {
    const isChecked = this.querySelector('input').checked;
    const checkboxes = document.querySelectorAll('#certificate-table-body input[type="checkbox"]');

    checkboxes.forEach(checkbox => {
        checkbox.checked = isChecked;
    });
});
document.getElementById('checkall1').addEventListener('change', function () {
    const isChecked = this.querySelector('input').checked;
    const checkboxes = document.querySelectorAll('#assignment-table-body input[type="checkbox"]');

    checkboxes.forEach(checkbox => {
        checkbox.checked = isChecked;
    });
});

document.getElementById('applyFilters').addEventListener('click', function () {
    const statusFilter = document.getElementById('statusCertificateSelect').value.trim();
    console.log(statusFilter);
    filteredAssignments = filteredDetails.filter(assignment => {
        const matchesStatus = statusFilter ? assignment.status === statusFilter : true;
        return matchesStatus;
    });
    console.log(filteredAssignments);
    currentPage = 1; // Reset to the first page after filtering
    populateDetailTable(filteredAssignments);
});

////Assignments full functionality

const assignments = [
    {
        id: 'ASG001',
        vesselName: 'Atlantic Voyager',
        role: 'Deck Officer',
        startDate: '01 Jan 2025',
        endDate: '31 Mar 2025',
        status: 'NEW',
        class: 'badge-orange'
    },
    {
        id: 'ASG002',
        vesselName: 'Oceanic Star',
        role: 'Chief Engineer',
        startDate: '01 Nov 2024',
        endDate: '15 Dec 2024',
        status: 'CURRENT',
        class: 'badge-green'
    },
    {
        id: 'ASG003',
        vesselName: 'Southern Navigator',
        role: 'Crew Member',
        startDate: '01 Sep 2024',
        endDate: '30 Sep 2024',
        status: 'COMPLETED',
        class: 'badge-blue'
    },
    {
        id: 'ASG004',
        vesselName: 'Pacific Explorer',
        role: 'Captain',
        startDate: '01 Jul 2023',
        endDate: '30 Jun 2024',
        status: 'COMPLETED',
        class: 'badge-blue'
    },
    {
        id: 'ASG005',
        vesselName: 'Arctic Explorer',
        role: 'First Officer',
        startDate: '01 Sep 2022',
        endDate: '30 Mar 2023',
        status: 'COMPLETED',
        class: 'badge-blue'
    },
    {
        id: 'ASG002',
        vesselName: 'Oceanic Star',
        role: 'Chief Engineer',
        startDate: '01 Nov 2024',
        endDate: '15 Dec 2024',
        status: 'CURRENT',
        class: 'badge-green'
    },
];

const itemsPerPage = 5; // Define how many assignments to display per page
let filteredAssignments = [...assignments]; // This will hold the current list of assignments to display

function loadAssignments(pageNumber = 1) {
    const tbody = document.getElementById('assignment-table-body');
    const paginationText = document.getElementById('pagination-container');
    const pageNumbersContainer = document.getElementById('page-numbers-assignment');
    const prevButton = document.getElementById('prev-page-assignment');
    const nextButton = document.getElementById('next-page-assignment');

    tbody.innerHTML = '';

    // Calculate total pages based on filtered assignments
    const totalAssignments = filteredAssignments.length;
    const totalPages = Math.ceil(totalAssignments / itemsPerPage);

    if (pageNumber < 1) pageNumber = 1;
    if (pageNumber > totalPages) pageNumber = totalPages;

    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalAssignments);
    const paginatedAssignments = filteredAssignments.slice(startIndex, endIndex);

    paginatedAssignments.forEach(assignment => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td class="checkbox"><label class="checkbox"><input type="checkbox"><span></span></label></td>
            <td>${assignment.id}</td>
            <td>${assignment.vesselName}</td>
            <td>${assignment.role}</td>
            <td>${assignment.startDate}</td>
            <td>${assignment.endDate}</td>
            <td><div class="badge-custom ${assignment.class}">${assignment.status}</div></td>
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
                        <li><a class="dropdown-item" href="#"><i class="icon-bx-edit-alt"></i>Edit</a></li>
                        <hr class="dropdown-divider">
                        <li><a class="dropdown-item" href="#"><i class="icon-bx-trash"></i>Delete</a></li>
                    </ul>
                </div>
            </td>`;

        tbody.appendChild(row);
    });


    if (totalAssignments === 0) {
        paginationText.innerText = `Showing 0 to 0 of 0 entries`;
    } else {
        paginationText.innerText = `Showing ${startIndex + 1} to ${endIndex} of ${totalAssignments} entries`;
    }

    pageNumbersContainer.innerHTML = '';
    for (let i = 1; i <= totalPages; i++) {
        const pageNumberButton = document.createElement('button');
        pageNumberButton.innerText = i;
        pageNumberButton.className = (i === pageNumber) ? 'active-next' : '';
        pageNumberButton.onclick = () => loadAssignments(i);
        pageNumbersContainer.appendChild(pageNumberButton);
    }


    prevButton.disabled = pageNumber === 1;
    prevButton.onclick = () => loadAssignments(pageNumber - 1);


    nextButton.disabled = pageNumber === totalPages;
    nextButton.onclick = () => loadAssignments(pageNumber + 1);
}

// Search functionality
const searchInputAssign = document.getElementById('search-filter-assignment');
searchInputAssign.addEventListener('input', function () {
    const searchTerm = searchInputAssign.value.toLowerCase().trim();


    filteredAssignments = assignments.filter(assignment => {
        return assignment.vesselName.toLowerCase().includes(searchTerm) ||
            assignment.id.toLowerCase().includes(searchTerm);
    });

    currentPage = 1;
    loadAssignments(currentPage);
});


loadAssignments(currentPage);

// Apply Filters

document.getElementById('applyFilters1').addEventListener('click', function () {
    const statusFilter = document.getElementById('statusAssignmentSelect').value.trim();
    console.log(statusFilter);
    filteredAssignments = assignments.filter(assignment => {
        const matchesStatus = statusFilter ? assignment.status === statusFilter : true;
        return matchesStatus;
    });
    console.log(filteredAssignments);
    currentPage = 1; // Reset to the first page after filtering
    loadAssignments(currentPage);
});



