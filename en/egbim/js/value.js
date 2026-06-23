document.addEventListener('DOMContentLoaded', (event)=> {

    // ---------------------------------------------
    // 주요기능의 라인 애니, 카드 애니
    // 사용 클래스 : js__ani
    // ---------------------------------------------
    let hasAnimationRun = false;
    const featuresAni = document.querySelector('.js__ani');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: [0, 0.7] // Observe both 0% and 70% visibility
    };
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (!hasAnimationRun && entry.intersectionRatio >= 0.7) {
                featuresAni.classList.add('card_ani');
                featuresAni.querySelector('.lines').classList.add('move_ani');
                setTimeout(() => {
                    featuresAni.classList.remove('card_ani');
                }, 1200);
                hasAnimationRun = true; 
                observer.unobserve(featuresAni);
            }
        });
    };
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    observer.observe(featuresAni);

   
})
