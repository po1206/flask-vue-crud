<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-10">
        <h1>Books</h1>
        <hr><br><br>
        <alert :message="message" v-if="showMessage"></alert>
        <button type="button" class="btn btn-success btn-sm" @click="toggleAddBookModal">Add Book</button>
        <br><br>
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Author</th>
              <th scope="col">Read?</th>
              <th scope="col">Purchase Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(book, index) in books" :key="index">
              <td>{{ book.title }}</td>
              <td>{{ book.author }}</td>
              <td>
                <span v-if="book.read">Yes</span>
                <span v-else>No</span>
              </td>
              <td>
                ${{ book.price }}
              </td>
              <td>
                <div class="btn-group" role="group">
                  <button type="button" class="btn btn-warning btn-sm" @click="toggleEditBookModal(book)">Update</button>
                  <button type="button" class="btn btn-danger btn-sm" @click="handleDeleteBook(book)">Delete</button>
                  <button type="button" class="btn btn-primary btn-sm" @click="handlePurchaseBook(book)">Purchase</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <!-- add book modal -->
  <div
    ref="addBookModal"
    class="modal fade"
    :class="{show: activeAddBookModal, 'd-block': activeAddBookModal}"
    tabindex="-1"
    role="dialog"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Add a new books</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
            @click="toggleAddBookModal"
          >
          <span aria-hidden="true">&times;</span>
        </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label for="addBookTitle" class="form-label">Title:</label>
              <input
                type="text"
                class="form-control"
                id="addBookTitle"
                v-model="addBookForm.title"
                placeholder="Enter title"
              >
            </div>
            <div class="mb-3">
              <label for="addBookAuthor" class="form-label">Author:</label>
              <input
                type="text"
                class="form-control"
                id="addBookAuthor"
                v-model="addBookForm.author"
                placeholder="Enter author"
              >
            </div>
            <div class="mb-3">
              <label for="addBookPrice" class="form-label">Purchase Price:</label>
              <input
                type="text"
                class="form-control"
                id="addBookPrice"
                v-model="addBookForm.price"
                placeholder="Enter price"
              >
            </div>
            <div class="mb-3 form-check">
              <input
                type="checkbox"
                class="form-check-input"
                id="addBookRead"
                v-model="addBookForm.read"
              >
              <label for="addBookRead" class="form-check-label">Read?</label>
            </div>
            <div class="btn-group" role="group">
              <button type="button" class="btn btn-primary btn-sm" @click="handleAddSubmit">Submit</button>
              <button type="button" class="btn btn-danger btn-sm" @click="handleAddReset">Reset</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <div v-if="activeAddBookModal" class="modal-backdrop fade show"></div>

  <!-- edit book modal -->
  <div
    ref="editBookModal"
    class="modal fade"
    :class="{ show: activeEditBookModal, 'd-block': activeEditBookModal }"
    tabindex="-1"
    role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Update</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
            @click="toggleEditBookModal">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label for="editBookTitle" class="form-label">Title:</label>
              <input
                type="text"
                class="form-control"
                id="editBookTitle"
                v-model="editBookForm.title"
                placeholder="Enter title">
            </div>
            <div class="mb-3">
              <label for="editBookAuthor" class="form-label">Author:</label>
              <input
                type="text"
                class="form-control"
                id="editBookAuthor"
                v-model="editBookForm.author"
                placeholder="Enter author">
            </div>
            <div class="mb-3">
              <label for="editBookPrice" class="form-label">Purchase Price:</label>
              <input
                type="text"
                class="form-control"
                id="editBookPrice"
                v-model="editBookForm.price"
                placeholder="Enter price">
            </div>            
            <div class="mb-3 form-check">
              <input
                type="checkbox"
                class="form-check-input"
                id="editBookRead"
                v-model="editBookForm.read">
              <label class="form-check-label" for="editBookRead">Read?</label>
            </div>
            <div class="btn-group" role="group">
              <button
                type="button"
                class="btn btn-primary btn-sm"
                @click="handleEditSubmit">
                Submit
              </button>
              <button
                type="button"
                class="btn btn-danger btn-sm"
                @click="handleEditCancel">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <div v-if="activeEditBookModal" class="modal-backdrop fade show"></div>
</template>

<script>
import axios from 'axios';
import Alert from './Alert.vue';

export default {
  data() {
    return {
      books: [],
      activeAddBookModal: false,
      addBookForm: {
        title: '',
        author: '',
        read: false,
        price: '',
      },
      activeEditBookModal: false,
      editBookForm: {
        id: '',
        title: '',
        author: '',
        read: false,
        price: '',
      },
      message: '',
      showMessage: false,
      stripe: null,
    };
  },
  components: {
    alert: Alert
  },
  methods: {
    getBooks() {
      const path = 'http://localhost:5001/books';
      axios.get(path)
        .then((res) => {
          this.books = res.data.books;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    addBook(payload) {
      const path = "http://localhost:5001/books";
      axios.post(path, payload)
        .then(() => {
          this.getBooks();
          this.message = 'Book added!';
          this.showMessage = true;
        })
        .catch((error) => {
          console.log(error);
          this.getBooks();
        })
    },
    updateBook(payload, bookID) {
      const path = `http://localhost:5001/books/${bookID}`;
      axios.put(path, payload)
        .then(() => {
          this.getBooks();
          this.message = 'Book updated!';
          this.showMessage = true;
        })
        .catch((error) => {
          console.log(error);
          this.getBooks();
        })
    },
    removeBook(bookID) {
      const path = `http://localhost:5001/books/${bookID}`;
      axios.delete(path)
        .then( () => {
          this.getBooks();
          this.message = 'Book removed!';
          this.showMessage = true;
        })
        .catch((error) => {
          console.error(error);
          this.getBooks();
        });
    },
    getStripePublishableKey() {
      fetch('http://localhost:5001/config')
        .then((result) => result.json())
        .then((data) => {
            this.stripe = Stripe(data.publicKey);
        });
    }, 
    initForm() {
      this.addBookForm.title = '';
      this.addBookForm.author = '';
      this.addBookForm.read = false;
      this.addBookForm.price = '';
      this.editBookForm.id = '';
      this.editBookForm.title = '';
      this.editBookForm.author = '';
      this.editBookForm.read = false;
      this.editBookForm.price = '';
    },
    toggleAddBookModal() {
      const body = document.querySelector('body');
      this.activeAddBookModal = !this.activeAddBookModal;
      if (this.activeAddBookModal) {
        body.classList.add('modal-open');
      } else{
        body.classList.remove('modal-open');
      }
    },
    toggleEditBookModal(book) {
      if (book) {
        for (const x in book) {
          this.editBookForm[x] = book[x];
        }
      }
      const body = document.querySelector('body');
      this.activeEditBookModal = !this.activeEditBookModal;
      if (this.activeEditBookModal) {
        body.classList.add('modal-open');
      } else {
        body.classList.remove('modal-open');
      }
    },
    handleAddReset() {
      this.initForm();
    },
    handleAddSubmit() {
      this.toggleAddBookModal();
      const payload = {
        title: this.addBookForm.title,
        author: this.addBookForm.author,
        read: this.addBookForm.read,
        price: this.addBookForm.price,
      };
      this.addBook(payload);
      this.initForm();
    },
    handleEditSubmit() {
      this.toggleEditBookModal(null);
      const payload = {
        title: this.editBookForm.title,
        author: this.editBookForm.author,
        read: this.editBookForm.read,
        price: this.editBookForm.price,
      };
      this.updateBook(payload, this.editBookForm.id);
    },
    handleEditCancel() {
      this.toggleEditBookModal(null);
      this.initForm();
    },
    handleDeleteBook(book) {
      this.removeBook(book.id);
    },
    handlePurchaseBook(book) {
      // Get Checkout Session ID
      fetch('http://localhost:5001/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({book_id : book.id})
      })
      .then((result) => result.json())
      .then((data) => {
        console.log(data);
        return this.stripe.redirectToCheckout({sessionId: data.sessionId});
      })
      .then((res) => {
        console.log(res);
      })
    }
  },
  created() {
    this.getBooks();
    this.getStripePublishableKey();
  },
};
</script>