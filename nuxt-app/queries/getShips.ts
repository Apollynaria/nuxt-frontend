const getShips = gql`
  query getShips($limit: Int!) {
    ships(limit: $limit) {
      id
      name
      type
      active
    }
  }
`
export default getShips