export interface Track {
  name: string
  artist: string
  album: string
  image: string
  url: string
  isPlaying: boolean
  service: 'spotify' | 'apple-music'
  progress_ms?: number
  duration_ms?: number
}

const CACHE_TTL = 60 // seconds

// async function getSpotifyNowPlaying(
//   config: RuntimeConfig
// ): Promise<Track | null> {
//   try {
//     const clientId = config.spotifyClientId
//     const clientSecret = config.spotifyClientSecret
//     const refreshToken = config.spotifyRefreshToken
//
//     if (!clientId || !clientSecret || !refreshToken) {
//       return null
//     }
//
//     const tokenResponse: {
//       access_token: string
//       expires_in: number
//       token_type: string
//       scope: string
//     } = await $fetch('https://accounts.spotify.com/api/token', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//         Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`
//       },
//       body: new URLSearchParams({
//         grant_type: 'refresh_token',
//         refresh_token: refreshToken
//       }).toString()
//     })
//
//     const accessToken = tokenResponse.access_token
//
//     const currentlyPlaying = (await $fetch(
//       'https://api.spotify.com/v1/me/player/currently-playing',
//       {
//         headers: {
//           Authorization: `Bearer ${accessToken}`
//         }
//       }
//     ).catch(() => null)) as any
//
//     if (
//       !currentlyPlaying ||
//       !currentlyPlaying.is_playing ||
//       !currentlyPlaying.item
//     ) {
//       return null
//     }
//
//     const track = currentlyPlaying.item
//     const artists = track.artists.map((artist: any) => artist.name).join(', ')
//     const image = track.album.images[0]?.url || ''
//
//     return {
//       name: track.name,
//       artist: artists,
//       album: track.album.name,
//       image: image,
//       url: track.external_urls.spotify,
//       isPlaying: currentlyPlaying.is_playing,
//       service: 'spotify',
//       progress_ms: currentlyPlaying.progress_ms,
//       duration_ms: track.duration_ms
//     }
//   } catch (error) {
//     console.error('Spotify API error:', error)
//     return null
//   }
// }

const getAppleMusicRecent = defineCachedFunction(
  async (event, config: RuntimeConfig): Promise<Track | null> => {
    const token = config.appleMusicToken
    const userToken = config.appleMusicUserToken
    if (!token || !userToken) return null

    const res = (await $fetch(
      'https://api.music.apple.com/v1/me/recent/played/tracks?limit=1',
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Music-User-Token': userToken
        }
      }
    ).catch(() => null)) as any

    if (!res?.data?.length) return null
    const a = res.data[0].attributes
    return {
      name: a.name,
      artist: a.artistName,
      album: a.albumName,
      image: a.artwork.url.replace('{w}x{h}bb.jpg', '400x400bb.jpg'),
      url: a.url,
      isPlaying: false,
      service: 'apple-music'
    }
  },
  {
    maxAge: CACHE_TTL,
    name: 'appleMusicRecent',
    getKey: () => 'current'
  }
)

export default defineEventHandler(async event => {
  try {
    const config = useRuntimeConfig()
    // const [spotify, appleMusic] = await Promise.allSettled([
    // getSpotifyNowPlaying(config),
    // getAppleMusicRecent(event, config)
    // ])

    // return spotify.status === 'fulfilled' && spotify.value
    //   ? spotify.value
    //   : appleMusic.status === 'fulfilled'
    //     ? appleMusic.value
    //     : null
    return getAppleMusicRecent(event, config)
  } catch (error) {
    console.error('Now playing API error:', error)
    return null
  }
})
