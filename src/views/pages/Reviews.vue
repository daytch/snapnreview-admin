<template>
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader> <strong>Reviews</strong> </CCardHeader>
        <CCardBody>
          <CRow class="justify-content-start">
            <!-- <CCol xs="1">
              <CFormSelect style size="sm">
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="40">40</option>
                <option value="50">50</option>
                <option value="60">60</option>
                <option value="70">70</option>
                <option value="80">80</option>
                <option value="90">90</option>
                <option value="100">100</option>
              </CFormSelect>
            </CCol> -->
          </CRow>
          <CTable hover>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">No</CTableHeaderCell>
                <CTableHeaderCell scope="col">Review</CTableHeaderCell>
                <CTableHeaderCell scope="col">Category</CTableHeaderCell>
                <CTableHeaderCell scope="col">Posted By</CTableHeaderCell>
                <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                <CTableHeaderCell scope="col">Details</CTableHeaderCell>
                <CTableHeaderCell scope="col">Action</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody
              v-for="(r, idx) in $store.state.review.review"
              :key="idx"
            >
              <CTableRow>
                <CTableHeaderCell scope="row">{{
                  idx + 1 + (currentPage - 1) * perPage
                }}</CTableHeaderCell>
                <CTableDataCell>
                  <div v-html="r.reviewDescription"></div
                ></CTableDataCell>
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
                  <router-link :to="`/pages/reviewdetail/${r.reviewId}`">
                    <CIcon name="cil-search"
                  /></router-link>
                  <!-- <CButton
                    size="sm"
                    color="primary"
                    @click="
                      () => {
                        this.rou
                      }
                    "
                  >
                    <CIcon name="cil-search" />
                  </CButton> -->
                </CTableDataCell>
                <CTableDataCell>
                  <CButton
                    size="sm"
                    color="primary"
                    @click="
                      () => {
                        reviewId = r.reviewId
                        review = r.review
                        category = r.category
                        description = r.description
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
                      <CModalTitle v-else>Disable Review</CModalTitle>
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
                        @click.prevent="updateReview"
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
              :total-rows="$store.state.review.totalRecord"
              :per-page="perPage"
              aria-controls="my-table"
              :change="checkPage(currentPage)"
            ></b-pagination>
          </div>
          <!-- <CPagination align="end" aria-label="Page navigation example">
            <CPaginationItem disabled>Previous</CPaginationItem>
            <CPaginationItem href="#">1</CPaginationItem>
            <CPaginationItem href="#">2</CPaginationItem>
            <CPaginationItem href="#">3</CPaginationItem>
            <CPaginationItem href="#">Next</CPaginationItem>
          </CPagination> -->
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import review from './../../apis/review'
import DOMPurify from 'dompurify'
export default {
  name: 'Reviews',
  data() {
    return {
      reviewId: 0,
      visibleStaticBackdrop: false,
      isDisable: 0,
      isLoading: false,
      currentPage: 1,
      perPage: 5,
      totalRows: 1,
    }
  },
  mounted() {
    this.$store.dispatch('getAllReview', {
      skip: this.skip,
      take: this.take,
    })
  },
  methods: {
    checkPage(page) {
      this.$store.dispatch('getAllReview', {
        skip: this.skip,
        take: this.take,
      })
      console.log(page)
    },
    sanitizedText(text) {
      return DOMPurify.sanitize(text)
    },
    async updateReview() {
      this.isLoading = true
      let data = {
        reviewId: this.reviewId,
      }
      debugger
      if (this.isDisable === 1) {
        const response = await review.enableReview(data)
        if (response.isSuccess) {
          this.$store.dispatch('getAllReview', {
            skip: this.skip,
            take: this.take,
          })
          this.visibleStaticBackdrop = false
          this.isLoading = false
        }
      } else {
        const response = await review.disableReview(data)
        if (response.isSuccess) {
          this.$store.dispatch('getAllReview', {
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
