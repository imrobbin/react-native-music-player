import {AxiosError} from 'axios';
import {AxiosInstance} from '.';
import {URL} from '../constants';

interface Result {
  success: boolean;
  data: any;
  errorCode: number;
}

const ChannelService = {
  getRecommendedChannels: async () => {
    const result: Result = {
      success: false,
      data: null,
      errorCode: 0,
    };
    try {
      const {data} = await AxiosInstance.get(URL.RecommendedChannels);
      console.log('getRecommendedChannels result ', data);
      result.success = true;
      result.data = data;
      return result;
    } catch (error: any) {
      return checkResponseError(error);
    }
  },

  getSearchChannels: async (title: string) => {
    const result: Result = {
      success: false,
      data: null,
      errorCode: 0,
    };

    try {
      const {data} = await AxiosInstance.get(URL.SearchChannels + title);
      result.success = true;
      result.data = data.body.channels;
      return result;
    } catch (error: any) {
      return checkResponseError(error);
    }
  },

  getChannelAudioClips: async (channelID: string) => {
    const result: Result = {
      success: false,
      data: null,
      errorCode: 0,
    };

    try {
      const url = `${URL.ChannelAudioClips + channelID}/audio_clips`;
      const {data} = await AxiosInstance.get(url);
      result.success = true;
      result.data = data.body.audio_clips;
      return result;
    } catch (error: any) {
      return checkResponseError(error);
    }
  },
};

const checkResponseError = (error: AxiosError) => {
  const result: Result = {
    success: false,
    data: null,
    errorCode: 0,
  };
  console.log('error ', error);
  if (error.response) {
    /*
     * The request was made and the server responded with a
     * status code that falls out of the range of 2xx,(5xx, 4xx)
     */

    result.data = error.response.data;
    result.errorCode = error.response.status;
    return result;
  } else if (error.request) {
    /*
     * The request was made but no response was received, error.request
     * is an instance of XMLHttpRequest in the browser and an instance
     * of http.ClientRequest in Node.js
     */
    /*
     * you're in a spotty network (think underground subway, or a building wireless network)
     * if your backend is hanging on each request and not returning a response on time
     * if you are making cross-domain requests and you're not authorized to make the request
     * if you're making cross-domain requests and you are authorized, but the backend API returns an error
     */

    result.data = error.request;
    return result;
  } else {
    // Something happened in setting up the request and triggered an Error
    result.data = error.message;
    return result;
  }
};

export default ChannelService;
