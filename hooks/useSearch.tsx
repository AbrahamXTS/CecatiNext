import { ChangeEvent, useEffect, useState } from "react";

import { IProducto } from "../interfaces/Producto";

export function useSearch(initialArray: IProducto[]) {

    const [search, setSearch] = useState("");
    const [arrayFiltered, setArrayFiltered] = useState<IProducto[]>([]);

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value.toLowerCase());
    }

    useEffect(() => {
        if (search === "") {
            setArrayFiltered(initialArray);
        } else {
            setArrayFiltered(
                initialArray.filter((element: IProducto) => 
                    element.nombre.toLowerCase().includes(search)
                )
            )
        }
    }, [search]);

    return {
        handleSearch, 
        arrayFiltered
    }
}
