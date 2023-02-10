import {
  IPaginationResult,
  IPaginationOptions,
} from "../models/interfaces/IPaginate"

// Return pagination results
export const paginate = async function <T>(
  this: any,
  query: any,
  options: IPaginationOptions
) {
  const { currentPage = 1, limitPerPage = 10 } = options

  // Start Index: (1 - 1) * 10 = 0
  // End Index: 1 * 10 = 10
  // Find results between 1 - 10
  const startIndex = (currentPage - 1) * limitPerPage
  const endIndex = currentPage * limitPerPage

  // Setup results
  const results: IPaginationResult<T> = {}

  // Set previous page's configuration
  // If startIndex is over 0, (page is more than )
  if (startIndex > 0) {
    results.previous = {
      page: currentPage - 1,
      limit: limitPerPage,
    }
  }

  // Skip to the results to the provided startIndex:
  // Skip to results past the startIndex of 10, and limit the results by limitPerPage
  // If there is a query, then also use query along side find
  results.data = (await this.find(query)
    .skip(startIndex)
    .limit(limitPerPage)) as T[]

  // If endIndex has less than the total number of documents, meaning that there is another page
  // If they are more pages, than next needs to be set
  if (endIndex < (await this.countDocuments(query))) {
    results.next = {
      page: currentPage + 1,
      limit: limitPerPage,
    }
  }

  // Return query results
  return results
}
