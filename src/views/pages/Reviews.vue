<template>
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader> <strong>Reviews</strong> </CCardHeader>
        <CCardBody>
          <CButton
            color="primary"
            @click="
              () => {
                visibleVerticallyCenteredScrollableDemo = true
              }
            "
            >Vertically centered scrollable modal</CButton
          >
          <CModal
            alignment="center"
            scrollable
            :visible="visibleVerticallyCenteredScrollableDemo"
            @close="
              () => {
                visibleVerticallyCenteredScrollableDemo = false
              }
            "
          >
            <CModalHeader>
              <CModalTitle>Modal title</CModalTitle>
            </CModalHeader>
            <CModalBody>
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
              dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
              ac consectetur ac, vestibulum at eros.
            </CModalBody>
            <CModalFooter>
              <CButton
                color="secondary"
                @click="
                  () => {
                    visibleVerticallyCenteredScrollableDemo = false
                  }
                "
              >
                Close
              </CButton>
              <CButton color="primary">Save changes</CButton>
            </CModalFooter>
          </CModal>
          <CTable hover>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">No</CTableHeaderCell>
                <CTableHeaderCell scope="col">Class</CTableHeaderCell>
                <CTableHeaderCell scope="col">Heading</CTableHeaderCell>
                <CTableHeaderCell scope="col">Heading</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow>
                <CTableHeaderCell scope="row">1</CTableHeaderCell>
                <CTableDataCell>Mark</CTableDataCell>
                <CTableDataCell>Otto</CTableDataCell>
                <CTableDataCell>@mdo</CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableHeaderCell scope="row">2</CTableHeaderCell>
                <CTableDataCell>Jacob</CTableDataCell>
                <CTableDataCell>Thornton</CTableDataCell>
                <CTableDataCell>@fat</CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableHeaderCell scope="row">3</CTableHeaderCell>
                <CTableDataCell colspan="2">Larry the Bird</CTableDataCell>
                <CTableDataCell>@twitter</CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
export default {
  name: 'Reviews',
  data() {
    return {
      visibleVerticallyCenteredScrollableDemo: false,
    }
  },
}
</script>
