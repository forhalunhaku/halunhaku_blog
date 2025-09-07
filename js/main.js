// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 导航栏相关功能
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // 移动端菜单切换
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // 点击导航链接关闭移动端菜单
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // 平滑滚动功能（只对锡点链接）
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // 只对锁点链接（以#开头）应用平滑滚动
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                
                if (targetSection) {
                    const navHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetSection.offsetTop - navHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
            // 对于普通链接（如/search/），让浏览器正常处理
        });
    });

    // CTA按钮平滑滚动到博客部分
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            const blogSection = document.querySelector('#blog');
            if (blogSection) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = blogSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }

    // 导航栏滚动效果
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });

    // 博客卡片悬停效果增强
    const blogCards = document.querySelectorAll('.blog-card');
    blogCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // 技能标签动画
    const skillTags = document.querySelectorAll('.skill-tag');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const tags = entry.target.querySelectorAll('.skill-tag');
                tags.forEach((tag, index) => {
                    setTimeout(() => {
                        tag.style.opacity = '0';
                        tag.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            tag.style.transition = 'all 0.5s ease';
                            tag.style.opacity = '1';
                            tag.style.transform = 'translateY(0)';
                        }, 50);
                    }, index * 100);
                });
                skillObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const skillsContainer = document.querySelector('.skills');
    if (skillsContainer) {
        skillObserver.observe(skillsContainer);
    }

    // 浮动卡片动画
    const floatingCards = document.querySelectorAll('.floating-card');
    floatingCards.forEach((card, index) => {
        card.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
            this.style.transform = 'scale(1.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
            this.style.transform = 'scale(1)';
        });
    });

    // 表单提交处理
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            // 简单的表单验证
            if (!name || !email || !message) {
                showNotification('请填写所有必填字段', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('请输入有效的邮箱地址', 'error');
                return;
            }
            
            // 模拟表单提交
            const submitButton = this.querySelector('.submit-button');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = '发送中...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                showNotification('消息发送成功！我会尽快回复您。', 'success');
                this.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }

    // 阅读更多按钮点击事件
    const readMoreLinks = document.querySelectorAll('.read-more');
    readMoreLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('文章详情页面正在开发中...', 'info');
        });
    });

    // 社交媒体链接点击事件
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.querySelector('i').classList.contains('fa-github') ? 'GitHub' :
                           this.querySelector('i').classList.contains('fa-twitter') ? 'Twitter' :
                           this.querySelector('i').classList.contains('fa-linkedin') ? 'LinkedIn' : '邮箱';
            showNotification(`${platform}链接正在准备中...`, 'info');
        });
    });

    // 滚动显示动画
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.blog-card, .about-content, .contact-content');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // 初始化滚动动画
    const scrollElements = document.querySelectorAll('.blog-card, .about-content, .contact-content');
    scrollElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
    });

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // 初始检查

    // 工具函数
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showNotification(message, type = 'info') {
        // 创建通知元素
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // 设置样式
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            font-weight: 500;
            max-width: 300px;
        `;
        
        document.body.appendChild(notification);
        
        // 显示动画
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // 自动隐藏
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // 打字机效果（可选）
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // 页面加载完成后的欢迎效果
    setTimeout(() => {
        showNotification('欢迎来到我的个人博客！', 'success');
    }, 1000);

    // 添加页面可见性变化监听
    document.addEventListener('visibilitychange', function() {
        if (document.visibilityState === 'visible') {
            // 页面重新可见时的效果
            const title = document.querySelector('.hero-title');
            if (title) {
                title.style.animation = 'fadeInUp 1s ease-out';
            }
        }
    });

    // 全局搜索快捷键 (Ctrl/Cmd + K)
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            // 如果在搜索页面，直接聚焦搜索框
            const searchInput = document.getElementById('search-input');
            if (searchInput) {
                searchInput.focus();
                return;
            }
            
            // 否则跳转到搜索页面
            window.location.href = '/search/';
        }
        
        // ESC键关闭搜索或移动端菜单
        if (e.key === 'Escape') {
            const searchInput = document.getElementById('search-input');
            if (searchInput && document.activeElement === searchInput) {
                searchInput.blur();
            }
            
            // 关闭移动端菜单
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // 回到顶部按钮功能
    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.style.display = 'flex';
                backToTopButton.style.opacity = '1';
            } else {
                backToTopButton.style.opacity = '0';
                setTimeout(() => {
                    if (window.pageYOffset <= 300) {
                        backToTopButton.style.display = 'none';
                    }
                }, 300);
            }
        });
        
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 图片懒加载功能
    const lazyImages = document.querySelectorAll('img.lazy');
    if (lazyImages.length > 0) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // 代码复制功能
    window.copyCode = function(button) {
        const codeBlock = button.nextElementSibling.querySelector('code');
        if (codeBlock) {
            const text = codeBlock.innerText || codeBlock.textContent;
            
            navigator.clipboard.writeText(text).then(() => {
                const originalText = button.innerHTML;
                button.innerHTML = '<i class="fas fa-check"></i>';
                button.style.color = '#10b981';
                
                setTimeout(() => {
                    button.innerHTML = originalText;
                    button.style.color = '';
                }, 2000);
                
                showNotification('代码已复制到剪贴板', 'success');
            }).catch(err => {
                console.error('复制失败:', err);
                showNotification('复制失败，请手动选择复制', 'error');
            });
        }
    };

    // 文章目录功能（如果存在）
    const tocElements = document.querySelectorAll('.toc-list a');
    if (tocElements.length > 0) {
        tocElements.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const navHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetElement.offsetTop - navHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // 高亮当前标题
                    document.querySelectorAll('.toc-list a').forEach(a => a.classList.remove('active'));
                    this.classList.add('active');
                }
            });
        });
        
        // 滚动时自动高亮目录
        window.addEventListener('scroll', function() {
            const headings = document.querySelectorAll('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]');
            let activeHeading = null;
            
            headings.forEach(heading => {
                const rect = heading.getBoundingClientRect();
                if (rect.top <= 100 && rect.bottom >= 0) {
                    activeHeading = heading;
                }
            });
            
            if (activeHeading) {
                document.querySelectorAll('.toc-list a').forEach(a => a.classList.remove('active'));
                const activeLink = document.querySelector(`.toc-list a[href="#${activeHeading.id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }

    console.log('🎉 个人博客前端UI加载完成！');
    console.log('✨ 特色功能：');
    console.log('   - 响应式设计');
    console.log('   - 平滑滚动');
    console.log('   - 动画效果');
    console.log('   - 交互式表单');
    console.log('   - 现代化UI设计');
});