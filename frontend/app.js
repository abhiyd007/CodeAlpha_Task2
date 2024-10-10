const API_URL = "http://localhost:3000/api/posts";  // Update with your API endpoint

async function fetchPosts() {
    const response = await fetch(API_URL);
    const posts = await response.json();
    renderPosts(posts);
}

function renderPosts(posts) {
    const postsContainer = document.getElementById('posts');
    postsContainer.innerHTML = '';  // Clear existing posts
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.innerHTML = `
            <h4>${post.author.username}</h4>
            <p>${post.content}</p>
            <button onclick="likePost('${post._id}')">Like (${post.likes.length})</button>
        `;
        postsContainer.appendChild(postElement);
    });
}

async function createPost() {
    const content = document.getElementById('post-content').value;
    const authorId = 'YOUR_USER_ID';  // Replace with the logged-in user's ID

    if (!content) return alert('Post content cannot be empty.');

    await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content, authorId })
    });

    document.getElementById('post-content').value = '';  // Clear the textarea
    fetchPosts();  // Refresh posts after creating a new one
}

// Fetch posts when the page loads
fetchPosts();
