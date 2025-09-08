// contact.js - 联系页面的JavaScript功能

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    console.log('联系页面加载完成');
    
    // 初始化搜索功能
    initSearch();
    
    // 初始化施工中文字的炫酷效果
    initConstructionEffect();
    
    // 为将来可能添加的联系表单预留初始化代码
    // initContactForm();
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

// 初始化施工中文字的炫酷效果
function initConstructionEffect() {
    const constructionText = document.querySelector('.construction-text');
    if (constructionText) {
        // 自动播放动画，无需鼠标悬停事件
        
        // 点击文字触发特殊效果
        constructionText.addEventListener('click', function() {
            // 创建爆炸效果
            createExplosionEffect(this);
        });
        
        // 定时改变文字颜色和阴影，增强动画效果
        setInterval(() => {
            const hue = Math.floor(Math.random() * 360);
            const shadowColor = `hsla(${hue}, 100%, 50%, 0.8)`;
            constructionText.style.textShadow = `0 0 20px ${shadowColor}, 0 0 30px ${shadowColor}`;
            
            // 2秒后恢复原样，与CSS动画配合
            setTimeout(() => {
                constructionText.style.textShadow = '';
            }, 2000);
        }, 4000);
    }
}

// 创建点击爆炸效果
function createExplosionEffect(element) {
    // 获取元素位置
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // 创建20个粒子
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        document.body.appendChild(particle);
        
        // 设置粒子样式
        particle.style.position = 'fixed';
        particle.style.width = '10px';
        particle.style.height = '10px';
        particle.style.borderRadius = '50%';
        particle.style.backgroundColor = `hsl(${Math.random() * 60 + 200}, 100%, 50%)`;
        particle.style.left = `${centerX}px`;
        particle.style.top = `${centerY}px`;
        particle.style.pointerEvents = 'none';
        
        // 随机方向和速度
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 100 + 50;
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed;
        
        // 动画
        const startTime = Date.now();
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const duration = 1000; // 1秒
            
            if (elapsed < duration) {
                const progress = elapsed / duration;
                const x = centerX + vx * progress;
                const y = centerY + vy * progress - 200 * progress * progress; // 添加重力效果
                const scale = 1 - progress;
                
                particle.style.left = `${x}px`;
                particle.style.top = `${y}px`;
                particle.style.opacity = 1 - progress;
                particle.style.transform = `scale(${scale})`;
                
                requestAnimationFrame(animate);
            } else {
                document.body.removeChild(particle);
            }
        };
        
        requestAnimationFrame(animate);
    }
    
    // 添加震动效果
    element.style.animation = 'none';
    element.offsetHeight; // 触发重排
    element.style.animation = 'autoPlayEffect 8s linear infinite';
    
    // 添加闪烁效果
    let flashCount = 0;
    const flashInterval = setInterval(() => {
        if (flashCount >= 5) {
            clearInterval(flashInterval);
            return;
        }
        
        element.style.opacity = flashCount % 2 === 0 ? '0.2' : '1';
        flashCount++;
    }, 100);
    
    // 恢复正常
    setTimeout(() => {
        element.style.opacity = '1';
    }, 600);
}

// 为将来可能添加的联系表单预留验证函数
/*
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            if (validateForm()) {
                // 模拟表单提交
                alert('表单提交成功！我们会尽快与您联系。');
                contactForm.reset();
            }
        });
    }
}

function validateForm() {
    let isValid = true;
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    
    // 简单验证
    if (!name.value.trim()) {
        alert('请输入您的姓名');
        name.focus();
        isValid = false;
    } else if (!email.value.trim()) {
        alert('请输入您的邮箱');
        email.focus();
        isValid = false;
    } else if (!validateEmail(email.value)) {
        alert('请输入有效的邮箱地址');
        email.focus();
        isValid = false;
    } else if (!message.value.trim()) {
        alert('请输入您的留言');
        message.focus();
        isValid = false;
    }
    
    return isValid;
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}
*/