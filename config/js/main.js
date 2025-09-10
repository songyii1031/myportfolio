    // Enhanced Smooth Scrolling with Easing
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                smoothScrollTo(target);
            }
        });
    });

    // Custom smooth scroll function with easing
    function smoothScrollTo(target) {
        const targetPosition = target.offsetTop - 80; // 네비게이션 높이 고려
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 1000; // 1초
        let start = null;

        // Easing function (easeInOutCubic)
        function easeInOutCubic(t) {
            return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
        }

        function animation(currentTime) {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const progress = Math.min(timeElapsed / duration, 1);
            const ease = easeInOutCubic(progress);
            
            window.scrollTo(0, startPosition + distance * ease);
            
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        }

        requestAnimationFrame(animation);
    }


    // Initialize all functionality
    document.addEventListener('DOMContentLoaded', function() {
   
        // Initialize about contact visibility
        initAboutContactVisibility();
        
        // Initialize contact section interactions
        initContactInteractions();
        
        // Initialize projects slider
        initProjectsSlider();
    });
 
 

    // About contact visibility control
    function initAboutContactVisibility() {
        const aboutSection = document.getElementById('about');
        const aboutContact = document.getElementById('about-contact');

        if (!aboutSection || !aboutContact) return;

        // 초기 상태
        aboutContact.style.transition = 'opacity 0.4s';
        aboutContact.style.opacity = 1;

        // Intersection Observer로 about 섹션이 화면에 보일 때만 표시
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        aboutContact.style.opacity = 1;
                        aboutContact.style.pointerEvents = 'auto';
                    } else {
                        aboutContact.style.opacity = 0;
                        aboutContact.style.pointerEvents = 'none';
                    }
                });
            },
            {
                threshold: 0.3 // about 섹션이 30% 이상 보이면 표시
            }
        );
        observer.observe(aboutSection);
    }

    // Contact section interactions
    function initContactInteractions() {
        // CTA 버튼 클릭 이벤트
        const ctaButton = document.querySelector('.contact-cta-button');
        if (ctaButton) {
            ctaButton.addEventListener('click', function() {
                // 부드러운 애니메이션과 함께 클릭 효과
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1.05)';
                }, 150);
                
                // 연락처 정보로 스크롤
                const contactInfo = document.querySelector('.contact-info-container');
                if (contactInfo) {
                    contactInfo.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }
            });
        }

        // 연락처 정보 아이템 호버 효과 강화
        const contactItems = document.querySelectorAll('.contact-info-item');
        contactItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                // 아이콘 회전 효과
                const icon = this.querySelector('.contact-icon');
                if (icon) {
                    icon.style.transform = 'rotate(6deg) scale(1.1)';
                }
                
                // 배경 효과 활성화
                const bgEffect = this.querySelector('.contact-info-bg-effect');
                if (bgEffect) {
                    bgEffect.style.transform = 'skewX(-12deg) translateX(-100%)';
                }
                
                // 인디케이터 표시
                const indicator = this.querySelector('.contact-info-indicator');
                if (indicator) {
                    indicator.style.opacity = '1';
                }
            });

            item.addEventListener('mouseleave', function() {
                // 아이콘 원래 상태로 복원
                const icon = this.querySelector('.contact-icon');
                if (icon) {
                    icon.style.transform = 'rotate(0deg) scale(1)';
                }
                
                // 배경 효과 비활성화
                const bgEffect = this.querySelector('.contact-info-bg-effect');
                if (bgEffect) {
                    bgEffect.style.transform = 'skewX(-12deg) translateX(100%)';
                }
                
                // 인디케이터 숨김
                const indicator = this.querySelector('.contact-info-indicator');
                if (indicator) {
                    indicator.style.opacity = '0';
                }
            });
        });

        // 연락처 링크 클릭 시 피드백
        const contactLinks = document.querySelectorAll('.contact-info-value-link');
        contactLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // 클릭 효과
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
                
                // 외부 링크인 경우 새 탭에서 열기 확인
                if (this.getAttribute('target') === '_blank') {
                    e.preventDefault();
                    const url = this.getAttribute('href');
                    if (confirm('새 탭에서 링크를 열까요?')) {
                        window.open(url, '_blank', 'noopener,noreferrer');
                    }
                }
            });
        });

        // 떠다니는 장식 요소들 애니메이션 강화
        const decorations = document.querySelectorAll('.contact-decoration');
        decorations.forEach((decoration, index) => {
            // 마우스 움직임에 따른 반응
            document.addEventListener('mousemove', function(e) {
                const rect = decoration.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                const deltaX = (e.clientX - centerX) * 0.1;
                const deltaY = (e.clientY - centerY) * 0.1;
                
                decoration.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
            });
        });

        // Contact 섹션 진입 시 애니메이션
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            const contactObserver = new IntersectionObserver(
                (entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            // 연락처 아이템들을 순차적으로 나타나게 하기
                            const contactItems = entry.target.querySelectorAll('.contact-info-item');
                            contactItems.forEach((item, index) => {
                                setTimeout(() => {
                                    item.style.opacity = '0';
                                    item.style.transform = 'translateY(30px)';
                                    item.style.transition = 'all 0.6s ease';
                                    
                                    setTimeout(() => {
                                        item.style.opacity = '1';
                                        item.style.transform = 'translateY(0)';
                                    }, 100);
                                }, index * 200);
                            });
                            
                            // CTA 버튼 애니메이션
                            const ctaButton = entry.target.querySelector('.contact-cta-button');
                            if (ctaButton) {
                                setTimeout(() => {
                                    ctaButton.style.opacity = '0';
                                    ctaButton.style.transform = 'translateY(20px) scale(0.9)';
                                    ctaButton.style.transition = 'all 0.8s ease';
                                    
                                    setTimeout(() => {
                                        ctaButton.style.opacity = '1';
                                        ctaButton.style.transform = 'translateY(0) scale(1)';
                                    }, 100);
                                }, contactItems.length * 200 + 300);
                            }
                        }
                    });
                },
                { threshold: 0.3 }
            );
            
            contactObserver.observe(contactSection);
        }
    }

    // Projects Carousel functionality - scrollTo 기반
    function initProjectsSlider() {
        const track = document.querySelector('.projects-carousel');
        const cards = Array.from(document.querySelectorAll('.project-card-carousel'));
 

        // 처음 활성 카드 찾기(마크업에 active가 이미 1번 카드에 있음)
        let currentIndex = Math.max(0, cards.findIndex(c => c.classList.contains('active')));
        if (currentIndex === -1) currentIndex = 0;

        let isAnimating = false;
        const ANIM_MS = 600;

        // 활성 클래스 업데이트
        function setActive(index) {
            cards.forEach(c => c.classList.remove('active'));
            cards[index].classList.add('active');
            currentIndex = index;
        }

        // 선택 카드가 컨테이너 중앙에 오도록 스크롤
        function centerCard(index, smooth = true) {
            const card = cards[index];
            if (!card) return;

            const containerWidth = track.clientWidth;
            const cardWidth = card.offsetWidth;
            // 카드의 왼쪽 기준 위치 (트랙 기준)
            const cardLeft = card.offsetLeft;

            // 컨테이너 중앙 - 카드의 반 너비만큼 보정
            const targetScrollLeft = cardLeft - (containerWidth / 2 - cardWidth / 2);

            isAnimating = true;
            track.scrollTo({ left: targetScrollLeft, behavior: smooth ? 'smooth' : 'auto' });
            setActive(index);

            // 애니메이션 플래그 해제
            window.clearTimeout(centerCard._t);
            centerCard._t = window.setTimeout(() => (isAnimating = false), ANIM_MS);
        }

        function nextCard() {
            const nextIndex = (currentIndex + 1) % cards.length;
            centerCard(nextIndex);
        }

        function prevCard() {
            const prevIndex = (currentIndex - 1 + cards.length) % cards.length;
            centerCard(prevIndex);
        }
 
        // 카드 클릭 -> 그 카드 중앙으로
        cards.forEach((card, index) => {
            card.addEventListener('click', () => {
                if (index !== currentIndex) centerCard(index);
            });
        });

        // 키보드 네비게이션 (섹션이 화면에 있을 때만)
        document.addEventListener('keydown', (e) => {
            const projectsSection = document.getElementById('projects');
            if (!projectsSection) return;
            const rect = projectsSection.getBoundingClientRect();
            const isInView = rect.top < window.innerHeight && rect.bottom > 0;
            if (!isInView) return;

            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                prevCard();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                nextCard();
            }
        });

        // 스크롤 중 중앙에 가장 가까운 카드로 active 동기화
        let scrollTicking = false;
        track.addEventListener('scroll', () => {
            if (scrollTicking) return;
            scrollTicking = true;
            window.requestAnimationFrame(() => {
                const containerCenter = track.scrollLeft + track.clientWidth / 2;

                let closestIndex = 0;
                let minDist = Infinity;
                cards.forEach((card, i) => {
                    const cardCenter = card.offsetLeft + card.offsetWidth / 2;
                    const dist = Math.abs(cardCenter - containerCenter);
                    if (dist < minDist) {
                        minDist = dist;
                        closestIndex = i;
                    }
                });

                // 스크롤로도 active 상태를 최신화 (애니메이션 중에는 건너뛰어도 됨)
                if (!isAnimating && closestIndex !== currentIndex) {
                    setActive(closestIndex);
                }
                scrollTicking = false;
            });
        });

        // 초기 위치 (현재 active 배치)
        centerCard(currentIndex, /* smooth= */ false);

        // 프로젝트 버튼 클릭 효과/동작 (그대로 유지)
        const projectBtns = document.querySelectorAll('.project-btn');
        projectBtns.forEach(btn => {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();

                this.style.transform = 'scale(0.95)';
                setTimeout(() => { this.style.transform = 'scale(1)'; }, 150);

                const btnTextEl = this.querySelector('.btn-text');
                const btnText = btnTextEl ? btnTextEl.textContent.trim() : '';

                if (btnText === 'Live Demo') {
                    alert('데모 페이지로 이동합니다!');
                } else if (btnText === 'GitHub') {
                    alert('GitHub 저장소로 이동합니다!');
                }
            });
        });

        // 반응형: 리사이즈 시에도 중앙 유지
        window.addEventListener('resize', () => centerCard(currentIndex, false));
    }