const links = document.querySelectorAll('.sidebar a');
    function setActiveLink() {
        const currentPage = window.location.pathname.split('/').pop(); 
        links.forEach(link => {
            const linkPage = link.getAttribute('href').split('/').pop();
            if (currentPage === linkPage) {
                link.classList.add('active'); 
            } else {
                link.classList.remove('active'); 
            }
        });
    }

    window.addEventListener('load', setActiveLink);
    links.forEach(link => {
        link.addEventListener('click', function() {
            links.forEach(link => link.classList.remove('active'));
            this.classList.add('active'); 
        });
    });