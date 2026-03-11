document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();

    const form = document.getElementById('analyze-form');
    const urlInput = document.getElementById('repo-url');
    const analyzeBtn = document.getElementById('analyze-btn');
    const statusMessage = document.getElementById('status-message');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const url = urlInput.value.trim();
        
        // Basic validation
        if (!url) {
            showMessage('Please enter a GitHub repository URL', 'error');
            return;
        }
        
        if (!isValidGithubUrl(url)) {
            showMessage('Please enter a valid GitHub repository URL (e.g., https://github.com/user/repo)', 'error');
            return;
        }

        // Simulate analysis process
        startAnalysis();
    });

    function isValidGithubUrl(url) {
        try {
            const urlObj = new URL(url);
            return urlObj.hostname === 'github.com' && urlObj.pathname.split('/').filter(Boolean).length >= 2;
        } catch (e) {
            // Check if they just entered user/repo format without https
            const parts = url.split('/');
            if (parts.length === 2 && !url.includes(' ')) {
                return true;
            }
            return false;
        }
    }

    function showMessage(msg, type) {
        statusMessage.textContent = msg;
        statusMessage.className = `status-message ${type}`;
    }

    function startAnalysis() {
        analyzeBtn.disabled = true;
        analyzeBtn.textContent = 'Analyzing...';
        analyzeBtn.classList.add('analyzing');
        showMessage('Initiating repository analysis...', '');

        // Simulate network request/processing
        setTimeout(() => {
            analyzeBtn.disabled = false;
            analyzeBtn.textContent = 'Analyze';
            analyzeBtn.classList.remove('analyzing');
            showMessage('Analysis complete! Preparing dashboard...', 'success');
            
            setTimeout(() => {
                urlInput.value = '';
                showMessage('', '');
            }, 3000);
        }, 2000);
    }
});
