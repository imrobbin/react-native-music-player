import axios from 'axios';
import ChannelService from './channelService';

const AxiosInstance = axios.create({
  baseURL: 'https://api.audioboom.com',
  timeout: 1000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export { AxiosInstance, ChannelService };
export * from './playerSetupService';
