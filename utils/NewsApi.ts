import { newsApiKey } from "./ApiKey";
import axios from "axios";


// Endpoints

const apiBaseUrl = "https://gnews.io/api/v4";

const breakingNewsUrl = `${apiBaseUrl}/top-headlines?category=general&apikey=${newsApiKey}`;

const recommendedNewsUrl = `${apiBaseUrl}/search&apikey=${newsApiKey}`;

const localNews = 
  `${apiBaseUrl}/top-headlines?lang=ar&apikey=${newsApiKey}`;

const discoverNewsUrl = (discover:string) =>
  `${apiBaseUrl}/top-headlines?country=us&category=${discover}&apikey=${newsApiKey}`;


const searchNewsUrl = (query:string) =>
  `${apiBaseUrl}/search?q=${query}&apikey=${newsApiKey}`;

const newsApiCall = async (endpoints:string, params?:string) => {
  const options = {
    method: "GET",
    url: endpoints,
    params: params ? params : {},
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log(error);
    return {};
  }
};

export const fetchBreakingNews = async () => {
  return await newsApiCall(breakingNewsUrl);
};

export const fetchRecommendedNews = async () => {
  return await newsApiCall(recommendedNewsUrl);
};

export const fetchDiscoverNews = async (discover:string) => {
  return await newsApiCall(discoverNewsUrl(discover));
};

export const fetchLocalNews = async () => {
  console.info (localNews);
  return await newsApiCall(localNews);
}

export const fetchSearchNews = async (query:string) => {
  const endpoint = searchNewsUrl(query);
  return await newsApiCall(endpoint);
};
