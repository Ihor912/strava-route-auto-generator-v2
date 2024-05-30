/**
 * Renders a loading spinner component.
 *
 * @return {JSX.Element} component.
 */
export function LoadingSpinner() {
  return (
    <div
      data-testid="loading-spinner"
      className="flex justify-center items-center h-screen"
    >
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gray-900"></div>
    </div>
  );
}
