export const Loading = () => {
  return (
    <>
      <button type="button" className="btn btn-primary shadow-gray-600" disabled>
        <div className="flex flex-row items-center justify-center">
          <div className='loading loading-spinner text-neutral'></div>
          <div className="justify-center items-center align-center px-1">{"Rolling for Display..."}</div>
        </div>
      </button>
    </>
  );
}
