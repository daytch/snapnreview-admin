<template>
  <CRow>
    <CCol>
      <CCard class="mb-4">
        <CCardHeader> <strong>Question Comment Details</strong> </CCardHeader>
        <CCardBody>
          <CForm>
            <div
              v-if="this.$store.state.questionComment.commentDetail === null"
            >
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
                    :value="
                      this.$store.state.questionComment.commentDetail.user_name
                    "
                    readonly
                    plain-text
                  />
                </div>
              </CRow>
              <CRow class="mb-3">
                <CFormLabel for="staticEmail" class="col-sm-2 col-form-label"
                  >Answer Detail</CFormLabel
                >
                <div class="col-sm-10">
                  <router-link
                    :to="`/pages/answerdetail/${this.$store.state.questionComment.commentDetail.questionAnswersId}`"
                  >
                    Go To Detail
                  </router-link>
                </div>
              </CRow>
              <CRow class="mb-3">
                <CFormLabel for="" class="col-sm-2 col-form-label"
                  >Comment</CFormLabel
                >
                <div class="col-sm-10">
                  <CFormInput
                    type="text"
                    id="title"
                    :value="
                      this.$store.state.questionComment.commentDetail.comments
                    "
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
                    v-if="this.$store.state.questionComment.commentDetail.isDisable === 0"
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
                <CFormLabel for="staticEmail" class="col-sm-2 col-form-label"
                  >Review Detail</CFormLabel
                >
                <div class="col-sm-10">
                   <router-link
                    :to="`/pages/reviewdetail/${this.$store.state.comment.commentDetail.reviewId}`"
                  >
                  Go To Detail
                  </router-link>
                </div>
              </CRow>
              <CRow class="mb-3">
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
              </CRow>-->
              <Crow class="mb-3">
                <router-link to="/pages/questionComment">
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
  name: 'QuestionCommentDetails',
  data() {
    return {}
  },
  mounted() {
    this.$store.dispatch('getQuestionCommentById', {
      questionCommentId: this.$route.params.id,
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


