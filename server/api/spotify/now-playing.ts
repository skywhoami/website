export default defineEventHandler(async (event) => {
    try {
        const config = useRuntimeConfig();

        const clientId = config.spotifyClientId;
        const clientSecret = config.spotifyClientSecret;
        const refreshToken = config.spotifyRefreshToken;

        if (!clientId || !clientSecret || !refreshToken) {
            return null;
        }

        const tokenResponse: {
            access_token: string;
            expires_in: number;
            token_type: string;
            scope: string;
        } = await $fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${btoa(`${clientId}:${clientSecret}`)}`
            },
            body: new URLSearchParams({
                grant_type: 'refresh_token',
                refresh_token: refreshToken
            }).toString()
        });

        const accessToken = tokenResponse.access_token;

        const currentlyPlaying = await $fetch('https://api.spotify.com/v1/me/player/currently-playing', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }).catch(() => null);

        if (!currentlyPlaying || !currentlyPlaying.is_playing || !currentlyPlaying.item) {
            return null;
        }

        const track = currentlyPlaying.item;
        const artists = track.artists.map((artist: any) => artist.name).join(', ');
        const image = track.album.images[0]?.url || '';

        return {
            name: track.name,
            artist: artists,
            album: track.album.name,
            image: image,
            url: track.external_urls.spotify,
            isPlaying: currentlyPlaying.is_playing
        };

    } catch (error) {
        console.error('Spotify API error:', error);
        return null;
    }
});
