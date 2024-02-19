const getRockets = gql`
    query getRockets($offset: Int!) {
        rockets(limit: $offset) {
            id
            name
            wikipedia
            active
            country
        mass {
                kg
                lb
            }
            company
        diameter {
                meters
                feet
            }
        }
    }
`
export default getRockets
