import  { Component, ErrorInfo, ReactNode } from "react"
// import bugsnagClient // or any other error client
import { Link } from "react-router-dom"

interface ErrorBoundaryProps {
  children: ReactNode
}

interface Error {
  message: string
}

interface ErrorBoundaryState {
  hasError: boolean
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
    }
  }

  public static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    this.setState({
      hasError: true,
    })
    // bugsnagClient.notify(error, { context: info });

    console.error(
      "🚀 ~ file: index.tsx ~ line 32 ~ ErrorBoundary ~ componentDidCatch ~ error",
      error,
      info
    )
  }

  render() {
    const { hasError } = this.state
    const { children } = this.props

    if (hasError) {
      return (
        <div className="flex items-center justify-center w-screen h-screen bg-gradient-to-r from-indigo-600 to-blue-400">
          <div className="px-40 py-20 bg-white rounded-md shadow-xl">
            <div className="flex flex-col items-center">
              <h1 className="font-bold text-blue-600 text-9xl capitalize">
                Error
              </h1>
              <h6 className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
                <span className="text-red-500">Oops! </span>
                This wasn&apos;t meant to happen! 😫😢
              </h6>
              <p className="mb-8 text-center text-gray-500 md:text-lg">
                Sorry for any inconvenience. If you&apos;re seeing this often,
                please
                <Link to="/">Contact Us</Link>
              </p>
              <Link
                to="/"
                className="px-6 py-2 text-sm font-semibold text-blue-800 bg-blue-100"
              >
                Take me home
              </Link>
            </div>
          </div>
        </div>
      )
    }
    return children
  }
}

export default ErrorBoundary
