<template>
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader> <strong>Questions</strong> </CCardHeader>
        <CCardBody>
          <CTable hover>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">No</CTableHeaderCell>
                <CTableHeaderCell scope="col">Title</CTableHeaderCell>
                <CTableHeaderCell scope="col">Category</CTableHeaderCell>
                <CTableHeaderCell scope="col">Posted By</CTableHeaderCell>
                <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                <CTableHeaderCell scope="col">Details</CTableHeaderCell>
                <CTableHeaderCell scope="col">Action</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow
                v-for="(r, idx) in $store.state.question.question"
                :key="idx"
              >
                <CTableHeaderCell scope="row">{{
                  idx + 1 + (currentPage - 1) * perPage
                }}</CTableHeaderCell>
                <CTableDataCell>{{ r.title }}</CTableDataCell>
                <CTableDataCell>{{ r.categoryName }}</CTableDataCell>
                <CTableDataCell>{{ r.name }}</CTableDataCell>
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
                  <router-link :to="`/pages/questiondetail/${r.questionId}`">
                    <CIcon name="cil-search"
                  /></router-link>
                </CTableDataCell>
                <CTableDataCell>
                  <CButton
                    size="sm"
                    color="primary"
                    @click="
                      () => {
                        questionId = r.questionId
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
                        >Enable Question</CModalTitle
                      >
                      <CModalTitle v-else>Disable Question</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                      Are you sure want to
                      <strong>
                        <template v-if="isDisable === 1">enable</template>
                        <template v-else>disable</template></strong
                      >
                      this review ?
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
                        @click.prevent="updateQuestion"
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
              :total-rows="$store.state.question.totalRecord"
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
import question from './../../apis/question'
export default {
  name: 'Questions',
  data() {
    return {
      questionId: 0,
      visibleStaticBackdrop: false,
      isDisable: 0,
      isLoading: false,
      currentPage: 1,
      perPage: 5,
      totalRows: 1,
    }
  },
  mounted() {
    // this.$store.dispatch('getAllQuestion', {
    //   skip: this.skip,
    //   take: this.take,
    // })
  },
  methods: {
    checkPage(page) {
      this.$store.dispatch('getAllQuestion', {
        skip: this.skip,
        take: this.take,
      })
      console.log(page)
    },
    async updateQuestion() {
      this.isLoading = true
      let data = {
        questionId: this.questionId,
      }
      debugger
      if (this.isDisable === 1) {
        const response = await question.enableQuestion(data)
        if (response.isSuccess) {
          this.$store.dispatch('getAllQuestion', {
            skip: this.skip,
            take: this.take,
          })
          this.visibleStaticBackdrop = false
          this.isLoading = false
        }
      } else {
        const response = await question.disableQuestion(data)
        if (response.isSuccess) {
          this.$store.dispatch('getAllQuestion', {
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
