export default function LoadingSpinner({ size = "default", message = "Loading..." }) {
  const sizeClasses = {
    small: "w-6 h-6 border-2",
    default: "w-12 h-12 border-4",
    large: "w-16 h-16 border-4",
  }

  return (
    <div className="flex flex-col items-center justify-center p-8 animate-fade-in">
      <div className={`${sizeClasses[size]} rounded-full border-blue-500 border-t-transparent animate-spin`}></div>
      {message && <p className="mt-4 text-gray-400">{message}</p>}
    </div>
  )
}
