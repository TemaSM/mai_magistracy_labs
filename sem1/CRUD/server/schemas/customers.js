NEWSCHEMA('Customers', function (schema) {

  schema.define('id', 'UID')(() => UID())
  schema.define('firstname', 'Capitalize2(15)', true)
  schema.define('lastname', 'Capitalize2(15)', true)

  schema.define('createdAt', Date)(() => new Date()) // NOW / F.datetime
  schema.define('updatedAt', Date)(() => new Date()) // NOW / F.datetime

  schema.setQuery(function ($) {
    const builder = NOSQL('customers').find()
    if ($.query.search) {
      builder.or()
      builder.search('firstname', $.query.search)
      builder.search('lastname', $.query.search)
      builder.end()
    }
    builder.sort('createdAt', true)
    builder.callback($.callback)
  })

  schema.setGet(function ($) {
    const customers = NOSQL('customers')
    customers.one().make(builder => {
      builder.where('id', $.id)
      builder.callback($.callback, 'error-customer-404')
    })
  })

  schema.setInsert(function ($) {
    const data = $.clean()
    // data.firstname = $.body.firstname
    // data.lastname = $.body.lastname
    NOSQL('customers').insert(data).callback($.done(data.id))
  })

  schema.setUpdate(function ($) {
    const data = $.clean()
    NOSQL('customers').modify(data).backup().make(builder => {
      builder.where('id', $.id)
      builder.callback($.done($.id))
    })
  })

  schema.setRemove(function ($) {
    NOSQL('customers').remove().backup().make(builder => {
      builder.where('id', $.id)
      builder.callback($.done($.id))
    })
  })
})
