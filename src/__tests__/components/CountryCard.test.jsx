import { render, screen, fireEvent } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import CountryCard from "../../components/CountryCard"
import { useAuth } from "../../auth/AuthContext"

// Mock the auth context
jest.mock("../../auth/AuthContext", () => ({
  useAuth: jest.fn(),
}))

describe("CountryCard Component", () => {
  const mockCountry = {
    name: { common: "Canada", official: "Canada" },
    capital: ["Ottawa"],
    region: "Americas",
    population: 38005238,
    flags: { svg: "https://example.com/flag.svg", alt: "Flag of Canada" },
    cca3: "CAN",
  }

  const mockUser = { username: "testuser" }
  const mockAddToFavorites = jest.fn()
  const mockRemoveFromFavorites = jest.fn()
  const mockIsFavorite = jest.fn()

  beforeEach(() => {
    useAuth.mockReturnValue({
      user: mockUser,
      addToFavorites: mockAddToFavorites,
      removeFromFavorites: mockRemoveFromFavorites,
      isFavorite: mockIsFavorite,
    })
  })

  test("renders country card with correct information", () => {
    mockIsFavorite.mockReturnValue(false)

    render(
      <BrowserRouter>
        <CountryCard country={mockCountry} />
      </BrowserRouter>,
    )

    expect(screen.getByText("Canada")).toBeInTheDocument()
    expect(screen.getByText("Ottawa")).toBeInTheDocument()
    expect(screen.getByText("Americas")).toBeInTheDocument()
    expect(screen.getByText("38,005,238")).toBeInTheDocument()
  })

  test("shows favorite button when user is logged in", () => {
    mockIsFavorite.mockReturnValue(false)

    render(
      <BrowserRouter>
        <CountryCard country={mockCountry} />
      </BrowserRouter>,
    )

    // Favorite button should be present
    const favoriteButton = screen.getByLabelText("Add to favorites")
    expect(favoriteButton).toBeInTheDocument()
  })

  test("does not show favorite button when user is not logged in", () => {
    useAuth.mockReturnValue({
      user: null,
      isFavorite: mockIsFavorite,
    })

    render(
      <BrowserRouter>
        <CountryCard country={mockCountry} />
      </BrowserRouter>,
    )

    // Favorite button should not be present
    expect(screen.queryByLabelText("Add to favorites")).not.toBeInTheDocument()
    expect(screen.queryByLabelText("Remove from favorites")).not.toBeInTheDocument()
  })

  test("calls addToFavorites when favorite button is clicked", () => {
    mockIsFavorite.mockReturnValue(false)

    render(
      <BrowserRouter>
        <CountryCard country={mockCountry} />
      </BrowserRouter>,
    )

    const favoriteButton = screen.getByLabelText("Add to favorites")
    fireEvent.click(favoriteButton)

    expect(mockAddToFavorites).toHaveBeenCalledWith(mockCountry)
  })

  test("calls removeFromFavorites when unfavorite button is clicked", () => {
    mockIsFavorite.mockReturnValue(true)

    render(
      <BrowserRouter>
        <CountryCard country={mockCountry} />
      </BrowserRouter>,
    )

    const unfavoriteButton = screen.getByLabelText("Remove from favorites")
    fireEvent.click(unfavoriteButton)

    expect(mockRemoveFromFavorites).toHaveBeenCalledWith("CAN")
  })

  test("shows loading state before image is loaded", () => {
    mockIsFavorite.mockReturnValue(false)

    render(
      <BrowserRouter>
        <CountryCard country={mockCountry} />
      </BrowserRouter>,
    )

    // Before image load, skeleton should be visible
    const skeleton = screen.getByTestId("image-skeleton")
    expect(skeleton).toBeInTheDocument()

    // Simulate image load
    const image = screen.getByAltText("Flag of Canada")
    fireEvent.load(image)

    // After image load, skeleton should not be visible
    expect(screen.queryByTestId("image-skeleton")).not.toBeInTheDocument()
  })
})
