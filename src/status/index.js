export const STATUS = {
  pending: 'pending',
  success: 'success',
  fail: 'fail',
  empty: null
}

export const status = {
  isSuccess(status) {
    return status === STATUS.success
  },

  isPending(status) {
    return status ===  STATUS.pending
  },

  isFail(status) {
    return status === STATUS.fail
  }
}
