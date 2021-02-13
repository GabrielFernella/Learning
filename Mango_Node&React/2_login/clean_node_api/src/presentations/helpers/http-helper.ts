import { httpReponse } from '../protocols/http'

export const badRequest = (error: Error): httpReponse => {
  return {
    statusCode: 400,
    body: error
  }
}
