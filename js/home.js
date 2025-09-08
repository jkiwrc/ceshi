// 首页专用JavaScript

// 产品数据
const products = [
    { 
        id: 1, 
        title: "毕生难忘-纪念网页", 
        description: "1. 生日祝福页面 - 有生日蛋糕、祝福语卡片和多种动画效果\n 2. 毕业主题页面 - 有黑板、3D立方体、礼花动画等元素\n 3.编程语法：html css js.\n网页：2个", 
        category: "毕业作品",
        price: "¥ 45.00",
        images: [
            "../images/展示图1.png", 
            "../images/展示图1.1.png",
            "../images/展示图1.2.png"
        ] 
    },
    { 
        id: 2, 
        title: "学生就业协会网站", 
        description: "1.学生就业协会网站新增作品展示页面，包含分类筛选功能和响应式设计。\n只展示了部分图\n2.编程语法：html css js json .\n3.网页：4个", 
        category: "毕业设计",
        price: "¥ 58.00",
        images: [
            "../images/展示图2.1.png",
            "../images/展示图2.2.png",
            "../images/展示图2.3.png"
        ] 
    },
    { 
        id: 3, 
        title: "小米官方网站", 
        description: "1. 小米官方网站是一个专业的移动设备制造商，提供手机、平板、智能手表等产品。\n2. 该网站展示了小米的产品 lineup、技术规格、用户评价等信息。\n3. 编程语法：html css js.\n4. 网页：2个", 
        category: "个人网站",
        price: "¥ 39.00",
        images: [
            "../images/展示图3.1.png",
            "../images/展示图3.2.png",
           
        ] 
    },
    { 
        id: 4, 
        title: "探索唐卡 - 雪域文化的艺术瑰宝", 
        description: "本项目是一个以藏族唐卡文化为主题的综合性网站，旨在通过现代化的数字技术展示和传播这一千年传统艺术。网站采用响应式设计，兼容各种设备，为用户提供沉浸式的文化体验。\n编程语法：html css js", 
        category: "简单项目",
        price: "¥ 30.00",
        images: [
            "../images/展示图4.3.png",
            "../images/4.1.png",
            "../images/展示图4.2.png"
        ] 
    },
    { 
        id: 5, 
        title: "管理系统", 
        description: "这是一个基于Web的管理系统，具有用户登录、用户管理、角色管理、菜单管理和系统监控等功能。", 
        category: "管理系统网站",
        price: "¥ 20.00",
        images: [
            "../images/展示图5.1.png",
            "../images/展示图5.2.png",
            "../images/展示图5.3.png",
            "../images/展示图5.4.png",
            "../images/展示图5.5.png"
        ] 
    },
    { 
        id: 6, 
        title: "商业资讯网站", 
        description: "1. 商业资讯网站是一个专业的资讯平台，提供最新的商业新闻、分析、报告和趋势。\n2. 该网站展示了不同行业的资讯，包括金融、科技、医疗、教育等。\n3. 编程语法：html css js.\n4. 网页：9个", 
        category: "简单",
        price: "¥ 30.00",
        images: [
            "../images/6.1.png",
            "../images/6.2.png",
            "../images/6.3.png"
        ] 
    },
    { 
        id: 7, 
        title: "个人简历网站", 
        description: "注意：定制模板，根据个人需求进行调整", 
        category: "复杂",
        price: "¥ 65.00",
        images: [
            "../images/7.1.png"
            
        ] 
    },
    { 
        id: 8, 
        title: "vpn网站", 
        description: "注意：定制模板，根据个人需求进行调整", 
        category: "一般",
        price: "¥ 80.00",
        images: [
            "../images/8.1.png",
            "../images/8.2.png",
            "../images/8.3.png"
        ] 
    },
    { 
        id: 9, 
        title: "元素周期表网站", 
        description: "成品网站模板，内容可自定义修改", 
        category: "元素周期网站",
        price: "¥ 20.00",
        images: [
            "../images/9.1.png", 
            "../images/9.2.png",
            "../images/9.3.png",
            "../images/9.4.png"
        ] 
    }
];

// 全局变量
let currentPage = 0;
let currentProduct = null;
let currentImageIndex = 0;

// 产品搜索功能
function searchProducts() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        alert('请输入搜索关键词');
        return;
    }
    
    // 隐藏所有产品卡片
    const productCards = document.querySelectorAll('.product-card');
    let matchCount = 0;
    
    // 隐藏分页
    document.querySelector('.pagination').style.display = 'none';
    
    // 显示搜索结果信息
    let searchResultInfo = document.getElementById('searchResultInfo');
    if (!searchResultInfo) {
        searchResultInfo = document.createElement('div');
        searchResultInfo.id = 'searchResultInfo';
        searchResultInfo.className = 'search-result-info';
        document.querySelector('.content').insertBefore(searchResultInfo, document.querySelector('.product-grid'));
    }
    
    // 遍历所有产品
    productCards.forEach(card => {
        const productTitle = card.querySelector('h3').textContent.toLowerCase();
        if (productTitle.includes(searchTerm)) {
            card.style.display = 'block';
            matchCount++;
        } else {
            card.style.display = 'none';
        }
    });
    
    // 更新搜索结果信息
    searchResultInfo.innerHTML = `
        <span>找到 ${matchCount} 个匹配的产品</span>
        <a href="javascript:void(0);" onclick="resetSearch()"><button>清除搜索</button></a>
    `;
    searchResultInfo.style.display = 'flex';
}

// 重置搜索结果，显示所有产品
function resetSearch() {
    // 显示所有产品卡片
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.style.display = 'block';
    });
    
    // 清空搜索框
    document.getElementById('searchInput').value = '';
    
    // 隐藏搜索结果信息
    const searchResultInfo = document.getElementById('searchResultInfo');
    if (searchResultInfo) {
        searchResultInfo.style.display = 'none';
    }
    
    // 显示分页
    document.querySelector('.pagination').style.display = 'flex';
    
    // 重新显示第一页
    changePage(0);
}

// 显示产品详情
function showDetails(productId) {
    console.log('showDetails called with productId:', productId);
    console.log('Current products array:', products);
    
    // 查找产品数据
    currentProduct = products.find(p => p.id === productId);
    if (!currentProduct) {
        console.error('Product not found with ID:', productId);
        return;
    }
    console.log('Found product:', currentProduct);
    
    // 设置模态框内容
    document.getElementById('modal-title').textContent = currentProduct.title;
    document.getElementById('modal-description').textContent = currentProduct.description;
    document.getElementById('product-id-value').textContent = currentProduct.id;
    document.getElementById('product-category-value').textContent = currentProduct.category;
    document.getElementById('product-price').textContent = currentProduct.price;
    
    // 设置主图片
    const mainImage = document.getElementById('modal-image');
    mainImage.src = currentProduct.images[0];
    currentImageIndex = 0;
    
    // 生成缩略图
    const thumbnailsContainer = document.getElementById('thumbnails');
    thumbnailsContainer.innerHTML = '';
    
    currentProduct.images.forEach((img, index) => {
        const thumb = document.createElement('div');
        thumb.className = 'thumbnail' + (index === 0 ? ' active' : '');
        thumb.onclick = () => selectImage(index);
        
        const thumbImg = document.createElement('img');
        thumbImg.src = img;
        thumbImg.alt = `缩略图 ${index + 1}`;
        
        thumb.appendChild(thumbImg);
        thumbnailsContainer.appendChild(thumb);
    });
    
    // 显示模态框
    const modal = document.getElementById('product-modal');
    if (!modal) {
        console.error('Modal element not found with ID: product-modal');
        return;
    }
    console.log('Modal element found:', modal);
    modal.style.display = 'block';
    
    // 添加动画效果
    setTimeout(() => {
        // 添加active类以显示模态框
        modal.classList.add('active');
        
        const modalContent = document.querySelector('.modal-content');
        if (!modalContent) {
            console.error('Modal content element not found');
            return;
        }
        console.log('Modal content element found:', modalContent);
    }, 10);
    
    // 添加键盘事件监听
    document.addEventListener('keydown', handleModalKeydown);
}

// 选择图片
function selectImage(index) {
    console.log('selectImage called with index:', index);
    if (!currentProduct) {
        console.error('No current product when selecting image');
        return;
    }
    
    // 更新当前图片索引
    currentImageIndex = index;
    
    // 更新主图片
    const mainImage = document.getElementById('modal-image');
    if (!mainImage) {
        console.error('Main image element not found with ID: modal-image');
        return;
    }
    console.log('Setting main image src to:', currentProduct.images[index]);
    mainImage.src = currentProduct.images[index];
    
    // 更新缩略图状态
    const thumbnails = document.querySelectorAll('.thumbnail');
    console.log('Found thumbnails:', thumbnails.length);
    thumbnails.forEach((thumb, i) => {
        if (i === index) {
            thumb.classList.add('active');
        } else {
            thumb.classList.remove('active');
        }
    });
}

// 页面加载时检查URL参数中是否有搜索请求
window.onload = function() {
    console.log('Window loaded, initializing page...');
    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm = urlParams.get('search');
    
    if (searchTerm) {
        document.getElementById('searchInput').value = searchTerm;
        searchProducts();
    } else {
        // 显示第一页产品
        console.log('Loading first page of products...');
        changePage(0);
    }
}

// 处理模态框键盘事件
function handleModalKeydown(e) {
    if (e.key === 'Escape') {
        closeModal();
    } else if (e.key === 'ArrowLeft') {
        navigateImages(-1);
    } else if (e.key === 'ArrowRight') {
        navigateImages(1);
    }
}

// 处理全屏查看器键盘事件
function handleFullscreenKeydown(e) {
    if (e.key === 'Escape') {
        closeFullImage();
    } else if (e.key === 'ArrowLeft') {
        changeImage(-1, 'fullscreen');
    } else if (e.key === 'ArrowRight') {
        changeImage(1, 'fullscreen');
    }
}

// 关闭模态框
function closeModal() {
    // 获取模态框元素
    const modal = document.getElementById('product-modal');
    if (!modal) {
        console.error('Modal element not found when closing');
        return;
    }
    
    // 移除active类以触发关闭动画
    modal.classList.remove('active');
    
    // 延迟隐藏模态框，等待动画完成
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
    
    // 移除键盘事件监听
    document.removeEventListener('keydown', handleModalKeydown);
    
    // 重置产品和图片索引
    currentProduct = null;
    currentImageIndex = 0;
}

// 分页功能
const productsPerPage = 8; // 每页显示的产品数量

function changePage(direction) {
    console.log('changePage called with direction:', direction);
    // 如果是数字，直接设置页码
    if (typeof direction === 'number' && !isNaN(direction)) {
        if (direction >= 0) {
            currentPage = direction;
        } else {
            // 如果是负数，则是相对当前页的偏移
            const newPage = currentPage + direction;
            if (newPage >= 0) {
                currentPage = newPage;
            }
        }
    }
    
    // 计算总页数
    const totalPages = Math.ceil(products.length / productsPerPage);
    console.log('Total pages:', totalPages, 'Current page:', currentPage);
    
    // 确保页码在有效范围内
    if (currentPage >= totalPages) {
        currentPage = totalPages - 1;
    }
    if (currentPage < 0) {
        currentPage = 0;
    }
    
    // 更新页码信息
    const pageInfo = document.getElementById('page-info');
    if (pageInfo) {
        pageInfo.textContent = `第 ${currentPage + 1} 页 / 共 ${totalPages} 页`;
    }
    
    // 计算当前页的产品范围
    const start = currentPage * productsPerPage;
    const end = Math.min(start + productsPerPage, products.length);
    console.log('Displaying products from index', start, 'to', end - 1);
    
    // 获取产品网格容器
    const productGrid = document.querySelector('.product-grid');
    if (productGrid) {
        console.log('Found product grid, clearing and adding new cards');
        productGrid.innerHTML = '';
        
        // 显示当前页的产品
        for (let i = start; i < end; i++) {
            const product = products[i];
            console.log('Creating card for product:', product.id, product.title);
            
            const card = document.createElement('div');
            card.className = 'product-card';
            card.setAttribute('data-product-id', product.id);
            
            card.innerHTML = `
                <div class="card-image-container">
                    <img src="${product.images[0]}" alt="${product.title}">
                </div>
                <h3>${product.title}</h3>
            `;
            
            // 使用addEventListener而不是onclick属性
            card.addEventListener('click', function() {
                console.log('Card clicked with product ID:', product.id);
                showDetails(product.id);
            });
            
            productGrid.appendChild(card);
        }
    } else {
        console.error('Product grid element not found!');
    }
}

// 导航到上一页
function prevPage() {
    changePage(-1); // 使用相对偏移，向前移动一页
}

// 导航到下一页
function nextPage() {
    const totalPages = Math.ceil(products.length / productsPerPage);
    if (currentPage < totalPages - 1) {
        changePage(1); // 使用相对偏移，向后移动一页
    }
}

// 导航产品图片
function navigateImages(direction) {
    if (!currentProduct) return;
    
    // 计算新的图片索引
    const imagesCount = currentProduct.images.length;
    let newIndex = currentImageIndex + direction;
    
    // 循环导航
    if (newIndex < 0) newIndex = imagesCount - 1;
    if (newIndex >= imagesCount) newIndex = 0;
    
    // 选择新图片
    selectImage(newIndex);
}

// 打开全屏图片查看器
function openFullImage() {
    if (!currentProduct) return;
    
    // 设置全屏图片
    const fullscreenImage = document.getElementById('fullscreen-image');
    fullscreenImage.src = currentProduct.images[currentImageIndex];
    
    // 显示全屏查看器
    const viewer = document.getElementById('fullscreen-viewer');
    viewer.style.display = 'flex';
    
    // 添加active类以触发动画效果
    setTimeout(() => {
        viewer.classList.add('active');
    }, 10);
    
    // 添加键盘事件监听
    document.addEventListener('keydown', handleFullscreenKeydown);
}

// 关闭全屏图片查看器
function closeFullImage() {
    // 获取全屏查看器元素
    const viewer = document.getElementById('fullscreen-viewer');
    
    // 移除active类以触发关闭动画
    viewer.classList.remove('active');
    
    // 延迟隐藏全屏查看器，等待动画完成
    setTimeout(() => {
        viewer.style.display = 'none';
    }, 300);
    
    // 移除键盘事件监听
    document.removeEventListener('keydown', handleFullscreenKeydown);
}

// 切换图片
function changeImage(direction, context = 'modal') {
    if (!currentProduct) return;
    
    // 计算新的图片索引
    const imagesCount = currentProduct.images.length;
    let newIndex = currentImageIndex + direction;
    
    // 循环导航
    if (newIndex < 0) newIndex = imagesCount - 1;
    if (newIndex >= imagesCount) newIndex = 0;
    
    // 更新当前图片索引
    currentImageIndex = newIndex;
    
    if (context === 'modal') {
        // 更新模态框中的图片
        selectImage(newIndex);
    } else if (context === 'fullscreen') {
        // 更新全屏查看器中的图片
        document.getElementById('fullscreen-image').src = currentProduct.images[newIndex];
    }
}

// 添加搜索框回车键支持
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded');
    
    // 搜索框回车键支持
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                searchProducts();
            }
        });
    }
    
    // 注意：产品卡片点击事件现在由changePage函数动态添加
    // 不再需要在这里为静态卡片添加事件监听器
});

// 下载产品功能
function downloadProduct() {
    if (!currentProduct) return;
    
    // 根据产品ID跳转到不同的下载链接
    const downloadLinks = {
        1: "https://pan.baidu.com/s/1Mc6QdViR18hpxDwVqgK3xA?pwd",
        2: "https://pan.baidu.com/s/1pUtYGNNwyKGQZmSNdFh8kw",
        3: "https://example.com/download/product3",
        4: "https://example.com/download/product4",
        5: "https://example.com/download/product5",
        6: "https://example.com/download/product6",
        7: "https://example.com/download/product7",
        8: "https://example.com/download/product8"
    };
    
    const downloadUrl = downloadLinks[currentProduct.id] || "https://example.com/download";
    window.open(downloadUrl, '_blank');
}

// 收藏功能
function addToFavorites() {
    if (!currentProduct) return;
    
    // 收藏链接
    const favoriteUrl = "https://example.com/favorites?product_id=" + currentProduct.id;
    window.open(favoriteUrl, '_blank');
}

// 分享功能
function shareProduct() {
    if (!currentProduct) return;
    
    // 分享链接
    const shareUrl = "https://example.com/share?product_id=" + currentProduct.id;
    window.open(shareUrl, '_blank');
}