$(document).ready(function () {
    const $carousel = $("#logoCarousel");
    let startX = 0;
    let endX = 0;

    // Khi bắt đầu chạm
    $carousel.on("touchstart", function (e) {
        startX = e.originalEvent.touches[0].clientX;
    });

    // Khi kết thúc vuốt
    $carousel.on("touchmove", function (e) {
        endX = e.originalEvent.touches[0].clientX;
    });

    // Khi ngón tay rời màn hình
    $carousel.on("touchend", function () {
        const diffX = startX - endX;

        if (Math.abs(diffX) > 50) {
            // Vuốt > 50px
            if (diffX > 0) {
                // Vuốt sang trái
                $carousel.carousel("next");
            } else {
                // Vuốt sang phải
                $carousel.carousel("prev");
            }
        }
    });
});

// Chọn phần tử container logo
const track = document.querySelector(".logo-track");
const logos = track.innerHTML;

// Nhân đôi nội dung để lấp đầy không gian
track.innerHTML += logos;

////////////////// ANIMATION COUNTER //////////////////
$(document).ready(function () {
    function animateCounter(selector, start, end, step, totalTime) {
        let currentValue = start;
        const delay = totalTime / ((end - start) / step); // Calculate delay based on totalTime

        const interval = setInterval(() => {
            currentValue += step;
            if (currentValue >= end) {
                currentValue = end;
                clearInterval(interval);
            }

            // Format number with commas and add "+"
            const formattedValue = currentValue.toLocaleString() + "+";
            $(selector).html(`<span>${formattedValue}</span>`);
        }, delay);
    }

    // Counter 1: 0 -> 250 in 2 seconds
    animateCounter("#counter1 span", 0, 250, 1, 2000);

    // Counter 2: 0 -> 2500 in 2 seconds
    animateCounter("#counter2 span", 0, 2500, 10, 2000);
});
