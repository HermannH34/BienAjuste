"use client"
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

function RealEstateForm() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [formData, setFormData] = useState({
        propertyType: '',
        details: {},
        budget: {},
        renovation: {},
        location: {},
        priority: '',
    });
    const [currentPhase, setCurrentPhase] = useState(1);

    const propertyType = watch('propertyType');

    const onNext = () => {
        setCurrentPhase(currentPhase + 1);
    };

    const onSubmit = data => {
        console.log(data);
        setFormData(prevFormData => ({
            ...prevFormData,
            ...data,
            details: { ...prevFormData.details, ...data.details },
        }));
        console.log('Prêt pour traitement ultérieur ou envoi à la DB');
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {currentPhase === 1 && (
                <>
                    <div>
                        <label>Quel type de bien recherchez-vous ?</label>
                        <select {...register('propertyType', { required: true })}>
                            <option value="">Sélectionnez un type</option>
                            <option value="house">Maison</option>
                            <option value="apartment">Appartement</option>
                        </select>
                        {errors.propertyType && <p>Ce champ est requis</p>}
                    </div>

                    {propertyType === 'house' && (
                        <>
                            <div>
                                <label>Une maison moderne ou une maison typique ?</label>
                                <select {...register('details.houseType', { required: true })}>
                                    <option value="">Sélectionnez</option>
                                    <option value="moderne">Moderne</option>
                                    <option value="typique">Typique</option>
                                </select>
                            </div>
                            <div>
                                <label>On parle d’une maison de ville ou d’une maison en quartier pavillonnaire ?</label>
                                <select {...register('details.locationType', { required: true })}>
                                    <option value="">Sélectionnez</option>
                                    <option value="ville">De ville</option>
                                    <option value="pavillonnaire">En quartier pavillonnaire</option>
                                </select>
                            </div>
                            <div>
                                <label>Le jardin ?</label>
                                <select {...register('details.garden', { required: true })}>
                                    <option value="">Sélectionnez</option>
                                    <option value="oui">Oui</option>
                                    <option value="non">Non</option>
                                    <option value="nonNegociable">Pas négociable</option>
                                </select>
                            </div>
                            <div>
                                <label>Et on va loin, une piscine ?</label>
                                <input type="checkbox" {...register('details.pool')} />
                            </div>
                        </>
                    )}

                    {propertyType === 'apartment' && (
                        <>
                            <div>
                                <label>Surface minimum (en m²):</label>
                                <input type="number" {...register('details.apartmentSurfaceMin', { min: 0 })} />
                            </div>
                            <div>
                                <label>Surface maximum (en m²):</label>
                                <input type="number" {...register('details.apartmentSurfaceMax', { min: 0 })} />
                            </div>
                            <div>
                                <label>Plutôt un immeuble moderne ou on reste fidèle à notre bon vieux Haussmann?</label>
                                <select {...register('details.buildingType', { required: true })}>
                                    <option value="">Sélectionnez le type d immeuble</option>
                                    <option value="moderne">Moderne</option>
                                    <option value="haussmannien">Haussmannien</option>
                                </select>
                            </div>
                        </>
                    )}

                    <button type="button" onClick={onNext}>Suivant</button>
                </>
            )}

            {currentPhase === 2 && (
                <>
                    <div>
                        <label>Combien de chambres est-ce qu il vous faut ?</label>
                        <select {...register('details.bedroomCount', { required: true })}>
                            <option value="">Sélectionnez le nombre de chambres</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5+</option>
                        </select>
                    </div>

                    <div>
                        <label>Combien de salles de bains ?</label>
                        <select {...register('details.bathroomCount', { required: true })}>
                            <option value="">Sélectionnez le nombre de salles de bains</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3+</option>
                        </select>
                    </div>
                    <button type="submit">Soumettre</button>
                </>
            )}
        </form>
    );
}

export default RealEstateForm;
