<template>
  <CRow>
    <CCol :lg="12">
      <CCard class="mb-40">
        <CModal
          backdrop="static"
          alignment="center"
          :visible="visibleErrorModal"
          @close="
            () => {
              visibleErrorModal = false
            }
          "
        >
          <CModalHeader>
            <CModalTitle>Error</CModalTitle>
          </CModalHeader>
          <CModalBody>
            {{ errorMessage }}
          </CModalBody>
          <CModalFooter>
            <CButton
              size="sm"
              color="secondary"
              :disabled="isLoading"
              @click="
                () => {
                  visibleErrorModal = false
                  errorMessage = ''
                }
              "
            >
              OK
            </CButton>
          </CModalFooter>
        </CModal>
        <CCardHeader> <strong>Users</strong> </CCardHeader>
        <CCardBody>
          <div class="d-grid gap-2 d-md-flex justify-content-md-end">
            <CButton
              color="primary"
              size="sm"
              @click="
                () => {
                  visibleModalAddAdmin = true
                }
              "
              >Add Admin</CButton
            >
          </div>
          <CModal
            size="lg"
            backdrop="static"
            alignment="center"
            :visible="visibleModalAddAdmin"
            @close="
              () => {
                visibleModalAddAdmin = false
              }
            "
          >
            <CModalHeader>
              <CModalTitle>Add Admin User</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <CFormLabel>Username</CFormLabel>
              <CFormInput
                v-model="username"
                type="text"
                size="sm"
                placeholder="Username"
                :value="username"
                v-on:keypress="isLetterOrNumber($event)"
              />
              <CFormLabel>Email</CFormLabel>
              <CFormInput
                v-model="email"
                type="email"
                size="sm"
                placeholder="Email@email.com"
                :value="email"
              />
              <CFormLabel>Full Name</CFormLabel>
              <CFormInput
                v-model="fullName"
                type="text"
                size="sm"
                placeholder="Full Name"
                :value="fullName"
              />
              <CFormLabel>Password</CFormLabel>
              <CFormInput
                v-model="password"
                type="password"
                size="sm"
                placeholder="Password"
                :value="password"
              />
              <CFormLabel>Re-type Password</CFormLabel>
              <CFormInput
                v-model="retypePassword"
                type="password"
                size="sm"
                placeholder="Re-type Password"
                :value="retypePassword"
              />

              <div v-if="formError.count != 0">
                <ul>
                  <li v-for="item in formError" :key="item">{{ item }}</li>
                </ul>
              </div>
            </CModalBody>
            <CModalFooter>
              <CButton
                size="sm"
                color="secondary"
                :disabled="isLoading"
                @click="
                  () => {
                    visibleModalAddAdmin = false
                  }
                "
              >
                Close
              </CButton>
              <CButton
                size="sm"
                color="primary"
                :disabled="isLoading"
                @click.prevent="addUser"
              >
                <template v-if="isLoading">
                  <CSpinner component="span" size="sm" aria-hidden="true" />
                  Loading...</template
                >
                <template v-else>Add</template></CButton
              >
            </CModalFooter>
          </CModal>
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
                <CTableHeaderCell scope="row">{{
                  idx + 1 + (currentPage - 1) * perPage
                }}</CTableHeaderCell>

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
      visibleModalAddAdmin: false,
      visibleErrorModal: false,
      errorMessage: '',
      isDisable: 0,
      isLoading: false,
      currentPage: 1,
      perPage: 5,
      totalRows: 1,
      username: '',
      email: '',
      fullName: '',
      password: '',
      retypePassword: '',
      formError: [],
    }
  },
  computed: {
    skip: function () {
      return (this.currentPage - 1) * this.perPage
    },
    take: function () {
      return this.perPage
    },
  },
  mounted() {
    this.$store.dispatch('getAllUser', {
      skip: this.skip,
      take: this.take,
    })
  },
  methods: {
    isLetterOrNumber(e) {
      let char = String.fromCharCode(e.keyCode)
      if (/^[A-Za-z0-9]+$/.test(char)) return true
      else e.preventDefault()
    },
    async addUser() {
      this.isLoading = true
      this.formError = []
      let emailExp = new RegExp(
        '[a-zA-Z0-9_\\.\\+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-\\.]+',
      )
      if (this.username === '') {
        this.formError.push('username is not valid')
      }
      if (!emailExp.test(this.email)) {
        this.formError.push('Email is not valid')
      }
      if (this.password !== this.retypePassword) {
        this.formError.push('Password is not same with Re-type password')
      }
  
      if (this.formError.length > 0) {
        this.isLoading = false
        return
      }
      var data = {
        email: this.email,
        password: this.password,
        username: this.username,
        name: this.fullName,
        token: 'WebToken',
        type: 'web',
      }
      var response = await userAPI.registerAdmin(data)
      if (response.isSuccess) {
        this.visibleModalAddAdmin = false
      } else {
         this.visibleModalAddAdmin = false
        this.visibleErrorModal = true
        this.errorMessage = response.message
      }

      this.isLoading = false
    },
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
}
</script>
