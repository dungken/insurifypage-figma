// Hàm kiểm tra xem phần tử có trong viewport hay không
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
            (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <=
            (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Hàm đếm số (counter animation)
function runCounter(counter) {
    const target = +counter.getAttribute("data-target");
    const speed = 500; // Tăng giá trị này để làm cho số nhảy chậm hơn
    let current = 0;

    const increment = Math.ceil(target / speed);

    const updateCount = () => {
        if (current < target) {
            current += increment;
            if (current > target) current = target; // Đảm bảo không vượt quá giá trị mục tiêu
            counter.innerText = new Intl.NumberFormat().format(current) + "+"; // Thêm dấu "+"
            setTimeout(updateCount, 10); // Điều chỉnh độ trễ giữa các lần cập nhật
        }
    };

    updateCount();
}

// Reset counter về giá trị ban đầu
function resetCounter(counter) {
    counter.innerText = "0";
    counter.classList.remove("counted"); // Cho phép counter được chạy lại
}

// Lắng nghe sự kiện scroll
window.addEventListener("scroll", () => {
    const counters = document.querySelectorAll(".counter");
    counters.forEach((counter) => {
        if (isInViewport(counter)) {
            // Nếu phần tử có trong viewport, chạy counter
            if (!counter.classList.contains("counted")) {
                counter.classList.add("counted");
                runCounter(counter);
            }
        } else {
            // Nếu phần tử không có trong viewport, reset counter
            resetCounter(counter);
        }
    });
});

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

function toggleFeature(featureId) {
    const featureDescription = document.getElementById(`feature-${featureId}`);
    const parentBox = featureDescription.closest(".feature-box");
    const buttonDown = parentBox.querySelector(".button-down"); // Lấy button-down bên trong box hiện tại
    const isVisible = !featureDescription.classList.contains("d-none");

    // Ẩn tất cả nội dung mô tả và hiển thị lại mũi tên cho các box khác
    document
        .querySelectorAll(".insurify-description")
        .forEach((desc) => desc.classList.add("d-none"));
    document
        .querySelectorAll(".button-down")
        .forEach((btn) => btn.classList.remove("d-none"));
    document
        .querySelectorAll(".feature-box")
        .forEach((box) => box.classList.remove("active"));

    // Nếu box hiện tại chưa hiển thị nội dung
    if (!isVisible) {
        featureDescription.classList.remove("d-none"); // Hiển thị nội dung
        buttonDown.classList.add("d-none"); // Ẩn mũi tên
        parentBox.classList.add("active"); // Thêm hiệu ứng active
    }
}
