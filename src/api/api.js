import axios from "axios";
import { toast } from "react-hot-toast";

const api = process.env.REACT_APP_API_URL;

export const searchData = async (path, setData, setisLoading) => {
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

export const getApi = async (path, setData, setisLoading) => {
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

export const putApi = async (path, setData, data, setisLoading) => {
  console.log(api)
  setisLoading(true);
  try {
    const res = await axios.put(api + path, data);
    setData(res.data);
    setisLoading(false);
    return res
  } catch (err) {
    setData([]);
    setisLoading(false);
  }
};

export const loginApi = async (path, data, setisLoading) => {
  setisLoading(true);
  try {
    const res = await axios.post(api + path, data);
    setisLoading(false);
    return res
  } catch (err) {
    console.log(err)
    toast.error(err.message)
    setisLoading(false);
  }
};

