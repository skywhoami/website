export async function useGitHub(username: string) {
  const query = `
    query getUser($login: String!) {
      user(login: $login) {
        avatarUrl
        name
        bio
        pronouns
        status {
          emoji
        }
        ... on Sponsorable {
          sponsoring(first: 10) {
            nodes {
              ... on User {
                login
                name
                avatarUrl
              }
            }
          }
        }
      }
    }
  `

  const variables = { login: username }

  const {
    data: profile,
    pending,
    error,
    refresh
  } = await useFetch(`https://api.github.com/graphql`, {
    method: 'POST',
    key: `github-profile-${username}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
    },
    body: { query, variables }
  })

  return {
    profile: profile.value,
    pending,
    error,
    refresh
  }
}
