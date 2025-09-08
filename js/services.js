// services.js - 服务页面的JavaScript功能

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    console.log('服务页面加载完成');
    
    // 初始化搜索功能
    initSearch();
});

// 初始化搜索功能
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        // 添加回车键搜索支持
        searchInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                searchProducts();
            }
        });
    }
}

// 搜索产品功能
function searchProducts() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        alert('请输入搜索关键词');
        return;
    }
    
    // 跳转到首页并带上搜索参数
    const currentPath = window.location.pathname;
    if (currentPath.includes('/pages/')) {
        window.location.href = 'home.html?search=' + encodeURIComponent(searchTerm);
    } else {
        window.location.href = 'pages/home.html?search=' + encodeURIComponent(searchTerm);
    }
}