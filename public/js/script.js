async function login(name, password) {
  try {
    const response = await fetch('/sign-in', {
      method: 'POST',
      body: JSON.stringify({ name, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    }
  } catch (err) {}
}

async function signup(name, password) {
  try {
    const response = await fetch('/sign-up', {
      method: 'POST',
      body: JSON.stringify({ name, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    }
  } catch (err) {}
}

const createPost = async (post_title, post_text) => {
  try {
    const response = await fetch('/dash', {
      method: 'POST',
      body: JSON.stringify({ post_title, post_text }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      document.location.replace('/dash');
    }
  } catch (err) {}
};

const createComment = async (commentText, postId) => {
  try {
    const response = await fetch(`/post/${postId}`, {
      method: 'POST',
      body: JSON.stringify({ commentText }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      document.location.reload();
    }
  } catch (err) {}
};

const editComment = async (updateTitle, updateText, postId) => {
  try {
    const response = await fetch(`/edit/${postId}`, {
      method: 'PUT',
      body: JSON.stringify({ updateTitle, updateText }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      document.location.replace('/dash');
    }
  } catch (err) {}
};

const deletePost = async (postId) => {
  try {
    const response = await fetch(`/edit/${postId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      document.location.replace('/dash');
    }
  } catch (err) {}
};

const logout = async () => {
  try {
    const response = await fetch('/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      document.location.replace('/');
    }
  } catch (err) {}
};

$('#signIn').on('click', function (event) {
  event.preventDefault();
  login($('#id').val(), $('#pw').val());
});

$('#createAccount').on('click', function (event) {
  event.preventDefault();
  signup($('#id').val(), $('#pw').val());
});

$('#logout').on('click', function (event) {
  event.preventDefault();
  logout();
});

$('#createPost').on('click', function (event) {
  event.preventDefault();
  createPost($('#postTitle').val(), $('#postText').val());
});

$('#createComment').on('click', function (event) {
  event.preventDefault();
  createComment($('#commentText').val(), $('#postid').attr('data-id'));
});

$('#edit').on('click', function (event) {
  event.preventDefault();
  editComment(
    $('#commentTitle').text(),
    $('#commentText').text(),
    $('#postid').attr('data-id')
  );
});

$('#delete').on('click', function (event) {
  event.preventDefault();
  deletePost($('#postid').attr('data-id'));
});
