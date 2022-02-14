<template>
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader> <strong>Answers</strong> </CCardHeader>
        <CCardBody>
          <CTable hover>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">No</CTableHeaderCell>
                <CTableHeaderCell scope="col">Question</CTableHeaderCell>
                <CTableHeaderCell scope="col">Category</CTableHeaderCell>
                <CTableHeaderCell scope="col">Answer</CTableHeaderCell>
                <CTableHeaderCell scope="col">Posted By</CTableHeaderCell>
                <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                <CTableHeaderCell scope="col">Details</CTableHeaderCell>
                <CTableHeaderCell scope="col">Action</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow
                v-for="(r, idx) in $store.state.answer.answer"
                :key="idx"
              >
                <CTableHeaderCell scope="row">{{
                  idx + 1 + (currentPage - 1) * perPage
                }}</CTableHeaderCell>
                <CTableDataCell>{{ r.question }}</CTableDataCell>
                <CTableDataCell>{{ r.categoryName }}</CTableDataCell>
                <CTableDataCell>
                  <div v-html="r.answerDescription"></div
                ></CTableDataCell>
                <CTableDataCell>{{ r.whoAnswer }}</CTableDataCell>
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
                    :to="`/pages/answerdetail/${r.questionAnswerID}`"
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
                        questionAnswerID = r.questionAnswerID
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
                        >Enable Answer</CModalTitle
                      >
                      <CModalTitle v-else>Disable Answer</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                      Are you sure want to
                      <strong>
                        <template v-if="isDisable === 1">enable</template>
                        <template v-else>disable</template></strong
                      >
                      this answer ?
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
                        @click.prevent="updateAnswer"
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
              :total-rows="$store.state.answer.totalRecord"
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
import answer from './../../apis/answer'
export default {
  name: 'Answer',
  data() {
    return {
      questionAnswerID: 0,
      visibleStaticBackdrop: false,
      isDisable: 0,
      isLoading: false,
      currentPage: 1,
      perPage: 5,
      totalRows: 1,
    }
  },
  mounted() {
    this.$store.dispatch('getAllAnswer', {
      skip: this.skip,
      take: this.take,
    })
  },
  methods: {
    checkPage(page) {
      this.$store.dispatch('getAllAnswer', {
        skip: this.skip,
        take: this.take,
      })
      console.log(page)
    },
    async updateAnswer() {
      this.isLoading = true
      let data = {
        questionAnswerId: this.questionAnswerID,
      }

      if (this.isDisable === 1) {
        const response = await answer.enableAnswer(data)
        debugger
        if (response.isSuccess) {
          this.$store.dispatch('getAllAnswer', {
            skip: this.skip,
            take: this.take,
          })
          this.visibleStaticBackdrop = false
          this.isLoading = false
        }
      } else {
        const response = await answer.disableAnswer(data)
        if (response.isSuccess) {
          this.$store.dispatch('getAllAnswer', {
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
