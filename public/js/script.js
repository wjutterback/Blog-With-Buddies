async function login(name, password) {
  const response = await fetch('/sign-in', {
    method: 'POST',
    body: JSON.stringify({ name, password }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    response.json().then((json) => {
      $('#error').text(json.message);
    });
  }
}

async function signup(name, password) {
  const response = await fetch('/sign-up', {
    method: 'POST',
    body: JSON.stringify({ name, password }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    response.json().then((json) => {
      $('#error').text(json.message);
    });
  }
}

const createPost = async (post_title, post_text) => {
  const response = await fetch('/dash', {
    method: 'POST',
    body: JSON.stringify({ post_title, post_text }),
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok) {
    document.location.replace('/');
  } else {
    alert('Failed to create post');
  }
};

const createComment = async (commentText, postId) => {
  const response = await fetch(`/post/${postId}`, {
    method: 'POST',
    body: JSON.stringify({ commentText }),
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok) {
    document.location.reload();
  } else {
    alert('Failed to create comment');
  }
};

const logout = async () => {
  const response = await fetch('/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok) {
    document.location.replace('/');
  } else {
    alert('Failed to log out.');
  }
};

$('#signIn').on('click', function (event) {
  login($('#id').val(), $('#pw').val());
});

$('#createAccount').on('click', function (event) {
  signup($('#id').val(), $('#pw').val());
});

$('#logout').on('click', function (event) {
  logout();
});

$('#createPost').on('click', function (event) {
  createPost($('#postTitle').val(), $('#postText').val());
});

$('#createComment').on('click', function (event) {
  createComment($('#commentText').val(), $('#postid').attr('data-id'));
});
