export default function AnalyticsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">📊 Analytics</h1>
        <p className="text-gray-600">Track your affiliate link performance</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white border rounded-lg p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Total Clicks</h3>
          <p className="text-3xl font-bold">0</p>
          <p className="text-sm text-green-600 mt-1">↑ 0% from last week</p>
        </div>

        <div className="bg-white border rounded-lg p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Conversions</h3>
          <p className="text-3xl font-bold">0</p>
          <p className="text-sm text-green-600 mt-1">$0 estimated</p>
        </div>

        <div className="bg-white border rounded-lg p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Top Product</h3>
          <p className="text-xl font-bold">N/A</p>
          <p className="text-sm text-gray-600 mt-1">No data yet</p>
        </div>

        <div className="bg-white border rounded-lg p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">CTR</h3>
          <p className="text-3xl font-bold">0%</p>
          <p className="text-sm text-gray-600 mt-1">Click-through rate</p>
        </div>
      </div>

      <div className="bg-white border rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Affiliate Links Performance</h2>
        <div className="text-center py-8 text-gray-500">
          <p>No affiliate links created yet.</p>
          <p className="text-sm mt-2">Create posts with affiliate links to see analytics here.</p>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 mb-2">💡 Analytics Setup</h3>
        <p className="text-blue-800 text-sm mb-4">
          Your analytics are powered by Cloudflare Analytics Engine. All affiliate link clicks 
          are automatically tracked with:
        </p>
        <ul className="text-blue-800 text-sm space-y-1 ml-4">
          <li>• Referrer URL</li>
          <li>• User country (via Cloudflare)</li>
          <li>• Device/browser info</li>
          <li>• Timestamp</li>
        </ul>
        <p className="text-blue-800 text-sm mt-4">
          Create your first post with affiliate links to start seeing data!
        </p>
      </div>
    </div>
  );
}
