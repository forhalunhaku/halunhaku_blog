// 增强功能模块
// 提供图片灯箱、代码高亮、滚动增强等功能

document.addEventListener('DOMContentLoaded', function() {
    // 图片灯箱功能
    initImageLightbox();
    
    // 代码高亮增强
    initCodeHighlight();
    
    // 平滑滚动增强
    initSmoothScroll();
    
    // 阅读进度条
    initReadingProgress();
    
    // 文章目录高亮
    initTocHighlight();
    
    // 主题切换（如果启用）
    initThemeToggle();
    
    // 性能优化
    initPerformanceOptimizations();
});

// 图片灯箱功能
function initImageLightbox() {
    const images = document.querySelectorAll('.post-content img');
    
    images.forEach(img => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', function() {
            openLightbox(this);
        });
    });
}

function openLightbox(img) {
    // 创建灯箱容器
    const lightbox = document.createElement('div');
    lightbox.className = 'image-lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-backdrop"></div>
        <div class="lightbox-content">
            <img src="${img.src}" alt="${img.alt || ''}">
            <button class="lightbox-close">&times;</button>
            <div class="lightbox-caption">${img.alt || ''}</div>
        </div>
    `;
    
    // 添加样式
    const style = document.createElement('style');
    style.textContent = `
        .image-lightbox {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.3s ease;
        }
        
        .lightbox-backdrop {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            cursor: pointer;
        }
        
        .lightbox-content {
            position: relative;
            max-width: 90%;
            max-height: 90%;
            animation: zoomIn 0.3s ease;
        }
        
        .lightbox-content img {
            max-width: 100%;
            max-height: 100%;
            border-radius: 8px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        }
        
        .lightbox-close {
            position: absolute;
            top: -40px;
            right: 0;
            background: none;
            border: none;
            color: white;
            font-size: 2rem;
            cursor: pointer;
            padding: 0.5rem;
            border-radius: 50%;
            transition: background 0.3s ease;
        }
        
        .lightbox-close:hover {
            background: rgba(255, 255, 255, 0.2);
        }
        
        .lightbox-caption {
            position: absolute;
            bottom: -40px;
            left: 0;
            right: 0;
            color: white;
            text-align: center;
            padding: 0.5rem;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes zoomIn {
            from { transform: scale(0.5); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(lightbox);
    document.body.style.overflow = 'hidden';
    
    // 关闭事件
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const backdrop = lightbox.querySelector('.lightbox-backdrop');
    
    [closeBtn, backdrop].forEach(element => {
        element.addEventListener('click', () => closeLightbox(lightbox, style));
    });
    
    // ESC键关闭
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            closeLightbox(lightbox, style);
            document.removeEventListener('keydown', handleEscape);
        }
    };
    document.addEventListener('keydown', handleEscape);
}

function closeLightbox(lightbox, style) {
    lightbox.style.animation = 'fadeOut 0.3s ease';
    setTimeout(() => {
        document.body.removeChild(lightbox);
        document.head.removeChild(style);
        document.body.style.overflow = '';
    }, 300);
}

// 代码高亮增强
function initCodeHighlight() {
    // 为代码块添加语言标签
    const codeBlocks = document.querySelectorAll('pre code');
    
    codeBlocks.forEach(code => {
        const pre = code.parentElement;
        const className = code.className;
        const match = className.match(/language-(\w+)/);
        
        if (match) {
            pre.setAttribute('data-language', match[1]);
        }
        
        // 添加行号（可选）
        if (pre.dataset.lineNumbers !== 'false') {
            addLineNumbers(code);
        }
    });
}

function addLineNumbers(code) {
    const lines = code.textContent.split('\n');
    const lineNumbersDiv = document.createElement('div');
    lineNumbersDiv.className = 'line-numbers';
    
    const codeDiv = document.createElement('div');
    codeDiv.className = 'code-content';
    codeDiv.innerHTML = code.innerHTML;
    
    lines.forEach((line, index) => {
        if (index < lines.length - 1 || line.trim()) {
            const lineNumber = document.createElement('span');
            lineNumber.className = 'line-number';
            lineNumber.textContent = index + 1;
            lineNumbersDiv.appendChild(lineNumber);
        }
    });
    
    code.parentElement.style.display = 'flex';
    code.parentElement.appendChild(lineNumbersDiv);
    code.parentElement.appendChild(codeDiv);
    code.style.display = 'none';
}

// 平滑滚动增强
function initSmoothScroll() {
    // 为所有内部链接添加平滑滚动
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const navHeight = document.querySelector('.navbar')?.offsetHeight || 0;
                const targetPosition = targetElement.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 阅读进度条
function initReadingProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.innerHTML = '<div class="progress-fill"></div>';
    
    const style = document.createElement('style');
    style.textContent = `
        .reading-progress {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 3px;
            background: rgba(0, 0, 0, 0.1);
            z-index: 1000;
            pointer-events: none;
        }
        
        .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
            width: 0%;
            transition: width 0.3s ease;
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(progressBar);
    
    const progressFill = progressBar.querySelector('.progress-fill');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressFill.style.width = Math.min(scrollPercent, 100) + '%';
    });
}

// 文章目录高亮
function initTocHighlight() {
    const tocLinks = document.querySelectorAll('.toc-list a');
    if (tocLinks.length === 0) return;
    
    const headings = Array.from(document.querySelectorAll('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]'));
    
    function updateActiveToc() {
        let activeHeading = null;
        const scrollTop = window.pageYOffset + 100;
        
        for (let i = headings.length - 1; i >= 0; i--) {
            if (headings[i].offsetTop <= scrollTop) {
                activeHeading = headings[i];
                break;
            }
        }
        
        tocLinks.forEach(link => link.classList.remove('active'));
        
        if (activeHeading) {
            const activeLink = document.querySelector(`.toc-list a[href="#${activeHeading.id}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    }
    
    window.addEventListener('scroll', updateActiveToc);
    updateActiveToc();
}

// 主题切换功能
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle) return;
    
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    themeToggle.addEventListener('click', () => {
        const newTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// 性能优化
function initPerformanceOptimizations() {
    // 图片懒加载观察器
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('img.lazy').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // 防抖滚动事件
    let scrollTimeout;
    const originalScrollHandlers = [];
    
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            originalScrollHandlers.forEach(handler => handler());
        }, 10);
    });
    
    // 预加载关键资源
    const preloadLink = document.createElement('link');
    preloadLink.rel = 'preload';
    preloadLink.href = '/search.json';
    preloadLink.as = 'fetch';
    preloadLink.crossOrigin = 'anonymous';
    document.head.appendChild(preloadLink);
}

// 工具函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// 添加CSS动画样式
const enhanceStyles = document.createElement('style');
enhanceStyles.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    .loaded {
        animation: fadeIn 0.5s ease;
    }
    
    .toc-list a.active {
        color: var(--primary-color);
        font-weight: 600;
        border-left: 3px solid var(--primary-color);
        padding-left: 1rem;
        background: rgba(102, 126, 234, 0.1);
    }
    
    .line-numbers {
        background: #f6f8fa;
        border-right: 1px solid #e1e4e8;
        padding: 1rem 0.5rem;
        user-select: none;
        min-width: 3rem;
        text-align: right;
        color: #6a737d;
    }
    
    .line-number {
        display: block;
        line-height: 1.6;
        font-size: 0.8rem;
    }
    
    .code-content {
        flex: 1;
        padding: 1rem;
        overflow-x: auto;
    }
`;

document.head.appendChild(enhanceStyles);

console.log('✨ 博客增强功能已加载');