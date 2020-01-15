export function install(options) {
  CORS()
  ROUTE('/', plain_version)
}

function plain_version() {
  this.plain('API of {0}\nVersion: {1}'.format(CONF.name, CONF.version))
}
