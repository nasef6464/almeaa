export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">جاري التحميل...</p>
      </div>
    </div>
  );
}

export function InlineLoader() {
  return (
    <div className="inline-flex items-center gap-2">
      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
      <span>جاري التحميل...</span>
    </div>
  );
}
