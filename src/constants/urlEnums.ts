export enum URL {
  // Searching channels
  // Method - GET
  // URL - /channels?find[title]=*title*
  // Desc - return a paginated list of channels matching the search-term, title.
  SearchChannels = '/channels?find[title]=',

  // Channel details
  // Method - GET
  // URL - /channels/*channel_id*
  // Desc - return the details for the channel specified by the channel_id parameter.
  ChannelDetails = '/channels/',

  // Channel audio clips
  // Method - GET
  // URL - /channels/*channel_id*/audio_clips
  // Desc - return the audio_clips for the channel specified by the channel_id parameter.
  ChannelAudioClips = '/channels/',

  // Recommended Channels
  // Method - GET
  // URL - /channels/recommended
  // Desc - Returns a list of recommended channels.
  RecommendedChannels = '/channels/recommended',
}
