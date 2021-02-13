import { httpReponse, httpRequest } from './http'

export interface Controller {
  handle: (httpRequest: httpRequest) => httpReponse
}
