import type { FormRules } from 'element-plus'

export function useLoginFormRules(): FormRules {
  return {
    username: [
      { required: true, message: 'login.usernameRequired', trigger: 'blur' },
      { min: 3, message: 'login.usernameMinLength', trigger: 'blur' },
    ],
    password: [
      { required: true, message: 'login.passwordRequired', trigger: 'blur' },
      { min: 6, message: 'login.passwordMinLength', trigger: 'blur' },
    ],
  }
}

export function useUserFormRules(): FormRules {
  return {
    username: [
      { required: true, message: 'user.usernameRequired', trigger: 'blur' },
      { min: 3, max: 20, message: 'user.usernameLength', trigger: 'blur' },
    ],
    name: [
      { required: true, message: 'user.nameRequired', trigger: 'blur' },
    ],
    email: [
      { required: true, message: 'user.emailRequired', trigger: 'blur' },
      { type: 'email', message: 'user.emailInvalid', trigger: 'blur' },
    ],
    phone: [
      { required: true, message: 'user.phoneRequired', trigger: 'blur' },
      { pattern: /^1[3-9]\d{9}$/, message: 'user.phoneInvalid', trigger: 'blur' },
    ],
    role: [
      { required: true, message: 'user.roleRequired', trigger: 'change' },
    ],
  }
}

export function useDataFormRules(): FormRules {
  return {
    name: [
      { required: true, message: 'data.nameRequired', trigger: 'blur' },
    ],
    type: [
      { required: true, message: 'data.typeRequired', trigger: 'change' },
    ],
  }
}
