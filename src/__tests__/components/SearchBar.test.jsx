import { render, screen, fireEvent } from "@testing-library/react"
import SearchBar from "../../components/SearchBar"

describe("SearchBar Component", () => {
  const mockOnSearch = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test("renders search input", () => {
    render(<SearchBar onSearch={mockOnSearch} />)

    const searchInput = screen.getByPlaceholderText("Search countries by name...")
    expect(searchInput).toBeInTheDocument()
  })

  test("calls onSearch when input changes", () => {
    render(<SearchBar onSearch={mockOnSearch} />)

    const searchInput = screen.getByPlaceholderText("Search countries by name...")
    fireEvent.change(searchInput, { target: { value: "Canada" } })

    expect(mockOnSearch).toHaveBeenCalledWith("Canada")
  })

  test("shows clear button when search has text", () => {
    render(<SearchBar onSearch={mockOnSearch} />)

    const searchInput = screen.getByPlaceholderText("Search countries by name...")

    // Initially, clear button should not be visible
    expect(screen.queryByLabelText("Clear search")).not.toBeInTheDocument()

    // Type in search
    fireEvent.change(searchInput, { target: { value: "Canada" } })

    // Now clear button should be visible
    expect(screen.getByLabelText("Clear search")).toBeInTheDocument()
  })

  test("clears search when clear button is clicked", () => {
    render(<SearchBar onSearch={mockOnSearch} />)

    const searchInput = screen.getByPlaceholderText("Search countries by name...")

    // Type in search
    fireEvent.change(searchInput, { target: { value: "Canada" } })

    // Click clear button
    const clearButton = screen.getByLabelText("Clear search")
    fireEvent.click(clearButton)

    // Input should be cleared
    expect(searchInput.value).toBe("")

    // onSearch should be called with empty string
    expect(mockOnSearch).toHaveBeenCalledWith("")
  })
})
