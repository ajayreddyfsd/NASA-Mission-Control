//$ Helps implement pagination in MongoDB or any database.
//$ Helps implement pagination in MongoDB or any database.
//$ Helps implement pagination in MongoDB or any database.

const DEFAULT_PAGE_NUMBER = 1; // If no page is provided, start from page 1
const DEFAULT_PAGE_LIMIT = 0; // If no limit is provided, return all items (0 = no limit)

// This function calculates how many documents to skip and limit per page
function getPagination(query) {
  // Take the 'page' from query, make sure it's positive, default to 1
  const page = Math.abs(query.page) || DEFAULT_PAGE_NUMBER;

  // Take the 'limit' from query, make sure it's positive, default to 0 (no limit)
  const limit = Math.abs(query.limit) || DEFAULT_PAGE_LIMIT;

  // Calculate how many items to skip based on page and limit
  // E.g., page 2 with limit 10 → skip = (2-1)*10 = 10 items
  const skip = (page - 1) * limit;

  return {
    skip, // how many docs to skip in DB query
    limit, // how many docs to return
  };
}

// Export the function so other files can use it
module.exports = {
  getPagination,
};

