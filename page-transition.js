// Manejo de transiciones suaves entre páginas
document.addEventListener('DOMContentLoaded', () => {
    // Interceptar clicks en enlaces internos
    const internalLinks = document.querySelectorAll('a[href="lista.html"], a[href="index.html"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetUrl = link.getAttribute('href');
            
            // Preservar los parámetros de la URL actual
            const currentParams = window.location.search;
            const finalUrl = targetUrl + currentParams;
            
            // Agregar clase de transición para fade out
            document.body.classList.add('page-transition');
            
            // Navegar después de la animación
            setTimeout(() => {
                window.location.href = finalUrl;
            }, 500);
        });
    });
});
