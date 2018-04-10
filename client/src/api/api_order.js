import axios from 'axios'

export default {
  order : {
    orderNowApi : data =>
            axios.post(`/api/order`, data).then(res => res.data),
    getAllOrdersApi: () =>
            axios.get(`/api/order`).then(res => res.data),
    donePreparingDishApi: id =>
            axios.put(`/api/order/${id}`).then(res => res.data)
  }
}
