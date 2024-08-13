export const Loading = () => {
  return (
    <>
      <button type="button" className="bg-indigo-500 rounded px-1 py-1" disabled>
        <div className="flex flex-row items-center justify-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"></div>
          <div className="justify-center items-center align-center px-1">Rolling for display...</div>
        </div>
      </button>
    </>
  );
}
