<template>
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader> <strong>Product Reports</strong> </CCardHeader>
        <CCardBody>
          <CTable hover>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">No</CTableHeaderCell>
                <CTableHeaderCell scope="col">Product</CTableHeaderCell>
                <CTableHeaderCell scope="col">Category</CTableHeaderCell>
                <CTableHeaderCell scope="col">Posted By</CTableHeaderCell>
                <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                <CTableHeaderCell scope="col">Details</CTableHeaderCell>
                <CTableHeaderCell scope="col">Action</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody v-for="(p, index) in checkTest()" :key="index">
              <CTableRow>
                <CTableHeaderCell scope="row">{{
                  index + 1 + (currentPage - 1) * perPage
                }}</CTableHeaderCell>
                <CTableDataCell>{{ p.productname }}</CTableDataCell>
                <CTableDataCell>{{ p.categoryName }}</CTableDataCell>
                <CTableDataCell>{{ p.name }}</CTableDataCell>
                <CTableDataCell>
                  <CBadge
                    v-if="p.isDisable === 0"
                    color="success"
                    shape="rounded-pill"
                    >Active</CBadge
                  >
                  <CBadge v-else color="danger" shape="rounded-pill"
                    >Inactive</CBadge
                  >
                </CTableDataCell>
                <CTableDataCell>
                 <router-link :to="`/pages/productdetails/${p.id}`"> <CIcon name="cil-search" /></router-link>
                </CTableDataCell>
                <CTableDataCell>
                  <CButton
                    size="sm"
                    color="primary"
                    @click="
                      () => {
                        productId = p.id
                        isDisable = p.isDisable
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
                        >Enable Product</CModalTitle
                      >
                      <CModalTitle v-else>Disable Product</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                      Are you sure want to
                      <strong>
                        <template v-if="isDisable === 1">enable</template
                        ><template v-else>disable</template></strong
                      >
                      this product <strong>({{ p.productname }})</strong>?
                    </CModalBody>
                    <CModalFooter>
                      <CButton
                        size="sm"
                        color="secondary"
                        :disabled="isLoading"
                        @click="
                          () => {
                            visibleStaticBackdrop = false
                          }
                        "
                      >
                        No
                      </CButton>
                      <CButton
                        size="sm"
                        color="primary"
                        :disabled="isLoading"
                        @click.prevent="updateProduct"
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
              :total-rows="$store.state.product.totalRecord"
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
import product from '../../apis/product.js'

export default {
  name: 'Product Reports',
  data() {
    return {
      productId: 0,
      visibleStaticBackdrop: false,
      isDisable: 0,
      isLoading: false,
      currentPage: 1,
      perPage: 5,
      totalRows: 1,
    }
  },
  mounted() {
    this.$store.dispatch('getAllProduct', {
      skip: this.skip,
      take: this.take,
    })
  },
  methods: {
    checkTest() {
      var test = this.$store.state.product.product
      console.log(test)
      return test
    },
    async checkPage(page) {
      await this.$store.dispatch('getAllProduct', {
        skip: this.skip,
        take: this.take,
      })
      console.log(page)
    },
    async updateProduct() {
      this.isLoading = true
      if (this.isDisable === 1) {
        const response = await product.enableProduct({
          productId: this.productId,
        })
        if (response.isSuccess) {
          this.$store.dispatch('getAllProduct', {
            skip: this.skip,
            take: this.take,
          })
          this.visibleStaticBackdrop = false
          this.isLoading = false
        }
      } else {
        const response = await product.disableProduct({
          productId: this.productId,
        })
        if (response.isSuccess) {
          this.$store.dispatch('getAllProduct', {
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
