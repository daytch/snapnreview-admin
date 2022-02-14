<template>
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader> <strong>Comments</strong> </CCardHeader>
        <CCardBody>
          <CTable hover>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">No</CTableHeaderCell>
                <CTableHeaderCell scope="col">User</CTableHeaderCell>
                <CTableHeaderCell scope="col">Comment</CTableHeaderCell>
                <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                <CTableHeaderCell scope="col">Detail</CTableHeaderCell>
                <CTableHeaderCell scope="col">Action</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow
                v-for="(r, idx) in $store.state.questionComment.comment"
                :key="idx"
              >
                <CTableHeaderCell scope="row">{{
                  idx + 1 + (currentPage - 1) * perPage
                }}</CTableHeaderCell>
                <CTableDataCell>{{ r.user_name }}</CTableDataCell>
                <CTableDataCell>{{ r.comments }}</CTableDataCell>
                <CTableDataCell>
                  <CBadge
                    v-if="r.isDisable === 0"
                    color="success"
                    shape="rounded-pill"
                    >Active</CBadge
                  >
                  <CBadge v-else color="danger" shape="rounded-pill"
                    >Inactive</CBadge
                  >
                </CTableDataCell>
                <CTableDataCell>
                  <router-link
                    :to="`/pages/questioncommentdetail/${r.questionCommentId}`"
                  >
                    <CIcon name="cil-search"
                  /></router-link>
                </CTableDataCell>
                <CTableDataCell>
                  <CButton
                    size="sm"
                    color="primary"
                    @click="
                      () => {
                        commentId = r.questionCommentId
                        isDisable = r.isDisable
                        visibleStaticBackdrop = true
                      }
                    "
                  >
                    <CIcon name="cil-pencil" />
                  </CButton>
                  <CModal
                    backdrop="static"
                    alignment="center"
                    :visible="visibleStaticBackdrop"
                    @close="
                      () => {
                        visibleStaticBackdrop = false
                      }
                    "
                  >
                    <CModalHeader>
                      <CModalTitle v-if="isDisable === 1"
                        >Enable Comment</CModalTitle
                      >
                      <CModalTitle v-else>Disable Comment</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                      Are you sure want to
                      <strong>
                        <template v-if="isDisable === 1">enable</template>
                        <template v-else>disable</template></strong
                      >
                      this comment ?
                    </CModalBody>

                    <CModalFooter>
                      <CButton
                        size="sm"
                        color="secondary"
                        :disabled="isLoading"
                        @click="
                          () => {
                            visibleStaticBackdrop = false
                            isDisable = r.isDisable
                          }
                        "
                      >
                        No
                      </CButton>
                      <CButton
                        size="sm"
                        color="primary"
                        :disabled="isLoading"
                        @click.prevent="updateQuestionComment"
                      >
                        <template v-if="isLoading">
                          <CSpinner
                            component="span"
                            size="sm"
                            aria-hidden="true"
                          />
                          Loading...</template
                        >
                        <template v-else>Yes</template></CButton
                      >
                    </CModalFooter>
                  </CModal>
                </CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
          <div class="overflow-auto">
            <b-pagination
              v-model="currentPage"
              :total-rows="$store.state.comment.totalRecord"
              :per-page="perPage"
              aria-controls="my-table"
              :change="checkPage(currentPage)"
            ></b-pagination>
          </div>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import comment from '../../apis/questionComment'
export default {
  name: 'QuestionComments',
  data() {
    return {
      visibleStaticBackdrop: false,
      commentId: 0,
      isDisable: 0,
      isLoading: false,
      currentPage: 1,
      perPage: 5,
      totalRows: 1,
    }
  },
  mounted() {
    this.$store.dispatch('getAllCommentWithReported', {
      skip: this.skip,
      take: this.take,
    })
  },
  methods: {
    checkPage(page) {
      this.$store.dispatch('getAllCommentWithReported', {
        skip: this.skip,
        take: this.take,
      })
      console.log(page)
    },
    async updateQuestionComment() {
      this.isLoading = true
      let data = {
        questionCommentId: this.commentId,
      }
      if (this.isDisable === 1) {
        const response = await comment.enableQuestionComment(data)
        if (response.isSuccess) {
          this.$store.dispatch('getAllCommentWithReported', {
            skip: this.skip,
            take: this.take,
          })
          this.visibleStaticBackdrop = false
          this.isLoading = false
        }
      } else {
        const response = await comment.disableQuestionComment(data)
        if (response.isSuccess) {
          this.$store.dispatch('getAllCommentWithReported', {
            skip: this.skip,
            take: this.take,
          })
          this.visibleStaticBackdrop = false
          this.isLoading = false
        }
      }
    },
  },
  computed: {
    skip: function () {
      return (this.currentPage - 1) * this.perPage
    },
    take: function () {
      return this.perPage
    },
  },
}
</script>
