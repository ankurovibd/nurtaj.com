const track = document.querySelector('.slider-track');
        let startIndex = 0;
        let slides = Array.from(track.children);
        let slideWidth = slides[0].getBoundingClientRect().width + 40; // image width + 20px gap on both sides
        let position = 0;

        function moveToNextSlide() {
            startIndex++;
            if (startIndex >= slides.length) {
                startIndex = 0;
            }
            position = -slideWidth * startIndex;
            track.style.transform = `translateX(${position}px)`;
        }

        function moveToPrevSlide() {
            startIndex--;
            if (startIndex < 0) {
                startIndex = slides.length - 1;
            }
            position = -slideWidth * startIndex;
            track.style.transform = `translateX(${position}px)`;
        }

        setInterval(moveToNextSlide, 3000);

        let isDragging = false;
        let startPos = 0;
        let currentTranslate = 0;
        let prevTranslate = 0;

        track.addEventListener('mousedown', dragStart);
        track.addEventListener('mousemove', dragMove);
        track.addEventListener('mouseup', dragEnd);
        track.addEventListener('mouseleave', dragEnd);
        track.addEventListener('touchstart', dragStart);
        track.addEventListener('touchmove', dragMove);
        track.addEventListener('touchend', dragEnd);

        function dragStart(event) {
            isDragging = true;
            startPos = getPositionX(event);
            track.style.transition = 'none';
        }

        function dragMove(event) {
            if (isDragging) {
                const currentPosition = getPositionX(event);
                currentTranslate = prevTranslate + currentPosition - startPos;
                track.style.transform = `translateX(${currentTranslate}px)`;
            }
        }

        function dragEnd() {
            isDragging = false;
            prevTranslate = currentTranslate;
            track.style.transition = 'transform 0.5s ease';
            const movedBy = currentTranslate - position;
            if (movedBy < -100) {
                moveToNextSlide();
            } else if (movedBy > 100) {
                moveToPrevSlide();
            } else {
                track.style.transform = `translateX(${position}px)`;
            }
        }

        function getPositionX(event) {
            return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
        }