// Basic JavaScript for Magic Monday Frankfurt links page
document.addEventListener('DOMContentLoaded', function() {
    // Add click tracking for links
    const links = document.querySelectorAll('.link-button');
    
    links.forEach(function(link) {
        link.addEventListener('click', function() {
            console.log('Link clicked:', this.textContent.trim());
        });
    });
});
