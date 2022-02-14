<template>
  <CRow>
    <CCol>
      <CCard class="mb-4">
        <CCardHeader> <strong>Product Details</strong> </CCardHeader>
        <CCardBody>
          <CForm>
            <div v-if="this.$store.state.product.productDetail === null">
              <h1>Data Not Found</h1>
            </div>
            <div v-else>
              <CRow class="mb-3">
                <CFormLabel for="" class="col-sm-2 col-form-label"
                  >Category</CFormLabel
                >
                <div class="col-sm-10">
                  <CFormInput
                    type="text"
                    id="title"
                    :value="
                      this.$store.state.product.productDetail.categoryName
                    "
                    readonly
                    plain-text
                  />
                </div>
              </CRow>
              <CRow class="mb-3">
                <CFormLabel for="" class="col-sm-2 col-form-label"
                  >Posted By</CFormLabel
                >
                <div class="col-sm-10">
                  <CFormInput
                    type="text"
                    id="title"
                    :value="this.$store.state.product.productDetail.name"
                    readonly
                    plain-text
                  />
                </div>
              </CRow>
              <CRow class="mb-3">
                <CFormLabel for="staticEmail" class="col-sm-2 col-form-label"
                  >Title</CFormLabel
                >
                <div class="col-sm-10">
                  <CFormInput
                    type="text"
                    id="title"
                    :value="this.$store.state.product.productDetail.title"
                    readonly
                    plain-text
                  />
                </div>
              </CRow>

              <CRow class="mb-3">
                <CFormLabel for="" class="col-sm-2 col-form-label"
                  >Average Ratting</CFormLabel
                >
                <div class="col-sm-10">
                  <CFormInput
                    type="text"
                    id="title"
                    :value="
                      this.$store.state.product.productDetail.aveRating.toFixed(
                        2,
                      )
                    "
                    readonly
                    plain-text
                  />
                </div>
              </CRow>
              <CRow class="mb-3">
                <CFormLabel for="" class="col-sm-2 col-form-label"
                  >Count Rating</CFormLabel
                >
                <div class="col-sm-10">
                  <CFormInput
                    type="text"
                    id="title"
                    :value="this.$store.state.product.productDetail.rating"
                    readonly
                    plain-text
                  />
                </div>
              </CRow>
              <CRow class="mb-3">
                <CFormLabel for="" class="col-sm-2 col-form-label"
                  >Views</CFormLabel
                >
                <div class="col-sm-10">
                  <CFormInput
                    type="text"
                    id="title"
                    :value="this.$store.state.product.productDetail.views"
                    readonly
                    plain-text
                  />
                </div>
              </CRow>
                  <CRow class="mb-3">
                <CFormLabel for="staticEmail" class="col-sm-2 col-form-label"
                  >Status</CFormLabel
                >
                <div class="col-sm-10">
                  <CBadge
                    v-if="this.$store.state.product.productDetail.isDisable === 0"
                    color="success"
                    shape="rounded-pill"
                    >Active</CBadge
                  >
                  <CBadge v-else color="danger" shape="rounded-pill"
                    >Inactive</CBadge
                  >
                </div>
              </CRow>
              <Crow class="mb-3">
                <router-link to="/pages/products">
                  <CButton size="sm" color="primary" class="float-end">
                    Back
                  </CButton>
                </router-link>
              </Crow>
            </div>
          </CForm>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
export default {
  name: 'ProductDetails',
  data() {
    return {}
  },
  mounted() {
    this.$store.dispatch('getProductById', {
      id: this.$route.params.id,
    })
  },
}
</script>

<style scoped>
.form-label {
  color: black;
  font-weight: bold;
}
.title-form {
  color: black;
  font-weight: 400;
}
</style>


