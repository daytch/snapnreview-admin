<template>
  <div class="bg-light min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="4">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm>
                  <h1>Login</h1>
                  <p class="text-medium-emphasis">Sign In to your account</p>
                  <CInputGroup class="mb-3">
                    <CInputGroupText>
                      <CIcon icon="cil-user" />
                    </CInputGroupText>
                    <CFormInput
                      v-model="username"
                      placeholder="Username"
                      autocomplete="username"
                      :value="username"
                      @change="updateUsername"
                    />
                  </CInputGroup>
                  <CInputGroup class="mb-4">
                    <CInputGroupText>
                      <CIcon icon="cil-lock-locked" />
                    </CInputGroupText>
                    <CFormInput
                      v-model="password"
                      type="password"
                      placeholder="Password"
                      autocomplete="current-password"
                      :value="password"
                      @change="updatePassword"
                    />
                  </CInputGroup>
                  <CRow>
                    <CCol :xs="6">
                      <CButton
                        color="primary"
                        class="px-4"
                        @click.prevent="login"
                      >
                        Login
                      </CButton>
                    </CCol>
                    <CCol :xs="6" class="text-right">
                      <CButton color="link" class="px-0">
                        Forgot password?
                      </CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
    }
  },
  computed: {
    ...mapState({
      username: (state) => state.username,
      password: (state) => state.password,
    }),
  },
  methods: {
    updateUsername(event) {
      this.$store.commit(
        'setUsername',
        typeof event == 'string' ? event : event.target.value,
      )
    },
    updatePassword(event) {
      this.$store.commit(
        'setPassword',
        typeof event == 'string' ? event : event.target.value,
      )
    },
    login() {
      this.updateUsername(this.username)
      this.updatePassword(this.password)
      this.$store.dispatch('loginAction')
    },
  },
}
</script>
