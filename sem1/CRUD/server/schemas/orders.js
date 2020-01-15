NEWSCHEMA('Orders', function (schema) {

  schema.define('id', 'UID')(() => UID())
  schema.define('customer_id', 'UID', true)
  schema.define('products_ids', '[UID]', true)

  schema.define('createdAt', Date)(() => new Date()) // NOW / F.datetime
  schema.define('updatedAt', Date)(() => new Date()) // NOW / F.datetime

  schema.setQuery(function ($) {
    const builder = NOSQL('orders').find()
    // if ($.query.search) builder.search('name', $.query.search)
    builder.sort('createdAt', true)
    builder.callback($.callback)
  })

  schema.setGet(function ($) {
    const orders = NOSQL('orders')
    orders.one().make(builder => {
      builder.where('id', $.id)
      builder.callback($.callback, 'error-order-404')
    })
  })

  schema.setInsert(function ($) {
    const data = $.clean()
    data.customer_id = $.query.customer_id
    data.product_ids = $.query.product_ids
    NOSQL('orders').insert(data).callback($.done(data.id))
  })

  schema.setUpdate(function ($) {
    const data = $.clean()
    NOSQL('orders').modify(data).backup().make(builder => {
      builder.where('id', $.id)
      builder.callback($.done($.id))
    })
  })

  schema.setRemove(function ($) {
    NOSQL('orders').remove().backup().make(builder => {
      builder.where('id', $.id)
      builder.callback($.done($.id))
    })
  })

})
