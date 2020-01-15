export function install(options) {
  CORS()
  ROUTE('/')
  LOCALIZE('/forms/*.html')
  ROUTE('GET  /api/download/', download)
}

function download() {
  const self = this
  self.custom()
  U.download(self.query.url, ['get'], function (err, response) {
    if (err) {
      self.throw401()
      return
    }

    const headers = []
    headers['content-type'] = 'text/plain'
    self.res.writeHead(200, headers)
    response.pipe(self.res)
  })
}
