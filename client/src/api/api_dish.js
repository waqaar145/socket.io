import axios from 'axios'

export default {
  dish : {
    saveDishApi : dish =>
            axios.post(`/api/dish`, dish).then(res => res.data),
    getDishNamesApi: () =>
            axios.get(`/api/dish`).then(res => res.data)
  }
}
