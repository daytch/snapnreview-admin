<template>
  <CRow>
    <CCol>
      <CCard class="mb-4">
        <CCardHeader> <strong>Question Details</strong> </CCardHeader>
        <CCardBody>
          <CForm>
            <div v-if="this.$store.state.question.questionDetail === null">
              <h1>Data Not Found</h1>
            </div>
            <div v-else>
              <CRow class="mb-3">
                <CFormLabel for="staticEmail" class="col-sm-2 col-form-label"
                  >Category
                </CFormLabel>
                <div class="col-sm-10">
                  <CFormInput
                    type="text"
                    id="title"
                    :value="
                      this.$store.state.question.questionDetail.categoryName
                    "
                    readonly
                    plain-text
                  />
                </div>
              </CRow>
                <CRow class="mb-3">
                <CFormLabel for="staticEmail" class="col-sm-2 col-form-label"
                  >Posted By
                </CFormLabel>
                <div class="col-sm-10">
                  <CFormInput
                    type="text"
                    id="title"
                    :value="
                      this.$store.state.question.questionDetail.name
                    "
                    readonly
                    plain-text
                  />
                </div>
              </CRow>
              <CRow class="mb-3">
                <CFormLabel for="staticEmail" class="col-sm-2 col-form-label"
                  >Question Title
                </CFormLabel>
                <div class="col-sm-10">
                  <CFormInput
                    type="text"
                    id="title"
                    :value="this.$store.state.question.questionDetail.title"
                    readonly
                    plain-text
                  />
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
                      this.$store.state.question.questionDetail
                        .questionDescription
                    "
                  ></div>
                </div>
              </CRow>
              <CRow class="mb-3">
                <CFormLabel for="staticEmail" class="col-sm-2 col-form-label"
                  >Status</CFormLabel
                >
                <div class="col-sm-10">
                  <CBadge
                    v-if="
                      this.$store.state.question.questionDetail.isDisable === 0
                    "
                    color="success"
                    shape="rounded-pill"
                    >Active</CBadge
                  >
                  <CBadge v-else color="danger" shape="rounded-pill"
                    >Inactive</CBadge
                  >
                </div>
              </CRow>

              <!-- <CRow class="mb-3">
                <CFormLabel for="" class="col-sm-2 col-form-label"
                  >Comment Description</CFormLabel
                >
                <div class="col-sm-10">
                  <CFormInput
                    type="text"
                    id="title"
                    :value="this.$store.state.comment.commentDetail.comment"
                    readonly
                    plain-text
                  />
                </div>
              </CRow>
              <CRow class="mb-3">
                <CFormLabel for="" class="col-sm-2 col-form-label"
                  >Comment By</CFormLabel
                >
                <div class="col-sm-10">
                  <CFormInput
                    type="text"
                    id="title"
                    :value="this.$store.state.comment.commentDetail.name"
                    readonly
                    plain-text
                  />
                </div>
              </CRow>
              <CRow class="mb-3">
                <CFormLabel for="" class="col-sm-2 col-form-label"
                  >Status</CFormLabel
                >
                <div class="col-sm-10">
                  <CBadge
                    v-if="this.$store.state.comment.commentDetail.isDisable === 0"
                    color="success"
                    shape="rounded-pill"
                    >Active</CBadge
                  >
                  <CBadge v-else color="danger" shape="rounded-pill"
                    >Inactive</CBadge
                  >
                </div>
              </CRow> -->
              <Crow class="mb-3">
                <router-link to="/pages/questions">
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
  name: 'QuestionDetail',
  data() {
    return {}
  },
  mounted() {
    this.$store.dispatch('getQuestionDetail', {
      questionId: this.$route.params.id,
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


