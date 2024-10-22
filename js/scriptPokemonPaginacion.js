/* =========
no da bien
========= */

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');
    
    var itemsPerPage = 9;
    var items = document.querySelectorAll('#listaPokemon .pokemon');
    console.log('Número de elementos encontrados:', items.length);
    
    var totalPages = Math.ceil(items.length / itemsPerPage);
    console.log('Total de páginas:', totalPages);
    
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentPage = 1;

    function showPage(page) {
        console.log('Mostrando página:', page);
        items.forEach((item, index) => {
            if (index >= (page - 1) * itemsPerPage && index < page * itemsPerPage) {
                item.classList.add('active');
                item.style.display = 'block';
            } else {
                item.classList.remove('active');
                item.style.display = 'none';
            }
        });

        prevBtn.disabled = page === 1;
        nextBtn.disabled = page === totalPages;
    }

    prevBtn.addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            showPage(currentPage);
        }
    });

    nextBtn.addEventListener('click', function() {
        if (currentPage < totalPages) {
            currentPage++;
            showPage(currentPage);
        }
    });


    showPage(currentPage);
});