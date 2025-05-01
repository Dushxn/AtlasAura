import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import Home from "../../pages/Home"
import { getAllCountries, getCountryByName, getCountriesByRegion } from "../../services/countryAPI"

// Mock the API services
jest.mock("../../services/countryAPI", () => ({
  getAllCountries: jest.fn(),
  getCountryByName: jest.fn(),
  getCountriesByRegion: jest.fn(),
}))

describe("Home Page", () => {
  const mockCountries = [
    {
      name: { common: "Canada", official: "Canada" },
      capital: ["Ottawa"],
      region: "Americas",
      population: 38005238,
      flags: { svg: "https://example.com/flag.svg", alt: "Flag of Canada" },
      cca3: "CAN",
      languages: { eng: "English", fra: "French" },
    },
    {
      name: { common: "Brazil", official: "Federative Republic of Brazil" },
      capital: ["Brasília"],
      region: "Americas",
      population: 212559417,
      flags: { svg: "https://example.com/flag.svg", alt: "Flag of Brazil" },
      cca3: "BRA",
      languages: { por: "Portuguese" },
    },
    {
      name: { common: "Germany", official: "Federal Republic of Germany" },
      capital: ["Berlin"],
      region: "Europe",
      population: 83240525,
      flags: { svg: "https://example.com/flag.svg", alt: "Flag of Germany" },
      cca3: "DEU",
      languages: { deu: "German" },
    },
  ]

  beforeEach(() => {
    jest.clearAllMocks()
    getAllCountries.mockResolvedValue({ data: mockCountries })
    getCountryByName.mockResolvedValue({ data: mockCountries.filter((c) => c.name.common === "Canada") })
    getCountriesByRegion.mockResolvedValue({ data: mockCountries.filter((c) => c.region === "Americas") })
  })

  test("renders explore countries title", async () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>,
    )

    expect(screen.getByText("Explore Countries")).toBeInTheDocument()

    await waitFor(() => {
      expect(getAllCountries).toHaveBeenCalled()
    })
  })

  test("shows loading skeleton while fetching countries", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>,
    )

    expect(screen.getByTestId("country-skeleton")).toBeInTheDocument()
  })

  test("displays countries after loading", async () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>,
    )

    await waitFor(() => {
      expect(screen.getByText("Canada")).toBeInTheDocument()
      expect(screen.getByText("Brazil")).toBeInTheDocument()
      expect(screen.getByText("Germany")).toBeInTheDocument()
    })
  })

  test("filters countries by search term", async () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>,
    )

    await waitFor(() => {
      expect(getAllCountries).toHaveBeenCalled()
    })

    const searchInput = screen.getByPlaceholderText("Search countries by name...")
    fireEvent.change(searchInput, { target: { value: "Canada" } })

    await waitFor(() => {
      expect(getCountryByName).toHaveBeenCalledWith("Canada")
      expect(screen.getByText("Canada")).toBeInTheDocument()
      expect(screen.queryByText("Brazil")).not.toBeInTheDocument()
    })
  })

  test("filters countries by region", async () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>,
    )

    await waitFor(() => {
      expect(getAllCountries).toHaveBeenCalled()
    })

    const regionButton = screen.getByText("Filter by Region")
    fireEvent.click(regionButton)

    const americasOption = await screen.findByText("Americas")
    fireEvent.click(americasOption)

    await waitFor(() => {
      expect(getCountriesByRegion).toHaveBeenCalledWith("Americas")
      expect(screen.getByText("Canada")).toBeInTheDocument()
      expect(screen.getByText("Brazil")).toBeInTheDocument()
      expect(screen.queryByText("Germany")).not.toBeInTheDocument()
    })
  })

  test("filters countries by language", async () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>,
    )

    await waitFor(() => {
      expect(getAllCountries).toHaveBeenCalled()
    })

    const languageButton = screen.getByText("Filter by Language")
    fireEvent.click(languageButton)

    const englishOption = await screen.findByText("English")
    fireEvent.click(englishOption)

    await waitFor(() => {
      expect(screen.getByText("Canada")).toBeInTheDocument()
      expect(screen.queryByText("Brazil")).not.toBeInTheDocument()
      expect(screen.queryByText("Germany")).not.toBeInTheDocument()
    })
  })

  test("shows no countries message when no results found", async () => {
    getAllCountries.mockResolvedValue({ data: [] })
    getCountryByName.mockResolvedValue({ data: [] })

    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>,
    )

    const searchInput = screen.getByPlaceholderText("Search countries by name...")
    fireEvent.change(searchInput, { target: { value: "NonExistentCountry" } })

    await waitFor(() => {
      expect(screen.getByText("No countries found matching your criteria.")).toBeInTheDocument()
    })
  })

  test("resets filters when reset button is clicked", async () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>,
    )

    await waitFor(() => {
      expect(getAllCountries).toHaveBeenCalled()
    })

    // Apply search filter
    const searchInput = screen.getByPlaceholderText("Search countries by name...")
    fireEvent.change(searchInput, { target: { value: "NonExistentCountry" } })

    await waitFor(() => {
      expect(screen.getByText("No countries found matching your criteria.")).toBeInTheDocument()
    })

    // Click reset button
    const resetButton = screen.getByText("Reset Filters")
    fireEvent.click(resetButton)

    await waitFor(() => {
      expect(screen.getByText("Canada")).toBeInTheDocument()
      expect(screen.getByText("Brazil")).toBeInTheDocument()
      expect(screen.getByText("Germany")).toBeInTheDocument()
    })
  })
})
