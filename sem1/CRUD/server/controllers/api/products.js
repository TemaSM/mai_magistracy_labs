export function install(options) {
  GROUP('/api/', function () {
    ROUTE('GET    /products/        *Products --> @query')
    ROUTE('GET    /products/{id}/   *Products --> @read')
    ROUTE('POST   /products/        *Products --> @insert')
    ROUTE('PUT    /products/{id}/   *Products --> @update')
    ROUTE('DELETE /products/{id}/   *Products --> @remove')
  })
}
