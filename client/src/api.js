import axios from 'axios';

const service = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:3036/api',
});

const errHandler = err => {
  console.error(err);
  throw err;
};

export default {
  service: service,

  getRailwaystations() {
    return service
      .get('/stations/all')
      .then(res => res.data)
      .catch(errHandler);
  },
  getRailwaystationDetails(id) {
    return service
      .get("/stations/" + id)
      .then(res => res.data)
      .catch(errHandler)
  },

  getRentalObjects(id) {
    return service 
    .get('rentals/' + id)
    .then(res => res.data)
    .catch(errHandler);
  },

  getCarparkPrognoses(id) {
    return service
    .get('carparks/prognoses/' + id)
    .then(res => res.data)
    .catch(errHandler)
  },

  getFavorites() {
    return service
    .get('users/favorites/')
    .then(res => res.data)
    .catch(errHandler);
  },

  deleteFavorite(id) {
    return service
    .delete('users/favorite/' + id)
    .then(res => res.data)
    .catch(errHandler);
  },

  postFavorite(id) {
    return service
      .post('users/favorite/' + id)
      .then(res => res.data)
      .catch(errHandler);
  },

  getSecret() {
    return service
      .get('/secret')
      .then(res => res.data)
      .catch(errHandler);
  },

  signup(userInfo) {
    return service
      .post('/signup', userInfo)
      .then(res => res.data)
      .catch(errHandler);
  },

  login(email, password) {
    return service
      .post('/login', {
        email,
        password,
      })
      .then(res => {
        const { data } = res;
        localStorage.setItem('user', JSON.stringify(data));
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.token;
        return data;
      })
      .catch(errHandler);
  },

  logout() {
    delete axios.defaults.headers.common['Authorization'];
    localStorage.removeItem('user');
  },

  loadUser() {
    const userData = localStorage.getItem('user');
    if (!userData) return false;
    const user = JSON.parse(userData);
    if (user.token && user.name) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + user.token;
      return user;
    }
    return false;
  },

  isLoggedIn() {
    return localStorage.getItem('user') != null
  },


  addPicture(file) {
    const formData = new FormData();
    formData.append("picture", file)
    return service
      .post('/users/first-user/pictures', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => res.data)
      .catch(errHandler);
  },
};
