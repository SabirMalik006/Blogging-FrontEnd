export default function TestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-600 mb-8">Tailwind CSS Test</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Card 1</h2>
            <p className="text-gray-600">This is a test card with Tailwind styling.</p>
          </div>
          
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg shadow-lg p-6 text-white">
            <h2 className="text-xl font-semibold mb-2">Card 2</h2>
            <p>This card has a gradient background.</p>
          </div>
          
          <div className="bg-yellow-100 border-2 border-yellow-400 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-yellow-800 mb-2">Card 3</h2>
            <p className="text-yellow-700">This card has yellow styling.</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Primary Button
          </button>
          
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded ml-4">
            Success Button
          </button>
          
          <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded ml-4">
            Danger Button
          </button>
        </div>
        
        <div className="mt-8 p-4 bg-gray-100 rounded-lg">
          <p className="text-gray-700">
            If you can see colors, gradients, shadows, and hover effects, then Tailwind CSS is working correctly!
          </p>
        </div>
      </div>
    </div>
  );
}
