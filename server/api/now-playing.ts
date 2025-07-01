export interface NowPlayingTrack {
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

let appleMusicCache: NowPlayingTrack | null = null
let appleMusicCacheTimestamp = 0
const CACHE_DURATION_MS = 1000 * 60 * 5

async function getSpotifyNowPlaying(
  config: RuntimeConfig
): Promise<NowPlayingTrack | null> {
  try {
    const clientId = config.spotifyClientId
    const clientSecret = config.spotifyClientSecret
    const refreshToken = config.spotifyRefreshToken

    if (!clientId || !clientSecret || !refreshToken) {
      return null
    }

    const tokenResponse: {
      access_token: string
      expires_in: number
      token_type: string
      scope: string
    } = await $fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken
      }).toString()
    })

    const accessToken = tokenResponse.access_token

    const currentlyPlaying = (await $fetch(
      'https://api.spotify.com/v1/me/player/currently-playing',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    ).catch(() => null)) as any

    if (
      !currentlyPlaying ||
      !currentlyPlaying.is_playing ||
      !currentlyPlaying.item
    ) {
      return null
    }

    const track = currentlyPlaying.item
    const artists = track.artists.map((artist: any) => artist.name).join(', ')
    const image = track.album.images[0]?.url || ''

    return {
      name: track.name,
      artist: artists,
      album: track.album.name,
      image: image,
      url: track.external_urls.spotify,
      isPlaying: currentlyPlaying.is_playing,
      service: 'spotify',
      progress_ms: currentlyPlaying.progress_ms,
      duration_ms: track.duration_ms
    }
  } catch (error) {
    console.error('Spotify API error:', error)
    return null
  }
}

async function getAppleMusicRecent(
  config: RuntimeConfig
): Promise<NowPlayingTrack | null> {
  const now = Date.now()

  if (appleMusicCache && now - appleMusicCacheTimestamp < CACHE_DURATION_MS) {
    return appleMusicCache
  }

  try {
    const token = config.appleMusicToken
    const userToken = config.appleMusicUserToken

    if (!token || !userToken) {
      return null
    }

    const currentlyPlaying = (await $fetch(
      'https://api.music.apple.com/v1/me/recent/played/tracks?limit=1',
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Music-User-Token': userToken
        }
      }
    ).catch(() => null)) as any

    if (!currentlyPlaying || currentlyPlaying.data.length === 0) {
      return null
    }

    const track = currentlyPlaying.data[0].attributes

    return {
      name: track.name,
      artist: track.artistName,
      album: track.albumName,
      image: track.artwork.url.replace('{w}x{h}bb.jpg', '400x400bb.jpg'),
      url: track.url,
      isPlaying: false,
      service: 'apple-music'
    }
  } catch (error) {
    console.error('Apple Music API error:', error)
    return null
  }
}

export default defineEventHandler(async event => {
  try {
    const config = useRuntimeConfig()
    const [spotifyResult, appleResult] = await Promise.allSettled([
      getSpotifyNowPlaying(config),
      getAppleMusicRecent(config)
    ])

    const spotifyTrack =
      spotifyResult.status === 'fulfilled' ? spotifyResult.value : null
    const appleMusicTrack =
      appleResult.status === 'fulfilled' ? appleResult.value : null

    return spotifyTrack || appleMusicTrack || null
  } catch (error) {
    console.error('Now playing API error:', error)
    return null
  }
})
