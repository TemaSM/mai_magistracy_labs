export function install(options) {
  GROUP('/api/', function () {
    ROUTE('GET    /orders/        *Orders --> @query')
    ROUTE('GET    /orders/{id}/   *Orders --> @read')
    ROUTE('POST   /orders/        *Orders --> @insert')
    ROUTE('PUT    /orders/{id}/   *Orders --> @update')
    ROUTE('DELETE /orders/{id}/   *Orders --> @remove')
  })
}
