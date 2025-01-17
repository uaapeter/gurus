'use client'
 
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
        <html>
        <body>
            {/* <h2>Something went wrong!</h2>
            <button onClick={() => reset()}>Try again</button> */}
            <div
                className='w-full h-[100%] flex-col flex items-center justify-center'
            >
                <div
                    className='p-8 flex flex-col items-center justify-center gap-4'
                >
                    <h2 className='text-red-500 text-lg'>Something went wrong! {error.message}</h2>
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
        </body>
        </html>
  )
}