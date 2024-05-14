import React, { useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import { Rating } from 'primereact/rating';
import PageTemplate from '@assets/PageTemplate';

type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    rating: number;
    category: string;
    image: string;
};

const Products = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        // Asegúrate de cambiar esta URL al endpoint de tu backend
        fetch('finalsistemas-production.up.railway.app')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    const itemTemplate = (product: Product) => (
        <Card className="mx-3 my-2" title={product.name}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={product.image} alt={product.name} style={{ width: '150px', height: 'auto', marginRight: '20px' }} />
                <div>
                    <h2>{product.name}</h2>
                    <p>${product.price}</p>
                    <div className="text-700">{product.description}</div>
                    <Rating value={product.rating} readOnly cancel={false} />
                </div>
            </div>
        </Card>
    );

    return (
        <PageTemplate needBack2Top>
            <div className="card">
                {products.map(product => itemTemplate(product))}
            </div>
        </PageTemplate>
    );
};

export default Products;
