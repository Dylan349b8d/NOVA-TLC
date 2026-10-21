document.addEventListener('DOMContentLoaded', () => {
    // Control seguro del botón de entrada cinemática
    const introScreen = document.getElementById('introScreen');
    const enterBtn = document.getElementById('enterBtn');

    if (enterBtn && introScreen) {
        enterBtn.addEventListener('click', () => {
            introScreen.classList.add('fade-out');
        });
    }

    const searchInput = document.getElementById('searchInput');
    const clearSearchBtn = document.getElementById('clearSearch');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const gameCards = document.querySelectorAll('.game-card');

    let currentCategory = 'todos';

    function filterGames() {
        if (!searchInput) return;
        const query = searchInput.value.toLowerCase().trim();
        let visibleCount = 0;

        gameCards.forEach(card => {
            const category = card.getAttribute('data-category');
            const name = card.getAttribute('data-name');
            const textContent = card.innerText.toLowerCase();

            const matchesCategory = (currentCategory === 'todos' || category === currentCategory);
            const matchesSearch = (name.includes(query) || textContent.includes(query));

            if (matchesCategory && matchesSearch) {
                card.style.display = 'block';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        const counter = document.querySelector('.games-counter');
        if (counter) {
            counter.textContent = `0${visibleCount} APPS DISPONIBLES`;
        }
    }

    if (searchInput) {
        searchInput.addEventListener('input', filterGames);
    }

    if (clearSearchBtn) {
        clearSearchBtn.addEventListener('click', () => {
            searchInput.value = '';
            filterGames();
        });
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentCategory = button.getAttribute('data-category');
            filterGames();
        });
    });

    // Desplegables de información extra (Demons, Tops, Bosses)
    document.querySelectorAll('.toggle-extra-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const content = btn.nextElementSibling;
            if (content) {
                content.classList.toggle('hidden-content');
            }
        });
    });

    // Likes y Comentarios
    document.querySelectorAll('.game-card').forEach(card => {
        const likeBtn = card.querySelector('.like-btn');
        let likes = 0;
        let liked = false;

        if (likeBtn) {
            likeBtn.addEventListener('click', () => {
                if (!liked) {
                    likes++;
                    liked = true;
                    likeBtn.style.background = 'rgba(239, 68, 68, 0.2)';
                    likeBtn.style.borderColor = '#ef4444';
                    likeBtn.style.color = '#fca5a5';
                    likeBtn.innerHTML = `♥ <span class="like-count">${likes}</span>`;
                } else {
                    likes--;
                    liked = false;
                    likeBtn.style.background = 'rgba(255, 255, 255, 0.05)';
                    likeBtn.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    likeBtn.style.color = '#f1f5f9';
                    likeBtn.innerHTML = `♡ <span class="like-count">${likes}</span>`;
                }
            });
        }

        const sendBtn = card.querySelector('.send-comment');
        const commentInput = card.querySelector('.comment-input');
        const commentList = card.querySelector('.comment-list');
        const commentCountSpan = card.querySelector('.comment-count');
        let commentCount = 0;

        function addComment() {
            if (!commentInput || !commentList) return;
            const commentText = commentInput.value.trim();
            if (commentText !== '') {
                const li = document.createElement('li');
                li.textContent = commentText;
                commentList.appendChild(li);
                commentInput.value = '';
                commentCount++;
                if (commentCountSpan) {
                    commentCountSpan.textContent = commentCount;
                }
            }
        }

        if (sendBtn && commentInput) {
            sendBtn.addEventListener('click', addComment);
            commentInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    addComment();
                }
            });
        }
    });
});