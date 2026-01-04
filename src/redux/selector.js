// ✅ Get user data
export const selectUser = (state) => state.auth.user;

// ✅ Get loader (loading state)
export const selectAuthloader = (state) => state.auth.loading;

// ✅ Get error message (fix: should match `state.auth.error`)
export const selectAuthErrorMessage = (state) => state.auth.error;
