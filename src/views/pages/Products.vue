<template>
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader> <strong>Products</strong> </CCardHeader>
        <CCardBody>
          <CTable hover>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">No</CTableHeaderCell>
                <CTableHeaderCell scope="col">Product</CTableHeaderCell>
                <CTableHeaderCell scope="col">Category</CTableHeaderCell>
                <CTableHeaderCell scope="col">Uploaded By</CTableHeaderCell>
                <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                <CTableHeaderCell scope="col">Action</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody
              v-for="(p, index) in $store.state.product.product"
              :key="index"
            >
              <CTableRow>
                <CTableHeaderCell scope="row">{{ index + 1 }}</CTableHeaderCell>
                <CTableDataCell>{{ p.product }}</CTableDataCell>
                <CTableDataCell>{{ p.category }}</CTableDataCell>
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
                      <CModalTitle v-if="p.isDisable === 1"
                        >Enable Product</CModalTitle
                      >
                      <CModalTitle v-else>Disable Product</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                      Are you sure want to
                      <strong>
                        <template v-if="p.isDisable === 1">enable</template
                        ><template v-else>disable</template></strong
                      >
                      this product <strong>({{ p.product }})</strong>?
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
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import product from './../../apis/product.js'

export default {
  name: 'Products',
  data() {
    return {
      productId: 0,
      visibleStaticBackdrop: false,
      isDisable: 0,
      isLoading: false,
    }
  },
  mounted() {
    this.$store.dispatch('getAllProduct')
  },
  methods: {
    async updateProduct() {
      this.isLoading = true
      if (this.isDisable === 1) {
        const response = await product.enableProduct({
          productId: this.productId,
        })
        if (response.isSuccess) {
          this.$store.dispatch('getAllProduct')
          this.visibleStaticBackdrop = false
          this.isLoading = false
        }
      } else {
        const response = await product.disableProduct({
          productId: this.productId,
        })
        if (response.isSuccess) {
          this.$store.dispatch('getAllProduct')
          this.visibleStaticBackdrop = false
          this.isLoading = false
        }
      }
    },
  },
}
</script>
