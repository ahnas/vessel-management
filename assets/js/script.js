!function(a) {
    "use strict";

    // Sidebar toggle and menu activation
    a("#side-menu").metisMenu();
    a(".vertical-menu-btn").on("click", function(e) {
        e.preventDefault();
        a("body").toggleClass("sidebar-enable");
        992 <= a(window).width() ? a("body").toggleClass("vertical-collpsed") : a("body").removeClass("vertical-collpsed");
    });

    a("#sidebar-menu a").each(function() {
        var e = window.location.href.split(/[?#]/)[0];
        if (this.href === e) {
            a(this).addClass("active");
            a(this).parents(".mm-active").addClass("mm-show");
        }
    });

    // Right-bar toggle
    a(".right-bar-toggle").on("click", function(e) {
        a("body").toggleClass("right-bar-enabled");
    });

    // Prevent the right-bar from closing when clicking inside
    a(document).on("click", function(e) {
        if (!a(e.target).closest(".right-bar, .right-bar-toggle").length) {
            a("body").removeClass("right-bar-enabled");
        }
    });

    // Remove individual alert items and the parent alert-box if empty
    a(document).on("click", ".alert-close", function(e) {
        e.preventDefault(); 
        e.stopPropagation(); 

        const alertItem = a(this).closest(".alert-item"); 
        const alertList = alertItem.closest(".alert-list"); 
        const alertBox = alertList.closest(".alert-box"); 

        alertItem.remove(); 

        
        if (alertList.children(".alert-item").length === 0) {
            alertBox.remove(); 
        }
    });

}(jQuery);


// Dashboard Chart

 window.onload = function () {
    const chartsData = [
        {
            elementId: 'vesselChart',
            labels: ['TOTAL VESSELS', 'ACTIVE', 'DOCKED', 'IN TRANSIT'],
            data: [50, 30, 15, 5],
            backgroundColors: ['#003366', '#2BA9A9', '#FFA521', '#1E88E5'],
            legendContainer: '.legend-container'
        },
        {
            elementId: 'vesselChartCrew',
            labels: ['TOTAL', 'ON BOARD', 'ON LEAVE', 'IN TRAINING'],
            data: [120, 80, 30, 10],
            backgroundColors: ['#003366', '#2BA9A9', '#FFA521', '#1E88E5'],
            legendContainer: '.legend-container-crew'
        },
        {
            elementId: 'vesselChartCargo',
            labels: ['TOTAL', 'DELIVERED', 'PENDING', 'IN TRANSIT'],
            data: [200, 150, 40, 10],
            backgroundColors: ['#003366', '#2BA9A9', '#FFA521', '#1E88E5'],
            legendContainer: '.legend-container-cargo'
        }
    ];

    chartsData.forEach(chartInfo => {
        const ctx = document.getElementById(chartInfo.elementId).getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: chartInfo.labels,
                datasets: [{
                    data: chartInfo.data,
                    backgroundColor: chartInfo.backgroundColors,
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '60%',
                plugins: {
                    legend: { display: false }
                }
            }
        });

        const legendContainer = document.querySelector(chartInfo.legendContainer);
        chartInfo.labels.forEach((label, index) => {
            const legendItem = document.createElement('div');
            legendItem.classList.add('legend-item');
            legendItem.innerHTML = `
                <div class="d-flex">
                    <span class="legend-square" style="background-color:${chartInfo.backgroundColors[index]}"></span>
                    ${label} 
                </div>
                <span class="legend-value">${myChart.data.datasets[0].data[index]}</span>`;
            legendContainer.appendChild(legendItem);
        });
    });
};

// Crew details card button hide and show

document.addEventListener('DOMContentLoaded', function () {
    const certificateBtn = document.getElementById('certificate-btn');
    const assignmentBtn = document.getElementById('assignment-btn');
    const pillsTab = document.getElementById('pills-tab');

    const handleTabChange = () => {
        const activeTab = document.querySelector('.nav-pills .btn-custom.active');
        certificateBtn.style.display = 'none';
        assignmentBtn.style.display = 'none';

        if (activeTab.id === 'pills-certificate-tab') {
            certificateBtn.style.display = 'flex';
        } else if (activeTab.id === 'pills-assignment-tab') {
            assignmentBtn.style.display = 'flex';
        }
    };

    const tabButtons = pillsTab.querySelectorAll('.btn-custom');
    tabButtons.forEach(button => {
        button.addEventListener('click', handleTabChange);
    });

    handleTabChange();
});
