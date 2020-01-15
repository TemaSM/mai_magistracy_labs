export function install(options) {
  GROUP('/api/', function () {
    ROUTE('GET    /customers/        *Customers --> @query')
    ROUTE('GET    /customers/{id}/   *Customers --> @read')
    ROUTE('POST   /customers/        *Customers --> @insert')
    ROUTE('PUT    /customers/{id}/   *Customers --> @update')
    ROUTE('DELETE /customers/{id}/   *Customers --> @remove')
  })
}
