document.addEventListener('DOMContentLoaded', function() {
    // --- Обработка формы контактов ---
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const name = contactForm.querySelector('input[name="name"]').value.trim();
        const email = contactForm.querySelector('input[name="email"]').value.trim();
        const subject = contactForm.querySelector('input[name="subject"]').value.trim();
        const message = contactForm.querySelector('textarea[name="message"]').value.trim();

        if (!name || !email || !message) {
            alert('Please fill out all required fields (Name, Email, and Message).');
            return;
        }

        // Симуляция успешной отправки
        alert(`Thank you, ${name}! Your message has been sent.`);
        
        // Очистка формы после отправки
        contactForm.reset();
    });

    // --- Поиск треков ---
    const searchInput = document.querySelector('.search-bar input');
    const trackRows = document.querySelectorAll('.track-list tbody tr');

    // Функция для фильтрации треков
    function filterTracks() {
        const searchTerm = searchInput.value.trim().toLowerCase();

        trackRows.forEach(row => {
            const title = row.querySelector('td').textContent.toLowerCase();
            const tags = row.querySelector('td:nth-child(4)').textContent.toLowerCase();

            if (title.includes(searchTerm) || tags.includes(searchTerm)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });

        // Если поле поиска пустое, показываем все треки
        if (!searchTerm) {
            trackRows.forEach(row => {
                row.style.display = '';
            });
        }
    }

    searchInput.addEventListener('input', filterTracks);

    // --- Прокрутка Sound Kits ---
    const scrollContainer = document.querySelector('.kits');
    const leftButton = document.querySelector('.scroll-button.left');
    const rightButton = document.querySelector('.scroll-button.right');

    const scrollAmount = 220; // Расстояние прокрутки (ширина одного элемента + зазор)

    leftButton.addEventListener('click', function() {
        scrollContainer.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });

    rightButton.addEventListener('click', function() {
        scrollContainer.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });

    // Проверка, можно ли прокручивать дальше влево или вправо
    function updateButtonsVisibility() {
        leftButton.style.display = scrollContainer.scrollLeft > 0 ? 'block' : 'none';
        rightButton.style.display = scrollContainer.scrollLeft + scrollContainer.clientWidth < scrollContainer.scrollWidth ? 'block' : 'none';
    }

    scrollContainer.addEventListener('scroll', updateButtonsVisibility);
    updateButtonsVisibility(); // Обновляем видимость кнопок при загрузке страницы
});

document.addEventListener('DOMContentLoaded', function() {
    const playButtons = document.querySelectorAll('.play-button');
    const buyButtons = document.querySelectorAll('.buy-button');

    // Логика для кнопок воспроизведения/паузы
    playButtons.forEach(button => {
        const audioElement = document.getElementById(button.getAttribute('data-audio'));

        button.addEventListener('click', function() {
            document.querySelectorAll('audio').forEach(audio => {
                if (audio !== audioElement) {
                    audio.pause();
                    const otherButton = document.querySelector(`button[data-audio="${audio.id}"]`);
                    otherButton.querySelector('.play-icon').style.display = 'inline';
                    otherButton.querySelector('.pause-icon').style.display = 'none';
                }
            });

            if (audioElement.paused) {
                audioElement.play();
                button.querySelector('.play-icon').style.display = 'none';
                button.querySelector('.pause-icon').style.display = 'inline';
            } else {
                audioElement.pause();
                button.querySelector('.play-icon').style.display = 'inline';
                button.querySelector('.pause-icon').style.display = 'none';
            }

            audioElement.addEventListener('ended', function() {
                button.querySelector('.play-icon').style.display = 'inline';
                button.querySelector('.pause-icon').style.display = 'none';
            });
        });
    });

    // Логика для кнопок покупки
    buyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const title = button.getAttribute('data-title');
            const price = button.getAttribute('data-price');

            // Переходим к форме контакта
            const contactForm = document.getElementById('contactForm');
            document.querySelector('input[name="entry.908588504"]').value = `Product: ${title}, Price: ${price}`;

            // Скроллим к форме контакта
            contactForm.scrollIntoView({ behavior: 'smooth' });
        });
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const kitButtons = document.querySelectorAll('.buy-kit-button');
    
    kitButtons.forEach(button => {
        button.addEventListener('click', function() {
            const title = button.getAttribute('data-title');
            const price = button.getAttribute('data-price');
            
            // Переход к контактной форме с заполненным Subject
            document.querySelector('input[name="entry.908588504"]').value = `Sound Kit: ${title}, Price: ${price}`;
            document.getElementById('contactForm').scrollIntoView({ behavior: 'smooth' });
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Отключаем стандартное поведение формы

        const name = contactForm.querySelector('input[name="entry.145756959"]').value.trim();
        const email = contactForm.querySelector('input[name="entry.1069942288"]').value.trim();
        const subject = contactForm.querySelector('input[name="entry.908588504"]').value.trim();
        const message = contactForm.querySelector('textarea[name="entry.624526886"]').value.trim();

        if (!name || !email || !message) {
            alert('Please fill out all required fields (Name, Email, and Message).');
            return;
        }

        // Формируем данные формы для отправки
        const formData = new FormData(contactForm);

        // Отправляем данные через AJAX
        fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            mode: 'no-cors' // Запрещает CORS-ошибки, поскольку Google Forms не поддерживает CORS
        }).then(() => {
            // Показываем сообщение об успешной отправке
            alert(`Thank you, ${name}! Your message has been sent.`);

            // Очищаем форму
            contactForm.reset();
        }).catch(error => {
            // Обрабатываем ошибку отправки
            console.error('Error!', error.message);
            alert('There was an error sending your message. Please try again later.');
        });
    });
});
