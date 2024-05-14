import { useState } from 'react';
import { DataScroller } from 'primereact/datascroller';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import { Card } from "primereact/card";
import { Dropdown } from 'primereact/dropdown';
import PageTemplate from "@assets/PageTemplate";
import ProductDetail from "@pages/products/productdetail";

type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    rating: number;
    category: string;
    image: string;
};

// Datos estáticos de ejemplo
const exampleProducts: Product[] = [
    { id: 1, name: "Smartphone", description: "Última generación de nuestro smartphone", price: 999, rating: 4, category: "Electrónica", image: "https://example.com/smartphone.jpg" },
    { id: 2, name: "Zapatillas deportivas", description: "Cómodas y perfectas para correr", price: 199, rating: 5, category: "Deportes", image: "https://example.com/zapatillas.jpg" },
    { id: 3, name: "Cafetera", description: "Disfruta del mejor café todas las mañanas", price: 299, rating: 4, category: "Hogar", image: "https://example.com/cafetera.jpg" }
];

const Products = () => {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

    const categories = ['Ver Todas', ...Array.from(new Set(exampleProducts.map(p => p.category)))];

    const handleProductSelect = (product: Product) => {
        setSelectedProduct(product);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedProduct(null);
    };

    const filteredProducts = categoryFilter && categoryFilter !== 'Ver Todas' ? exampleProducts.filter(p => p.category === categoryFilter) : exampleProducts;

    const itemTemplate = (product: Product) => (
        <Card className="mx-3 my-2" onClick={() => handleProductSelect(product)}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={product.image} alt={product.name} style={{ width: '150px', height: 'auto', marginRight: '20px' }} />
                <div>
                    <h2>{product.name}</h2>
                    <p>${product.price}</p>
                    <div>
                        <div className="text-700">{product.description}</div>
                        <Rating value={product.rating} readOnly cancel={false} />
                        <Button label="Add to Cart" icon="pi pi-shopping-cart" />
                    </div>
                </div>
            </div>
        </Card>
    );

    return (
        <PageTemplate needBack2Top>
            <div className="card">
                <Dropdown value={categoryFilter} options={categories} onChange={(e) => setCategoryFilter(e.value)} placeholder="Select a category" className="mb-4"/>
                <DataScroller value={filteredProducts} itemTemplate={itemTemplate} rows={5} inline scrollHeight="500px" header="Scroll Down to Load More" />
                {showModal && <ProductDetail product={selectedProduct} onClose={handleCloseModal} />}
            </div>
        </PageTemplate>
    );
};

export default Products;
