import { Link } from 'react-router-dom'

function Admin() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
            <div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Admin Panel
                </h2>
            </div>
            <div className="flex flex-col space-y-4">
                <Link to="/admin/products" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                    Products
                </Link>
                <Link to="/admin/orders" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                    Orders  
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Admin;