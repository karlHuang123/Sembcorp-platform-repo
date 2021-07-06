import { get } from "@/api/https"

export const getSearchResult = (url: string, keyword: string) => get(url + keyword)
