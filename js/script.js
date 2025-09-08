// 搜索功能实现
function searchProducts() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        alert('请输入搜索关键词');
        return;
    }
    
    // 如果在产品页面，直接搜索当前页面的产品
    const productCards = document.querySelectorAll('.product-card');
    if (productCards.length > 0) {
        let found = false;
        
        productCards.forEach(card => {
            const productTitle = card.querySelector('h3').textContent.toLowerCase();
            if (productTitle.includes(searchTerm)) {
                // 高亮显示匹配的产品
                card.style.boxShadow = '0 0 15px rgba(0, 123, 255, 0.7)';
                card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                found = true;
                
                // 3秒后恢复原样
                setTimeout(() => {
                    card.style.boxShadow = '';
                }, 3000);
            }
        });
        
        if (!found) {
            alert('未找到匹配的产品');
        }
    } else {
        // 如果不在产品页面，跳转到首页并带上搜索参数
        // 检查当前是否在pages目录下
        const currentPath = window.location.pathname;
        if (currentPath.includes('/pages/')) {
            window.location.href = 'home.html?search=' + encodeURIComponent(searchTerm);
        } else {
            window.location.href = 'pages/home.html?search=' + encodeURIComponent(searchTerm);
        }
    }
}

// 页面加载时检查URL参数中是否有搜索请求
window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm = urlParams.get('search');
    
    if (searchTerm) {
        document.getElementById('searchInput').value = searchTerm;
        searchProducts();
    }
}

// 产品详情展示功能
function showDetails(productId) {
    alert('您点击了产品 ' + productId + '，这里将显示产品详情。');
}