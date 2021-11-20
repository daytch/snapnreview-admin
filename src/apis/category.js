import axios from './axios'

export default {
  getAllParentCategory: () => axios.post('/user/getAllParentCategory'),
  getAllSubCategory: () => axios.post('/user/getAllSubCategory'),
  insertCategory: (params) => axios.post('/admin/insertCategory', params),
  updateCategory: (params) => axios.post('/admin/updateCategory', params),
  deleteCategory: (params) => axios.post('/admin/deleteCategory', params),
  uploadImage: (params) => axios.post('/admin/uploadImage', params),
}
