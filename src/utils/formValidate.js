const validateFields = {
  email: {
    required: "Required field.",
    validate: {
      maxLength: (v) =>
        v.length <= 50 || "The email should have at most 50 characters",
      matchPattern: (v) =>
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
        "Invalid email",
    },
  },
  password: {
    required: "Required field.",
    validate: {
      minLength: (v) =>
        v.length >= 6 || "Password should not be less than 5 characters",
    },
  },
  confirmPassword: {
    required: "Required field.",
    validate: {
      minLength: (v) =>
        v.length >= 6 || "Password should not be less than 5 characters",
    },
  },
  currentPassword: {
    required: "Please enter your current password",
    validate: {
      minLength: (v) =>
        v.length >= 6 || "Password should not be less than 5 characters",
    },
  },
  username: {
    required: "Required field.",
    validate: {
      minLength: (v) =>
        v.length >= 3 || "Username should have at least 3 characters",
      matchPattern: (v) =>
        /^[a-zA-Z0-9_]+$/.test(v) ||
        "Username must contain only letters, numbers and _",
    },
  },
  fullname: {
    required: "Required field.",
  },
  address: {
    required: "Required field.",
  },
  phone: {
    required: "Required field.",
  },
  state: {
    required: "Required field.",
  },
  country: {
    required: "Required field.",
  },
};

export default validateFields;
