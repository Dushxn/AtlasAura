import { render, screen } from "@testing-library/react"
import CountrySkeleton from "../../components/CountrySkeleton"

describe("CountrySkeleton Component", () => {
  test("renders the correct number of skeleton cards", () => {
    render(<CountrySkeleton count={5} data-testid="country-skeleton" />)

    const skeletonCards = screen.getAllByTestId("country-skeleton")
    expect(skeletonCards).toHaveLength(5)
  })

  test("renders default number of skeleton cards when count is not provided", () => {
    render(<CountrySkeleton data-testid="country-skeleton" />)

    const skeletonCards = screen.getAllByTestId("country-skeleton")
    expect(skeletonCards).toHaveLength(8) // Default count is 8
  })
})
