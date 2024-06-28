const queryUser = `{
  user {
    id
    login
    firstName
    lastName
    campus
    auditRatio
    totalUp
    totalDown
    events(where: {eventId: {_eq: 56}}) {
      level
    }
  }
}`;

const queryXp = `{
  transaction(where: {type: {_eq: "xp"}, eventId: {_eq: 56}}) {
    createdAt
    amount
    path
    type
  }
}`;

const queryAudits = `{
  transaction(order_by: {createdAt: asc}, where: {type: {_regex: "up|down"}}) {
    type
    amount
    path
    createdAt
  }
}`;

const querySkills = `{
  transaction(
    where: {eventId: {_eq: 56}, _and: {type: {_like: "skill_%"}}}
    distinct_on: type
    order_by: [{type: asc}, {amount: desc}]
  ) {
    type
    amount
  }
}`;

const queryXpTotal = `{
  transaction_aggregate(
    where: {transaction_type: {type: {_eq: "xp"}}, event: {path: {_eq: "/dakar/div-01"}}}
  ) {
    aggregate {
      sum {
        amount
      }
    }
  }
}`;

const queryProject = `{
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
}`;

const lastProjectValidated = `{
  xp_view: transaction(
    where: {
      type: {_eq: "xp"},
      path: {_like: "%div-01%"},
      _and: [
        {path: {_nlike: "%piscine%"}},
        {path: {_nlike: "%checkpoint%"}}
      ]
    },
    order_by: {createdAt: desc},
    limit: 1
  ) {
    amount
    path
  }
}
`

export { queryAudits, queryProject, querySkills, queryUser, queryXp, queryXpTotal };
