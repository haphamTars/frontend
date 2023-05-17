import axiosClient from "./axiosClient";

const stationApi = {
  getStations: () => {
    const url = `station`;
    return axiosClient.get(url);
  }
};

export default stationApi;
