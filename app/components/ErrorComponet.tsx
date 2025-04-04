'use client' // Error components must be Client Components
 
import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
    return (
        <div
            className='w-full h-[100%] flex-col flex items-center justify-center'
        >
            <div
                className='p-8 flex flex-col items-center justify-center gap-4'
            >
                <h2 className='text-red-500 text-lg'>{error.message ? error?.message : 'Something went wrong! '}</h2>
                <button
                    onClick={
                    // Attempt to recover by trying to re-render the segment
                    () => reset()
                    }
                className='bg-gray text-white-light bg-primary rounded-md py-2 px-4'
                >
                    Try again
                </button>
            </div>
        </div>
    )
}