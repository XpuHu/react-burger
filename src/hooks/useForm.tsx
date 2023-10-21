import { ChangeEvent, useState } from "react";

export function useForm<T>(inputValues: T) {
    const [ values, setValues ] = useState<T>( inputValues );

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        setValues( { ...values, [name]: value } );
    };

    return { values, handleInputChange, setValues };
}
