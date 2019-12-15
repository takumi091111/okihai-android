interface SuccessResult<D> {
  ok: true
  data?: D
}

interface ErrorResult<DE> {
  ok: false
  data?: DE
  error?: string | {
    [key: string]: string[]
  }
}

export type Result<D, DE> = {
  statusCode: number
} & (SuccessResult<D> | ErrorResult<DE>)
