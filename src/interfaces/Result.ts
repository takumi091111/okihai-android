interface SuccessResult<D> {
  ok: true
  data?: D
}

interface ErrorResult<DE> {
  ok: false
  data?: DE
  error?:
    | string
    | {
        [key: string]: string[]
      }
}

export type Result<D, DE> = {
  statusCode: number
} & (SuccessResult<D> | ErrorResult<DE>)

export type NotificationResult = Omit<
  Result<{ token: string }, null>,
  'statusCode'
>

export type CameraResult = Omit<Result<null, null>, 'statusCode'>
