export async function useGitHubUser(username: string) {
  type Data = {
    data: {
      user: User
    }
  }

  type User = {
    avatarUrl: string
    name: string | null | undefined
    bio: string | null | undefined
    pronouns: string | null | undefined
    status: Status
    sponsoring: Sponsoring
    totalSponsorshipAmountAsSponsorInCents: number
  }

  type Sponsoring = {
    nodes: SponsorNode[]
  }

  type SponsorNode = {
    login: string
    name: string
    avatarUrl: string
  }

  type Status = {
    emojiHTML: string | null | undefined
    message: string | null | undefined
  }

  const query = `
    query getUser($login: String!) {
      user(login: $login) {
        avatarUrl
        name
        bio
        pronouns
        status {
          emojiHTML
          message
        }
        totalSponsorshipAmountAsSponsorInCents
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

  const { data, pending, error, refresh } = await useFetch<Data>(
    `https://api.github.com/graphql`,
    {
      method: 'POST',
      key: `github-profile-${username}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
      },
      body: { query, variables: { login: username } }
    }
  )

  return {
    data: data.value!.data.user,
    pending,
    error,
    refresh
  }
}
