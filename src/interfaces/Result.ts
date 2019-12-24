interface SuccessResult<D> {
  ok: true
  data?: D
}

interface ErrorResult<DE> {
  ok: false
  data?: DE
}

export type Result<D, DE> = {
  statusCode: number
} & (SuccessResult<D> | ErrorResult<DE>)
