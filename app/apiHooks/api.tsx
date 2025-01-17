import { DOMAIN } from "@/constant";
import axios from "axios";

export const api = axios.create({
   
    baseURL: `${DOMAIN}/api/v1`,
})