import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProperties } from '../actions/propertyActions';

const PropertyListScreen = () => {
    const dispatch = useDispatch();

    const propertyList = useSelector((state) => state.propertyList);
    const { loading, error, properties } = propertyList;

    useEffect(() => {
        dispatch(listProperties());
    }, [dispatch]);

    return (
        <div>
            <h1>Properties</h1>
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>{error}</div>
            ) : (
                <div>
                    {properties.map((property) => (
                        <div key={property._id}>
                            <h2>{property.place}</h2>
                            <p>{property.area} sqft</p>
                            <p>{property.bedrooms} bedrooms</p>
                            <p>{property.bathrooms} bathrooms</p>
                            <button>I'm Interested</button>
                            <button>Like</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PropertyListScreen;