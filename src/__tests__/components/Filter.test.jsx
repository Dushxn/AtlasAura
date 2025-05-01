import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import Filter from "../../components/Filter"

describe("Filter Component", () => {
  const mockOnRegionChange = jest.fn()
  const mockOnLanguageChange = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test("renders region and language filters", () => {
    render(<Filter onRegionChange={mockOnRegionChange} onLanguageChange={mockOnLanguageChange} />)

    expect(screen.getByText("Filter by Region")).toBeInTheDocument()
    expect(screen.getByText("Filter by Language")).toBeInTheDocument()
  })

  test("opens region dropdown when clicked", async () => {
    render(<Filter onRegionChange={mockOnRegionChange} onLanguageChange={mockOnLanguageChange} />)

    const regionButton = screen.getByText("Filter by Region")
    fireEvent.click(regionButton)

    await waitFor(() => {
      expect(screen.getByText("Africa")).toBeInTheDocument()
      expect(screen.getByText("Americas")).toBeInTheDocument()
      expect(screen.getByText("Asia")).toBeInTheDocument()
      expect(screen.getByText("Europe")).toBeInTheDocument()
      expect(screen.getByText("Oceania")).toBeInTheDocument()
    })
  })

  test("opens language dropdown when clicked", async () => {
    render(<Filter onRegionChange={mockOnRegionChange} onLanguageChange={mockOnLanguageChange} />)

    const languageButton = screen.getByText("Filter by Language")
    fireEvent.click(languageButton)

    await waitFor(() => {
      expect(screen.getByText("English")).toBeInTheDocument()
      expect(screen.getByText("Spanish")).toBeInTheDocument()
      expect(screen.getByText("French")).toBeInTheDocument()
    })
  })

  test("calls onRegionChange when a region is selected", async () => {
    render(<Filter onRegionChange={mockOnRegionChange} onLanguageChange={mockOnLanguageChange} />)

    const regionButton = screen.getByText("Filter by Region")
    fireEvent.click(regionButton)

    await waitFor(() => {
      const africaOption = screen.getByText("Africa")
      fireEvent.click(africaOption)
    })

    expect(mockOnRegionChange).toHaveBeenCalledWith("Africa")
  })

  test("calls onLanguageChange when a language is selected", async () => {
    render(<Filter onRegionChange={mockOnRegionChange} onLanguageChange={mockOnLanguageChange} />)

    const languageButton = screen.getByText("Filter by Language")
    fireEvent.click(languageButton)

    await waitFor(() => {
      const englishOption = screen.getByText("English")
      fireEvent.click(englishOption)
    })

    expect(mockOnLanguageChange).toHaveBeenCalledWith("eng")
  })

  test("shows clear filters button when filters are applied", async () => {
    const { rerender } = render(<Filter onRegionChange={mockOnRegionChange} onLanguageChange={mockOnLanguageChange} />)

    // Initially, clear button should not be visible
    expect(screen.queryByText("Clear filters")).not.toBeInTheDocument()

    // Select a region
    const regionButton = screen.getByText("Filter by Region")
    fireEvent.click(regionButton)

    await waitFor(() => {
      const africaOption = screen.getByText("Africa")
      fireEvent.click(africaOption)
    })

    // Force rerender with selected region
    rerender(<Filter onRegionChange={mockOnRegionChange} onLanguageChange={mockOnLanguageChange} />)

    // Now clear button should be visible
    expect(screen.queryByText("Clear filters")).toBeInTheDocument()
  })

  test("clears filters when clear button is clicked", async () => {
    render(<Filter onRegionChange={mockOnRegionChange} onLanguageChange={mockOnLanguageChange} />)

    // Select a region
    const regionButton = screen.getByText("Filter by Region")
    fireEvent.click(regionButton)

    await waitFor(() => {
      const africaOption = screen.getByText("Africa")
      fireEvent.click(africaOption)
    })

    // Force rerender with selected region
    const { rerender } = render(<Filter onRegionChange={mockOnRegionChange} onLanguageChange={mockOnLanguageChange} />)

    // Click clear button
    const clearButton = screen.getByText("Clear filters")
    fireEvent.click(clearButton)

    expect(mockOnRegionChange).toHaveBeenCalledWith("")
    expect(mockOnLanguageChange).toHaveBeenCalledWith("")
  })
})
