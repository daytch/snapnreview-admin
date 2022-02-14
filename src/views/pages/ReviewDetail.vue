<template>
  <CRow>
    <CCol>
      <CCard class="mb-4">
        <CCardHeader> <strong>Review Details</strong> </CCardHeader>
        <CCardBody>
          <CForm>
            <div v-if="this.$store.state.review.reviewDetail === null">
              <h1>Data Not Found</h1>
            </div>
            <div v-else>
                <CRow class="mb-3">
                <CFormLabel for="staticEmail" class="col-sm-2 col-form-label"
                  >Posted By</CFormLabel
                >
                <div class="col-sm-10">
                  <CFormInput
                    type="text"
                    id="title"
                    :value="this.$store.state.review.reviewDetail.name"
                    readonly
                    plain-text
                  />
                </div>
              </CRow>
                  <CRow class="mb-3">
                <CFormLabel for="staticEmail" class="col-sm-2 col-form-label"
                  >Category</CFormLabel
                >
                <div class="col-sm-10">
                  <CFormInput
                    type="text"
                    id="title"
                    :value="this.$store.state.review.reviewDetail.categoryName"
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
                  <router-link
                    :to="`/pages/productdetails/${this.$store.state.review.reviewDetail.productId}`"
                  >
                    <CFormInput
                      type="text"
                      id="title"
                      :value="this.$store.state.review.reviewDetail.productName"
                      readonly
                      plain-text
                    />
                  </router-link>
                </div>
              </CRow>
              <CRow class="mb-3">
                <CFormLabel for="staticEmail" class="col-sm-2 col-form-label"
                  >Description</CFormLabel
                >
                <div class="col-sm-10">
                  <!-- <CFormTextarea
                    disabled
                    id="exampleFormControlTextarea1"
                    :value='this.$store.state.review.reviewDetail.reviewDescription'
                    rows="3"
                  ></CFormTextarea> -->
                  <div
                    v-html="
                      this.$store.state.review.reviewDetail.reviewDescription
                    "
                  ></div>
                </div>
              </CRow>
              <CRow class="mb-3">
                <CFormLabel for="staticEmail" class="col-sm-2 col-form-label"
                  >Status</CFormLabel
                >
                <div class="col-sm-10">
                  <!-- <CFormTextarea
                    disabled
                    id="exampleFormControlTextarea1"
                    :value='this.$store.state.review.reviewDetail.reviewDescription'
                    rows="3"
                  ></CFormTextarea> -->
                  <CBadge
                    v-if="this.$store.state.review.reviewDetail.isDisable === 0"
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
                <router-link to="/pages/reviews">
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
  name: 'ReviewDetails',
  data() {
    return {}
  },
  mounted() {
    this.$store.dispatch('getReviewById', {
      search: '',
      skip: 0,
      take: 1,
      reviewId: this.$route.params.id,
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


