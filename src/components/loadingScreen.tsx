const LoadingScreen = () => {
  return (
    <div className='container my-5'>
      <div className='row justify-content-center align-items-center my-3'>
        <div className="spinner-grow text-info mx-1" role="status">
        </div>
        <div className="spinner-grow text-info mx-1" role="status">
        </div>
        <div className="spinner-grow text-info mx-1" role="status">
        </div>
        <div className="spinner-grow text-info mx-1" role="status">
        </div>
        <div className="spinner-grow text-info mx-1" role="status">
        </div>
      </div>
    </div>
  )
}

export default LoadingScreen