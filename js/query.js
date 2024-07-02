const queryUser = `{
  user {
    id
    login
    firstName
    lastName
    campus
    auditRatio
    events(where: {eventId: {_eq: 56}}) {
      level
    }
  }
}`;

const queryXp = `{
  transaction(order_by: {createdAt: desc} where: {type: {_eq: "xp"}, eventId: {_eq: 56}}) {
    createdAt
    amount
    object{
      name
    }
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
  limit: 10, 
    order_by: {createdAt: desc} 
    where: {type: {_eq: "xp"}, path: {_like: "%div-01%"}, _and: [{path: {_nlike: "%piscine%"}}, {path: {_nlike: "%checkpoint%"}}]}
  ) {
    amount
    object {
      name
    }
  }
}`;


const queryTotalProjet = `{
  xp_view: transaction(
    order_by: {createdAt: desc} 
    where: {type: {_eq: "xp"}, path: {_like: "%div-01%"}, _and: [{path: {_nlike: "%piscine%"}}, {path: {_nlike: "%checkpoint%"}}]}
  ) {
    amount
    object {
      name
    }
  }
}
`


const queryCurrentAndLastProject = `{
  progress(where: {eventId: {_eq: 56}}, order_by: {createdAt: desc}) {
    group {
      status
      createdAt
      object {
        name
      }
    }
  }
}
`

export { queryProject, querySkills, queryUser, queryXp, queryXpTotal, queryCurrentAndLastProject, queryTotalProjet };
