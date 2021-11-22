<template>
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader> <strong>Reported Comments</strong> </CCardHeader>
        <CCardBody>
          <CTable hover>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">No</CTableHeaderCell>
                <CTableHeaderCell scope="col">User</CTableHeaderCell>
                <CTableHeaderCell scope="col">Comment</CTableHeaderCell>
                <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                <CTableHeaderCell scope="col">Action</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow
                v-for="(r, idx) in $store.state.comment.comment"
                :key="idx"
              >
                <CTableHeaderCell scope="row">{{ idx + 1 }}</CTableHeaderCell>
                <CTableDataCell>{{ r.name }}</CTableDataCell>
                <CTableDataCell>{{ r.comment }}</CTableDataCell>
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
                  <CButton
                    size="sm"
                    color="primary"
                    @click="
                      () => {
                        commentId = r.reviewCommentId
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
                        >Enable Review</CModalTitle
                      >
                      <CModalTitle v-else>Disable Review Comment</CModalTitle>
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
                        @click.prevent="updateReviewComment"
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
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import comment from './../../apis/comment'
export default {
  name: 'Comments',
  data() {
    return {
      visibleStaticBackdrop: false,
      commentId: 0,
      isDisable: 0,
      isLoading: false,
    }
  },
  mounted() {
    this.$store.dispatch('getAllReviewComment')
  },
  methods: {
    async updateReviewComment() {
      this.isLoading = true
      let data = {
        reviewCommentId: this.commentId,
      }
      if (this.isDisable === 1) {
        const response = await comment.enableReviewComment(data)
        if (response.isSuccess) {
          this.$store.dispatch('getAllReviewComment')
          this.visibleStaticBackdrop = false
          this.isLoading = false
        }
      } else {
        const response = await comment.disableReviewComment(data)
        if (response.isSuccess) {
          this.$store.dispatch('getAllReviewComment')
          this.visibleStaticBackdrop = false
          this.isLoading = false
        }
      }
    },
  },
}
</script>
