export interface IPaginationOptions {
  currentPage?: number
  limitPerPage?: number
}

export interface IPaginationResult<T> {
  data?: T[]
  previous?: {
    page: number
    limit: number
  }
  next?: {
    page: number
    limit: number
  }
}
