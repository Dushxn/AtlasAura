import "@testing-library/jest-dom"

// Mock window.scrollTo
window.scrollTo = jest.fn()

// Mock createPortal
jest.mock("react-dom", () => {
  const originalModule = jest.requireActual("react-dom")
  return {
    ...originalModule,
    createPortal: (node) => node,
  }
})

// Mock framer-motion
jest.mock("framer-motion", () => {
  const originalModule = jest.requireActual("framer-motion")
  return {
    ...originalModule,
    motion: {
      div: "div",
      h1: "h1",
      h2: "h2",
      h3: "h3",
      p: "p",
      button: "button",
      span: "span",
      ul: "ul",
      li: "li",
      a: "a",
      img: "img",
      svg: "svg",
      path: "path",
    },
    AnimatePresence: ({ children }) => children,
    useInView: () => true,
    useAnimation: () => ({
      start: jest.fn(),
    }),
    useScroll: () => ({
      scrollYProgress: { current: 0 },
    }),
    useTransform: () => ({ current: 0 }),
  }
})

// Mock axios
jest.mock("axios", () => ({
  create: jest.fn(() => ({
    get: jest.fn(),
    interceptors: {
      response: {
        use: jest.fn(),
      },
    },
  })),
}))

// Global fetch mock
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ results: [] }),
  }),
)
