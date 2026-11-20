
import { useEffect, useState } from "react";
import Productcard from "../components/productcard";
import toast from "react-hot-toast";
import api from "../utils/Api";

export default function ProductsPage() {

    const [products, setProducts] = useState([]);
    const [query, setQuery] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    // Fetch all products
    async function fetchAllProducts() {

        try {
            setIsLoading(true);

            const response = await api.get("/products");

            setProducts(response.data);

        } catch (error) {

            console.error("Error fetching products:", error);
            toast.error("Failed to load products");

        } finally {
            setIsLoading(false);
        }
    }

    // Search products
    async function handleSearch(e) {

        e.preventDefault();

        if (!query.trim()) {
            toast.error("Please enter a product name");
            return;
        }

        try {

            setIsLoading(true);

            const response = await api.get("/products/search/" + encodeURIComponent(query.trim()));

            setProducts(response.data);

            if (response.data.length === 0) {
                toast.error("No products found");
            }

        } catch (error) {

            console.error("Search error:", error);
            toast.error("Error searching products");

        } finally {
            setIsLoading(false);
        }
    }

    // Load all products when page loads
    useEffect(() => {
        fetchAllProducts();
    }, []);

    // Reset search and show all products
    function handleAllProducts() {
        setQuery("");
        fetchAllProducts();
    }

    return (

        <div className="w-full min-h-screen flex flex-col items-center pt-32 pb-12">

            {/* Search Section */}
            <form
                onSubmit={handleSearch}
                className="w-full max-w-5xl px-4 mb-10 flex flex-col sm:flex-row items-center gap-3"
            >

                <input
                    type="text"
                    placeholder="Search Products..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full flex-1 p-3 rounded-lg border border-gray-300 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition"
                />

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full sm:w-auto px-6 py-3 bg-accent text-white font-semibold rounded-lg hover:opacity-90 transition disabled:opacity-50"
                >
                    Search
                </button>

                <button
                    type="button"
                    onClick={handleAllProducts}
                    disabled={isLoading}
                    className="w-full sm:w-auto px-6 py-3 bg-secondary text-white font-semibold rounded-lg hover:opacity-90 transition disabled:opacity-50"
                >
                    All Products
                </button>

            </form>

            {/* Products Section */}
            <div className="w-full flex justify-center items-start gap-4 flex-wrap px-4">

                {isLoading ? (

                    <div className="w-full flex justify-center items-center py-20">
                        <p className="text-lg text-gray-500 animate-pulse">
                            Loading products...
                        </p>
                    </div>

                ) : products.length > 0 ? (

                    products.map((item) => (

                        <Productcard
                            key={item.productId}
                            product={item}
                        />

                    ))

                ) : (

                    <div className="w-full flex flex-col justify-center items-center py-20">

                        <h2 className="text-2xl font-bold text-gray-700">
                            No Products Found
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Try searching with a different product name.
                        </p>

                        <button
                            onClick={handleAllProducts}
                            className="mt-5 px-6 py-3 bg-accent text-white rounded-lg hover:opacity-90 transition"
                        >
                            View All Products
                        </button>

                    </div>

                )}

            </div>

        </div>
    );
}
