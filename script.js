// Fungsi untuk memperbarui daftar blog
function getBlogs() {
    axios
      .get('https://sistech-api.vercel.app/blogs')
      .then(function (response) {
        var blogs = response.data;
        var blogList = document.getElementById('blogs');
        blogList.innerHTML = '';
  
        blogs.forEach(function (blog) {
          var blogItem = document.createElement('li');
          blogItem.textContent = blog.title + ' - ' + blog.author;
  
          var editButton = document.createElement('button');
          editButton.textContent = 'Edit';
          editButton.classList.add('edit-button');
          editButton.dataset.id = blog.id;
  
          blogItem.appendChild(editButton);
          blogList.appendChild(blogItem);
        });
      })
      .catch(function (error) {
        console.error('Gagal mendapatkan daftar blog:', error);
      });
  }
  // Fungsi untuk mengisi data profil
function fillProfile(name, email, description) {
    var nameElement = document.getElementById('profile-name');
    var emailElement = document.getElementById('profile-email');
    var descriptionElement = document.getElementById('profile-description');
  
    nameElement.textContent = name;
    emailElement.textContent = email;
    descriptionElement.textContent = description;
  }
  
  // Fungsi untuk mengupdate profil pengguna
  function updateProfile(event) {
    event.preventDefault();
  
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
  
    fillProfile(name, email, 'Deskripsi diri orang tersebut.');
  
    // Simpan data profil pengguna ke penyimpanan (misalnya database)
    // ...
  
    // Reset form setelah menyimpan profil
    document.getElementById('update-profile-form').reset();
  }
  
  // Handler untuk form update profil
  document.getElementById('update-profile-form').addEventListener('submit', updateProfile);
  
  
  
  // Fungsi untuk membuka modal edit blog
  function openModal(blogId) {
    var modal = document.getElementById('edit-blog-modal');
    modal.style.display = 'block';
    modal.dataset.id = blogId;
  }
  
  // Fungsi untuk menutup modal edit blog
  function closeModal() {
    var modal = document.getElementById('edit-blog-modal');
    modal.style.display = 'none';
  }
  
  // Handler untuk form tambah blog
  document.getElementById('new-blog-form').addEventListener('submit', function (e) {
    e.preventDefault();
  
    var title = document.getElementById('title').value;
    var content = document.getElementById('content').value;
    var author = document.getElementById('author').value;
  
    axios
      .post('https://sistech-api.vercel.app/blogs', {
        title: title,
        content: content,
        author: author,
      })
      .then(function (response) {
        console.log('Blog berhasil diposting:', response.data);
        document.getElementById('new-blog-form').reset();
        getBlogs();
      })
      .catch(function (error) {
        console.error('Gagal memposting blog:', error);
      });
  });
  
  // Handler untuk form edit blog
  document.getElementById('edit-blog-form').addEventListener('submit', function (e) {
    e.preventDefault();
  
    var updatedTitle = document.getElementById('updated-title').value;
    var updatedContent = document.getElementById('updated-content').value;
    var updatedAuthor = document.getElementById('updated-author').value;
  
    var blogId = document.getElementById('edit-blog-modal').dataset.id;
  
    axios
      .put(`https://sistech-api.vercel.app/blogs/${blogId}`, {
        title: updatedTitle,
        content: updatedContent,
        author: updatedAuthor,
      })
      .then(function (response) {
        console.log('Blog berhasil diubah:', response.data);
        closeModal();
        getBlogs();
      })
      .catch(function (error) {
        console.error('Gagal mengubah blog:', error);
      });
  });
  
  // Handler untuk tombol edit blog
  document.addEventListener('click', function (event) {
    if (event.target.classList.contains('edit-button')) {
      var blogId = event.target.dataset.id;
      openModal(blogId);
    }
  });
  
  // Panggil fungsi getBlogs() untuk memuat daftar blog saat halaman pertama kali dimuat
  getBlogs();
  