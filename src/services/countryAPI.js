import axios from "axios"

const BASE_URL = "https://restcountries.com/v3.1"

// Create axios instance with some defaults
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
})

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error)
    return Promise.reject(error)
  },
)

// Get all countries with essential fields only
export const getAllCountries = () =>
  api.get("/all?fields=name,capital,region,subregion,population,flags,cca3,latlng,languages")

// Search country by name
export const getCountryByName = (name) =>
  api.get(`/name/${name}?fields=name,capital,region,subregion,population,flags,cca3,latlng,languages`)

// Get countries by region
export const getCountriesByRegion = (region) =>
  api.get(`/region/${region}?fields=name,capital,region,subregion,population,flags,cca3,latlng,languages`)

// Get country by code
export const getCountryByCode = (code) => api.get(`/alpha/${code}`)

// Get countries by language (this is a client-side filter since the API doesn't support it directly)
export const getCountriesByLanguage = async (languageCode) => {
  const response = await getAllCountries()
  const filtered = response.data.filter((country) => {
    if (!country.languages) return false
    return Object.keys(country.languages).includes(languageCode)
  })
  return { data: filtered }
}

// Get countries by currency (this is a client-side filter)
export const getCountriesByCurrency = async (currency) => {
  const response = await getAllCountries()
  const filtered = response.data.filter((country) => {
    if (!country.currencies) return false
    return Object.keys(country.currencies).some((curr) => curr.toLowerCase().includes(currency.toLowerCase()))
  })
  return { data: filtered }
}

// Get bordering countries
export const getBorderingCountries = async (countryCodes) => {
  if (!countryCodes || countryCodes.length === 0) return { data: [] }
  return api.get(`/alpha?codes=${countryCodes.join(",")}`)
}
