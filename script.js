// Magic Monday Frankfurt - Basic Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize basic functionality
    initNavSeparatorRemoval();
});

// Remove navigation separators (dots) and clean up
function initNavSeparatorRemoval() {
    const nav = document.getElementById('head_navigation');
    if (nav) {
        // Replace text node dots with nothing
        nav.childNodes.forEach(function(node) {
            if (node.nodeType === 3) { // Text node
                node.textContent = node.textContent.replace(/[·•\u00B7\u2022]/g, ' ');
            }
        });
    }
}
