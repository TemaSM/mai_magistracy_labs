MERGE('/css/default.css', '/css/ui.css', '/css/default.css')
MERGE('/js/default.js', '/js/ui.js', '/js/default.js')

F.onLocale = function (req) {
  if (req.language.includes('ru')) {
    return 'ru'
  }
  return 'en'
}
