// query user {
//     user {
//       id
//       login
//       firstName
//       lastName
//       campus
//       auditRatio
//       totalUp
//       totalDown
//       attrs
//     }
//   }
  
//   query xp {
//     transaction(where: {type: {_eq: "xp"}, eventId: {_eq: 56}}) {
//       createdAt
//       amount
//       path
//       type
//     }
//   }
  
//   query audits {
//     transaction(order_by: {createdAt: asc}, where: {type: {_regex: "up|down"}}) {
//       type
//       amount
//       path
//       createdAt
//     }
//   }
  
//   query skills {
//     transaction(where: {eventId: {_eq: 56}, _and: {type: {_like: "skill_%"}}}) {
//       type
//       amount
//     }
//   }
  
//   query xpTotal {
//     transaction_aggregate {
//       aggregate {
//         sum {
//           amount
//         }
//       }
//     }
//   }
  
//   query xp_view {
//     xp_view: transaction(where: {type: {_eq: "xp"}, path: {_like: "%div-01%"}}) {
//       amount
//       path
//     }
//   }
  
//   query progress {
//     progress: transaction {
//       attrs
//       progress {
//         grade
//         version
//       }
//       path
//     }
//   }
  