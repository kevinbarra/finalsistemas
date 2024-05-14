import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataScroller } from 'primereact/datascroller';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import { Card } from "primereact/card";
import { Dropdown } from 'primereact/dropdown';
import PageTemplate from "@assets/PageTemplate";

type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    rating: number;
    category: string;
    image: string;
};

// Datos estáticos de ejemplo para productos en el carrito
const exampleCartItems: Product[] = [
    { id: 1, name: "Laptop Gamer", description: "Ideal para gaming y trabajo", price: 1500, rating: 5, category: "Electrónica", image: "https://example.com/laptop.jpg" },
    { id: 2, name: "Auriculares Bluetooth", description: "Sonido de alta calidad, cancelación de ruido", price: 250, rating: 4, category: "Accesorios", image: "https://example.com/auriculares.jpg" },
    { id: 3, name: "Cámara DSLR", description: "Perfecta para fotografía profesional", price: 780, rating: 4, category: "Cámaras", image: "https://example.com/camara.jpg" }
];

const Cart = () => {
    const navigate = useNavigate();
    const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

    const categories = ['Ver Todas', ...Array.from(new Set(exampleCartItems.map(p => p.category)))];
    const filteredItems = categoryFilter && categoryFilter !== 'Ver Todas' ? exampleCartItems.filter(p => p.category === categoryFilter) : exampleCartItems;

    const itemTemplate = (product: Product) => (
        <Card title={product.name} subTitle={`$${product.price}`} className="mx-3 my-2" onClick={() => navigate(`/products/${product.id}`)}>
            <img src={product.image} alt={product.name} style={{ width: '100%' }} />
            <div>
                <div className="text-700">{product.description}</div>
                <Rating value={product.rating} readOnly cancel={false} />
                <Button label="Add to Cart" icon="pi pi-shopping-cart" />
            </div>
        </Card>
    );

    return (
        <PageTemplate needBack2Top>
            <div className="card">
                <Dropdown value={categoryFilter} options={categories} onChange={(e) => setCategoryFilter(e.value)} placeholder="Select a category" className="mb-4"/>
                <DataScroller value={filteredItems} itemTemplate={itemTemplate} rows={5} inline scrollHeight="500px" header="Scroll Down to Load More" />
            </div>
        </PageTemplate>
    );
};

export default Cart;
