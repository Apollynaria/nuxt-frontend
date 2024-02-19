const getShips = gql`
  query getShips($limit: Int!) {
    ships(limit: $limit) {
      id
      name
      type
    }
  }
`
export default getShips