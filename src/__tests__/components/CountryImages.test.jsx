import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import CountryImages from "../../components/CountryImages"

describe("CountryImages Component", () => {
  beforeEach(() => {
    global.fetch.mockClear()
    global.fetch.mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            results: [
              {
                id: "1",
                urls: { regular: "https://example.com/image1.jpg" },
                alt_description: "Image 1",
                user: { name: "User 1" },
                links: { html: "https://example.com/image1" },
              },
              {
                id: "2",
                urls: { regular: "https://example.com/image2.jpg" },
                alt_description: "Image 2",
                user: { name: "User 2" },
                links: { html: "https://example.com/image2" },
              },
            ],
          }),
      }),
    )
  })

  test("renders loading state initially", () => {
    render(<CountryImages countryName="Canada" />)

    expect(screen.getByText("Loading...")).toBeInTheDocument()
  })

  test("renders images after loading", async () => {
    render(<CountryImages countryName="Canada" />)

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument()
      expect(screen.getAllByRole("img")).toHaveLength(2)
    })
  })

  test("shows error message when fetch fails", async () => {
    global.fetch.mockImplementationOnce(() => Promise.reject(new Error("Failed to fetch")))

    render(<CountryImages countryName="Canada" />)

    await waitFor(() => {
      expect(screen.getByText("Image Loading Error")).toBeInTheDocument()
      expect(screen.getByText("Failed to load images. Please try again later.")).toBeInTheDocument()
    })
  })

  test("fetches new images when refresh button is clicked", async () => {
    render(<CountryImages countryName="Canada" />)

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument()
    })

    const refreshButton = screen.getByText("More Images")
    fireEvent.click(refreshButton)

    expect(screen.getByText("Loading...")).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument()
      expect(global.fetch).toHaveBeenCalledTimes(2)
    })
  })

  test("shows attribution for photographers", async () => {
    render(<CountryImages countryName="Canada" />)

    await waitFor(() => {
      expect(screen.getByText("Photo by")).toBeInTheDocument()
      expect(screen.getByText("User 1")).toBeInTheDocument()
    })
  })

  test('shows "Images powered by Unsplash" text', async () => {
    render(<CountryImages countryName="Canada" />)

    await waitFor(() => {
      expect(screen.getByText("Images powered by Unsplash")).toBeInTheDocument()
    })
  })
})
