queryUser `{
    user {
      id
      login
      firstName
      lastName
      campus
      auditRatio
      totalUp
      totalDown
      attrs
    }
}`
  
queryXp `{
  transaction(where: {type: {_eq: "xp"}, eventId: {_eq: 56}}) {
    createdAt
    amount
    path
    type
  }
}`
  
queryAudits `{
  transaction(order_by: {createdAt: asc}, where: {type: {_regex: "up|down"}}) {
    type
    amount
    path
    createdAt
  }
}
`
  
querySkills `{
  transaction(where: {eventId: {_eq: 56}, _and: {type: {_like: "skill_%"}}}) {
    type
    amount
    path
  }
}`
  

queryXpTotal `{
  transaction_aggregate {
    aggregate {
      sum {
        amount
      }
    }
  }
}`
  
queryProject `{
  xp_view: transaction(
    where: {
      type: {_eq: "xp"},
      path: {_like: "%div-01%"},
      _and: [
        {path: {_nlike: "%piscine%"}},
        {path: {_nlike: "%checkpoint%"}}
      ]
    }
  ) {
    amount
    path
  }
}` 
  

  