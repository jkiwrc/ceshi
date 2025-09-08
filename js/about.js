// about.js - 关于页面的JavaScript功能

// 爬虫脚本数据
const scripts = [
    { 
        id: 1, 
        title: "抖音无高频无水印下载", 
        description: "抖音无高频无水印下载", 
        category: "脚本应用程序",
        price: "¥ 150.00",
        images: ["../images/10.1.png", "../images/10.2.png"]
    },
    { 
        id: 2, 
        title: "tiktok无水印下载", 
        description: "tiktok无水印下载", 
        category: "脚本应用程序",
        price: "¥ 200.00",
        images: ["../images/11.1.png", "../images/11.2.png"]
    }
];

// 全局变量
let currentPage = 0;
let currentScript = null;
let currentImageIndex = 0;
const scriptsPerPage = 8; // 每页显示的脚本数量

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    console.log('关于页面加载完成');
    
    // 初始化搜索功能
    initSearch();
    
    // 初始化分页
    changePage(0);
});

// 初始化搜索功能
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        // 添加回车键搜索支持
        searchInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                searchScripts();
            }
        });
    }
    
    // 覆盖搜索按钮的点击事件
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
        searchBtn.onclick = function(event) {
            event.preventDefault();
            searchScripts();
        };
    }
}

// 搜索脚本功能
function searchScripts() {
    console.log('搜索脚本函数被调用');
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    console.log('搜索关键词:', searchTerm);
    
    if (searchTerm === '') {
        alert('请输入搜索关键词');
        return;
    }
    
    // 在当前页面搜索脚本
    const filteredScripts = scripts.filter(script => {
        return script.title.toLowerCase().includes(searchTerm) || 
               script.description.toLowerCase().includes(searchTerm) || 
               script.category.toLowerCase().includes(searchTerm);
    });
    
    console.log('搜索结果数量:', filteredScripts.length);
    console.log('搜索结果:', filteredScripts);
    
    // 显示搜索结果信息
    const productGrid = document.querySelector('.product-grid');
    if (productGrid) {
        if (filteredScripts.length === 0) {
            // 没有找到匹配的脚本
            productGrid.innerHTML = `
                <div class="search-result-info">
                    <span>未找到与 "${searchTerm}" 相关的脚本</span>
                    <button onclick="resetSearch()">重置搜索</button>
                </div>
            `;
        } else {
            // 显示搜索结果
            productGrid.innerHTML = `
                <div class="search-result-info">
                    <span>找到 ${filteredScripts.length} 个与 "${searchTerm}" 相关的脚本</span>
                    <button onclick="resetSearch()">重置搜索</button>
                </div>
            `;
            
            // 显示搜索结果
            filteredScripts.forEach(script => {
                const card = document.createElement('div');
                card.className = 'product-card';
                card.setAttribute('data-script-id', script.id);
                card.onclick = function() { showScriptDetails(script.id); };
                
                card.innerHTML = `
                    <div class="card-image-container">
                        <img src="${script.images[0]}" alt="${script.title}">
                    </div>
                    <h3>${script.title}</h3>
                `;
                
                productGrid.appendChild(card);
            });
        }
    }
}

// 重置搜索
function resetSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.value = '';
    }
    changePage(0); // 重置到第一页
}

// 分页功能
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
    const totalPages = Math.ceil(scripts.length / scriptsPerPage);
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
    
    // 计算当前页的脚本范围
    const start = currentPage * scriptsPerPage;
    const end = Math.min(start + scriptsPerPage, scripts.length);
    console.log('Displaying scripts from index', start, 'to', end - 1);
    
    // 获取产品网格容器
    const productGrid = document.querySelector('.product-grid');
    if (productGrid) {
        console.log('Found product grid, clearing and adding new cards');
        productGrid.innerHTML = '';
        
        // 显示当前页的脚本
        for (let i = start; i < end; i++) {
            const script = scripts[i];
            if (script) {
                console.log('Creating card for script:', script.id, script.title);
                
                const card = document.createElement('div');
                card.className = 'product-card';
                card.setAttribute('data-script-id', script.id);
                card.onclick = function() { showScriptDetails(script.id); };
                
                card.innerHTML = `
                    <div class="card-image-container">
                        <img src="${script.images[0]}" alt="${script.title}">
                    </div>
                    <h3>${script.title}</h3>
                `;
                
                productGrid.appendChild(card);
            }
        }
        
        // 如果当前页的脚本数量不足，添加空卡片占位
        const cardsToAdd = scriptsPerPage - (end - start);
        for (let i = 0; i < cardsToAdd; i++) {
            const emptyCard = document.createElement('div');
            emptyCard.className = 'product-card empty-card';
            productGrid.appendChild(emptyCard);
        }
    }
}

// 显示脚本详情
function showScriptDetails(scriptId) {
    console.log('显示脚本详情，ID:', scriptId);
    
    // 查找脚本数据
    currentScript = scripts.find(s => s.id === scriptId);
    if (!currentScript) {
        console.error('未找到脚本，ID:', scriptId);
        return;
    }
    
    // 设置模态框内容
    document.getElementById('modal-title').textContent = currentScript.title;
    document.getElementById('modal-description').textContent = currentScript.description;
    document.getElementById('script-id-value').textContent = currentScript.id;
    document.getElementById('script-category-value').textContent = currentScript.category;
    document.getElementById('script-price').textContent = currentScript.price;
    
    // 设置主图片
    const mainImage = document.getElementById('modal-image');
    mainImage.src = currentScript.images[0];
    currentImageIndex = 0;
    
    // 设置缩略图
    const thumbnailsContainer = document.getElementById('thumbnails');
    if (thumbnailsContainer) {
        thumbnailsContainer.innerHTML = '';
        currentScript.images.forEach((img, index) => {
            const thumb = document.createElement('div');
            thumb.className = 'thumbnail' + (index === 0 ? ' active' : '');
            thumb.onclick = () => selectImage(index);
            
            const thumbImg = document.createElement('img');
            thumbImg.src = img;
            thumbImg.alt = `缩略图 ${index + 1}`;
            
            thumb.appendChild(thumbImg);
            thumbnailsContainer.appendChild(thumb);
        });
    }
    
    // 显示模态框
    const modal = document.getElementById('script-modal');
    modal.style.display = 'block';
    
    // 添加动画效果
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
    
    // 添加键盘事件监听
    document.addEventListener('keydown', handleModalKeydown);
}

// 关闭模态框
function closeModal() {
    // 获取模态框元素
    const modal = document.getElementById('script-modal');
    
    // 移除active类以触发关闭动画
    modal.classList.remove('active');
    
    // 延迟隐藏模态框，等待动画完成
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
    
    // 移除键盘事件监听
    document.removeEventListener('keydown', handleModalKeydown);
    
    // 重置当前脚本
    currentScript = null;
}

// 处理模态框键盘事件
function handleModalKeydown(e) {
    if (e.key === 'Escape') {
        closeModal();
    } else if (e.key === 'ArrowLeft') {
        navigateImages('prev');
    } else if (e.key === 'ArrowRight') {
        navigateImages('next');
    }
}

// 选择图片
function selectImage(index) {
    if (!currentScript || !currentScript.images || index >= currentScript.images.length) return;
    
    currentImageIndex = index;
    const mainImage = document.getElementById('modal-image');
    mainImage.src = currentScript.images[index];
    
    // 更新缩略图激活状态
    const thumbnails = document.querySelectorAll('#thumbnails .thumbnail');
    thumbnails.forEach((thumb, i) => {
        if (i === index) {
            thumb.classList.add('active');
        } else {
            thumb.classList.remove('active');
        }
    });
}

// 导航图片
function navigateImages(direction) {
    if (!currentScript || !currentScript.images || currentScript.images.length <= 1) return;
    
    let newIndex;
    if (direction === 'next') {
        newIndex = (currentImageIndex + 1) % currentScript.images.length;
    } else {
        newIndex = (currentImageIndex - 1 + currentScript.images.length) % currentScript.images.length;
    }
    
    selectImage(newIndex);
}

// 下载脚本功能
function downloadScript() {
    if (!currentScript) return;
    
    alert(`即将下载脚本: ${currentScript.title}\n请联系客服获取下载链接。`);
}

// 申请演示功能
function requestDemo() {
    if (!currentScript) return;
    
    alert(`您已申请脚本演示: ${currentScript.title}\n我们的客服将在24小时内与您联系。`);
}