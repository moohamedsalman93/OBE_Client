import axios from "axios";

const api = process.env.REACT_APP_API_URL;

export const searchData = async (path,setData,setisLoading) => {
    console.log(api)
    setisLoading(true);
    try {
      const res = await axios.get(api + path);
      setData(res.data.data);
      setisLoading(false);
    } catch (err) {
      setData([]);
      setisLoading(false);
    }
  };

  export const getApi = async (path,setData,setisLoading) => {
    console.log(api)
    setisLoading(true);
    try {
      const res = await axios.get(api + path);
      setData(res.data.data);
      setisLoading(false);
    } catch (err) {
      setData([]);
      setisLoading(false);
    }
  };

  