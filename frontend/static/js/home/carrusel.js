document.addEventListener('DOMContentLoaded', () => {
    const swiper = new Swiper('.swiper', {
        direction: 'horizontal',
        loop: true,
        speed: 400,
        autoplay: true,
        parallax: true,


        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
        }
    });
})