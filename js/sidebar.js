// Function to initialize sidebar functionality
function initSidebar() {
    // Get current page
    const currentPage = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
    
    // Set active state
    const activeLink = document.querySelector(`[data-page="${currentPage}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
    
    // Sidebar toggle
    const btn = document.querySelector('#btn');
    const sidebar = document.querySelector('.sidebar');
    
    if (btn && sidebar) {
        // Check localStorage for saved state
        const isSidebarActive = localStorage.getItem('sidebarActive') === 'true';
        if (isSidebarActive) {
            sidebar.classList.add('active');
        }
        
        btn.onclick = function() {
            sidebar.classList.toggle('active');
            // Save state to localStorage
            localStorage.setItem('sidebarActive', sidebar.classList.contains('active'));
        };
    }
}

// Function to load sidebar component
async function loadSidebar() {
    try {
        const response = await fetch('sidebar.html');
        const html = await response.text();
        
        // Create a temporary container
        const temp = document.createElement('div');
        temp.innerHTML = html;
        
        // Get the sidebar element
        const sidebar = temp.querySelector('.sidebar');
        
        // Replace the sidebar placeholder with the actual sidebar
        const sidebarPlaceholder = document.getElementById('sidebar-placeholder');
        if (sidebarPlaceholder && sidebar) {
            sidebarPlaceholder.replaceWith(sidebar);
            
            // Initialize sidebar functionality after it's added to the DOM
            initSidebar();
        }
    } catch (error) {
        console.error('Error loading sidebar:', error);
    }
}

// Load sidebar when DOM is loaded
document.addEventListener('DOMContentLoaded', loadSidebar); 