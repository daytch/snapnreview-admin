/* eslint-disable vue/no-use-v-if-with-v-for */
<template>
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader> <strong>Category</strong> </CCardHeader>
        <CCardBody>
          <div class="d-grid gap-2 d-md-flex justify-content-md-end">
            <CButton
              color="primary"
              size="sm"
              @click="
                () => {
                  visibleStaticBackdrop = true
                }
              "
              >Create Category</CButton
            >
          </div>

          <CModal
            backdrop="static"
            alignment="center"
            scrollable
            :visible="visibleStaticBackdrop"
            @close="
              () => {
                visibleStaticBackdrop = false
              }
            "
          >
            <CModalHeader>
              <CModalTitle>Create Category</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <CFormCheck
                id="isSubCategory"
                label="Is Sub Category"
                @change.prevent="changeIsSubCategory"
              /><br />

              <div v-if="isSubCategory">
                <CFormLabel>Main Category</CFormLabel>
                <CFormSelect
                  size="sm"
                  :placeholder="'Select Parent Category'"
                  :value="selectedCategory"
                  @change="changeParentCategory"
                >
                  <option>Select Main Category</option>
                  <option
                    v-for="(item, index) in $store.getters.getDropdown"
                    :key="index"
                    :value="item.value"
                  >
                    {{ item.label }}
                  </option>
                </CFormSelect>
                <br />
                <CFormLabel>Sub Category</CFormLabel>
                <CFormInput
                  v-model="subCategory"
                  size="sm"
                  placeholder="Category"
                  @input="changeSubCategory"
                />
              </div>
              <div v-else>
                <CFormLabel>Category</CFormLabel>
                <CFormInput
                  v-model="category"
                  type="text"
                  size="sm"
                  placeholder="Category"
                  @input="changeCategory"
                />
              </div>
              <CFormLabel for="formFileSm">Image</CFormLabel>
              <CFormInput
                id="formFileSm"
                type="file"
                size="sm"
                accept="image/jpeg, image/png"
                @change="changeUploadImage"
              />
            </CModalBody>
            <CModalFooter>
              <CButton
                size="sm"
                color="secondary"
                :disabled="isLoading"
                @click="
                  () => {
                    visibleStaticBackdrop = false
                  }
                "
              >
                Close
              </CButton>
              <CButton
                size="sm"
                color="primary"
                :disabled="isLoading"
                @click.prevent="saveCategory"
              >
                <template v-if="isLoading">
                  <CSpinner component="span" size="sm" aria-hidden="true" />
                  Loading...</template
                >
                <template v-else>Save changes </template>
              </CButton>
            </CModalFooter>
          </CModal>

          <CModal
            backdrop="static"
            alignment="center"
            scrollable
            :visible="visibleStaticBackdropEdit"
            @close="
              () => {
                visibleStaticBackdropEdit = false
              }
            "
          >
            <CModalHeader>
              <CModalTitle>Update Category</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <CFormCheck
                id="isSubCategory"
                label="Is Sub Category"
                @change.prevent="changeIsSubCategory"
              /><br />

              <div v-if="isSubCategory">
                <CFormLabel>Main Category</CFormLabel>
                <CFormSelect
                  size="sm"
                  :placeholder="'Select Parent Category'"
                  :value="selectedCategory"
                  @change="changeParentCategory"
                >
                  <option>Select Main Category</option>
                  <option
                    v-for="(item, index) in $store.getters.getDropdown"
                    :key="index"
                    :value="item.value"
                  >
                    {{ item.label }}
                  </option>
                </CFormSelect>
                <br />
                <CFormLabel>Sub Category</CFormLabel>
                <CFormInput
                  v-model="subCategory"
                  size="sm"
                  placeholder="Category"
                  @input="changeSubCategory"
                />
              </div>
              <div v-else>
                <CFormLabel>Category</CFormLabel>
                <CFormInput
                  v-model="category"
                  type="text"
                  size="sm"
                  placeholder="Category"
                  @input="changeCategory"
                />
              </div>
              <CFormLabel for="formFileSm">Image</CFormLabel>
              <CFormInput
                id="formFileSm"
                type="file"
                size="sm"
                accept="image/jpeg, image/png"
                @change="changeUploadImage"
              />
            </CModalBody>
            <CModalFooter>
              <CButton
                size="sm"
                color="secondary"
                :disabled="isLoading"
                @click="
                  () => {
                    visibleStaticBackdrop = false
                  }
                "
              >
                Close
              </CButton>
              <CButton
                size="sm"
                color="primary"
                :disabled="isLoading"
                @click.prevent="saveCategory"
              >
                <template v-if="isLoading">
                  <CSpinner component="span" size="sm" aria-hidden="true" />
                  Loading...</template
                >
                <template v-else>Save changes </template>
              </CButton>
            </CModalFooter>
          </CModal>

          <CTable hover>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">No</CTableHeaderCell>
                <CTableHeaderCell scope="col">Category</CTableHeaderCell>
                <CTableHeaderCell scope="col">Sub Category</CTableHeaderCell>
                <CTableHeaderCell scope="col">Image</CTableHeaderCell>
                <CTableHeaderCell scope="col">Action</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody
              v-for="(parentCat, index) in $store.state.category.parentCategory"
              :key="index"
            >
              <CTableRow
                v-for="(subItem, iSub) in parentCat.sub"
                v-if="parentCat.sub.length > 0"
                :key="subItem.id"
              >
                <CTableHeaderCell
                  v-if="iSub === 0"
                  :rowspan="parentCat.sub.length"
                  scope="row"
                  class="align-middle"
                  >{{ index + 1 }}</CTableHeaderCell
                >
                <CTableDataCell
                  v-if="iSub === 0"
                  :rowspan="parentCat.sub.length"
                  class="align-middle"
                  >{{ parentCat.text }}</CTableDataCell
                >
                <CTableDataCell>{{
                  subItem.text ? subItem.text : ''
                }}</CTableDataCell>
                <CTableDataCell>
                  <img
                    :src="subItem.iconUrl"
                    :alt="subItem.text"
                    style="width: 50px; height: 50px"
                  />
                </CTableDataCell>
                <CTableDataCell>
                  <CButton
                    size="sm"
                    color="primary"
                    @click="
                      () => {
                        editCategory(subItem)
                      }
                    "
                  >
                    Edit
                  </CButton>
                  <CButton
                    size="sm"
                    color="danger"
                    @click="
                      () => {
                        deleteCategory(subItem)
                      }
                    "
                  >
                    Delete
                  </CButton>
                </CTableDataCell>
              </CTableRow>

              <CTableRow v-else>
                <CTableHeaderCell scope="row">{{ index + 1 }}</CTableHeaderCell>
                <CTableDataCell>{{ parentCat.text }}</CTableDataCell>
                <CTableDataCell></CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import { mapState } from 'vuex'
import api from '../../apis/category.js'

export default {
  name: 'Category',
  data() {
    return {
      visibleStaticBackdrop: false,
      visibleStaticBackdropEdit: false,
      isSubCategory: false,
      category: '',
      subCategory: '',
      selectedCategory: '',
      isLoading: false,
      url: '',
    }
  },
  computed: {
    ...mapState({
      parentCategory: (state) => state.parentCategory,
    }),
  },
  mounted() {
    this.callAllmethods()
  },
  methods: {
    editCategory(item) {
      debugger
      this.isSubCategory = true
      this.category = item.text
      this.subCategory = item.subText
      this.selectedCategory = item.parentId
      this.url = item.iconUrl
      this.visibleStaticBackdrop = true
    },
    getParentCategory() {
      this.$store.dispatch('getParentCategory')
    },
    getChildCategory() {
      this.$store.dispatch('getChildCategory')
    },
    callAllmethods() {
      this.getChildCategory()
      this.getParentCategory()
    },
    changeIsSubCategory(e) {
      e.preventDefault()
      this.isSubCategory = e.target.checked
    },
    changeParentCategory(e) {
      e.preventDefault()
      this.selectedCategory = e.target.value
    },
    changeCategory(e) {
      e.preventDefault()
      this.category = e.target.value
    },
    changeSubCategory(e) {
      e.preventDefault()
      this.subCategory = e.target.value
    },
    changeUploadImage(e) {
      this.isLoading = true
      console.log(e)
      const formData = new FormData()
      formData.append('image', e.target.files[0])
      formData.append('type', 'category')
      api.uploadImage(formData).then((res) => {
        console.log(res)
        this.url = res.data
        this.isLoading = false
      })
    },
    saveCategory() {
      this.isLoading = true

      const data = {
        categoryName: this.isSubCategory ? this.subCategory : this.category,
        isParent: this.isSubCategory ? 0 : 1,
        parentCategoryId: this.isSubCategory ? this.selectedCategory : 0,
        iconUrl: this.url,
      }
      api
        .insertCategory(data)
        .then((res) => {
          console.log(res)
          this.callAllmethods()
          this.isLoading = false
          this.callAllmethods()
          this.category = ''
          this.visibleStaticBackdrop = false
        })
        .catch((err) => {
          this.visibleStaticBackdrop = false
          this.isLoading = false
          console.log(err)
        })
    },
  },
}
</script>
