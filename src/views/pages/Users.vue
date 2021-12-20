<template>
  <CRow>
    <CCol :lg="12">
      <CCard class="mb-40">
        <CCardHeader> <strong>Users</strong> </CCardHeader>
        <CCardBody>
          <CRow class="justify-content-start">
            <CCol xs="1">
              <!-- <CFormSelect style size="sm">
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
              </CFormSelect> -->
            </CCol>
          </CRow>
          <CTable hover>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">No</CTableHeaderCell>
                <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Username</CTableHeaderCell>
                <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                <CTableHeaderCell scope="col">Google Mail</CTableHeaderCell>
                <CTableHeaderCell scope="col">Facebook Mail</CTableHeaderCell>
                <CTableHeaderCell scope="col">Country</CTableHeaderCell>
                <!-- <CTableHeaderCell scope="col">Bio</CTableHeaderCell> -->
                <!-- <CTableHeaderCell scope="col">Followers</CTableHeaderCell>
                <CTableHeaderCell scope="col">Following</CTableHeaderCell>
                <CTableHeaderCell scope="col">Product Posted</CTableHeaderCell> -->
                <!-- <CTableHeaderCell scope="col"
                  >Product Reviewed</CTableHeaderCell
                >
                <CTableHeaderCell scope="col">Question Posted</CTableHeaderCell>
                <CTableHeaderCell scope="col"
                  >Question Answered</CTableHeaderCell
                > -->
                <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                <CTableHeaderCell scope="col">Action</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody v-for="(u, idx) in $store.state.user.users" :key="idx">
              <CTableRow>
                <CTableHeaderCell scope="row">{{ idx + 1 +  ((currentPage -1) * perPage) }}</CTableHeaderCell>

                <CTableDataCell>{{ u.name }}</CTableDataCell>
                <CTableDataCell>{{ u.username }}</CTableDataCell>
                <CTableDataCell>{{ u.email }}</CTableDataCell>
                <CTableDataCell>{{ u.googleMail }}</CTableDataCell>
                <CTableDataCell>{{ u.facebookMail }}</CTableDataCell>
                <CTableDataCell>{{ u.country }}</CTableDataCell>
                <!-- <CTableDataCell>{{ u.countedFollowers }}</CTableDataCell>
                <CTableDataCell>{{ u.countedFollowing }}</CTableDataCell>
                <CTableDataCell>{{ u.countedProductReviewed }}</CTableDataCell>
                <CTableDataCell>{{ u.countedQuestionAnswer }}</CTableDataCell> -->
                <!-- <CTableDataCell>{{ u.bio }}</CTableDataCell> -->
                <!-- <CTableDataCell
                  :v-html="
                    () => {
                      sanitizedText(u.bio)
                    }
                  "
                ></CTableDataCell> -->
                <!-- <CTableDataCell>{{ u.bio }}</CTableDataCell> -->
                <CTableDataCell>
                  <CBadge
                    v-if="u.isEnable === 1"
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
                        userId = u.userId
                        isEnable = u.isEnable
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
                      <CModalTitle v-if="u.isEnable === 1"
                        >Enable Review</CModalTitle
                      >
                      <CModalTitle v-else>Disable Review</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                      Are you sure want to
                      <strong>
                        <template v-if="isEnable === 0">enable</template>
                        <template v-else>disable</template></strong
                      >
                      this user ?
                    </CModalBody>
                    <CModalFooter>
                      <CButton
                        size="sm"
                        color="secondary"
                        :disabled="isLoading"
                        @click="
                          () => {
                            visibleStaticBackdrop = false
                            isDisable = u.isEnable
                          }
                        "
                      >
                        No
                      </CButton>
                      <CButton
                        size="sm"
                        color="primary"
                        :disabled="isLoading"
                        @click.prevent="onChangeStatusUser"
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
              :total-rows="$store.state.user.userTotal"
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
import userAPI from './../../apis/user'
import DOMPurify from 'dompurify'
export default {
  name: 'Users',
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
     this.$store.dispatch('getAllUser', {
        skip: this.skip,
        take: this.take,
      })
  },
  methods: {
    checkPage(page) {
      this.$store.dispatch('getAllUser', {
        skip: this.skip,
        take: this.take,
      })
      console.log(page)
    },
    sanitizedText(text) {
      var test = DOMPurify.sanitize(text)
      console.log(test)
      return test
    },
    convertDate(date) {
      var yourDate = new Date(date)
      return yourDate.toISOString().split('T')[0]
    },
    async onChangeStatusUser() {
      this.isLoading = true
      let data = {
        userId: this.userId,
      }
      if (this.isEnable === 1) {
        const response = await userAPI.disableUser(data)
        if (response.isSuccess) {
          this.$store.dispatch('getAllUser', {
            skip: this.skip,
            take: this.take,
          })
          this.visibleStaticBackdrop = false
          this.isLoading = false
        }
      } else {
        const response = await userAPI.enableUser(data)
        if (response.isSuccess) {
          this.$store.dispatch('getAllUser', {
            skip: this.skip,
            take: this.take,
          })
          this.visibleStaticBackdrop = false
          this.isLoading = false
        }
      }
    },
    async updateReview() {
      this.isLoading = true
      let data = {
        reviewId: this.reviewId,
      }
      debugger
      if (this.isDisable === 1) {
        const response = await userAPI.enableReview(data)
        if (response.isSuccess) {
          this.$store.dispatch('getAllUser', {
            skip: this.skip,
            take: this.take,
          })
          this.visibleStaticBackdrop = false
          this.isLoading = false
        }
      } else {
        const response = await userAPI.disableReview(data)
        if (response.isSuccess) {
          this.$store.dispatch('getAllUser', {
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
