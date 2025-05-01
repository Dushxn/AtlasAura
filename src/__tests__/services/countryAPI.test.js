import axios from "axios"
import {
  getAllCountries,
  getCountryByName,
  getCountriesByRegion,
  getCountryByCode,
  getCountriesByLanguage,
} from "../../services/countryAPI"

jest.mock("axios")

describe("Country API Service", () => {
  const mockAxiosInstance = {
    get: jest.fn(),
    interceptors: {
      response: {
        use: jest.fn(),
      },
    },
  }

  beforeEach(() => {
    jest.clearAllMocks()
    axios.create.mockReturnValue(mockAxiosInstance)
  })

  test("getAllCountries calls the correct endpoint", async () => {
    mockAxiosInstance.get.mockResolvedValue({ data: [] })

    await getAllCountries()

    expect(mockAxiosInstance.get).toHaveBeenCalledWith(
      "/all?fields=name,capital,region,subregion,population,flags,cca3,latlng,languages",
    )
  })

  test("getCountryByName calls the correct endpoint", async () => {
    mockAxiosInstance.get.mockResolvedValue({ data: [] })

    await getCountryByName("Canada")

    expect(mockAxiosInstance.get).toHaveBeenCalledWith(
      "/name/Canada?fields=name,capital,region,subregion,population,flags,cca3,latlng,languages",
    )
  })

  test("getCountriesByRegion calls the correct endpoint", async () => {
    mockAxiosInstance.get.mockResolvedValue({ data: [] })

    await getCountriesByRegion("Americas")

    expect(mockAxiosInstance.get).toHaveBeenCalledWith(
      "/region/Americas?fields=name,capital,region,subregion,population,flags,cca3,latlng,languages",
    )
  })

  test("getCountryByCode calls the correct endpoint", async () => {
    mockAxiosInstance.get.mockResolvedValue({ data: [] })

    await getCountryByCode("CAN")

    expect(mockAxiosInstance.get).toHaveBeenCalledWith("/alpha/CAN")
  })

  test("getCountriesByLanguage filters countries by language code", async () => {
    const mockCountries = [
      {
        name: { common: "Canada" },
        languages: { eng: "English", fra: "French" },
      },
      {
        name: { common: "United States" },
        languages: { eng: "English" },
      },
      {
        name: { common: "Brazil" },
        languages: { por: "Portuguese" },
      },
    ]

    mockAxiosInstance.get.mockResolvedValue({ data: mockCountries })

    const result = await getCountriesByLanguage("eng")

    expect(mockAxiosInstance.get).toHaveBeenCalled()
    expect(result.data).toHaveLength(2)
    expect(result.data[0].name.common).toBe("Canada")
    expect(result.data[1].name.common).toBe("United States")
  })
})
