NEWSCHEMA('Products', function (schema) {

  schema.define('id', 'UID')(() => UID())
  schema.define('name', 'Capitalize2(30)', true)
  schema.define('price', 'Number2', true)
  schema.define('createdAt', Date)(() => new Date()) // NOW / F.datetime
  schema.define('updatedAt', Date)(() => new Date()) // NOW / F.datetime

  schema.setQuery(function ($) {
    const builder = NOSQL('products').find()
    if ($.query.search) builder.search('name', $.query.search)
    builder.sort('createdAt', true)
    builder.callback($.callback)
  })

  schema.setGet(function ($) {
    const products = NOSQL('products')
    products.one().make(builder => {
      builder.where('id', $.id)
      builder.callback($.callback, 'error-product-404')
    })
  })

  schema.setInsert(function ($) {
    const data = $.clean()
    // data.name = $.body.name
    // data.price = Number($.body.price)
    NOSQL('products').insert(data).callback($.done(data.id))
  })

  schema.setUpdate(function ($) {
    const data = $.clean()
    NOSQL('products').modify(data).backup().make(builder => {
      builder.where('id', $.id)
      builder.callback($.done($.id))
    })
  })

  schema.setRemove(function ($) {
    NOSQL('products').remove().backup().make(builder => {
      builder.where('id', $.id)
      builder.callback($.done($.id))
    })
  })

})
