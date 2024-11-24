import * as React from "react";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { FiltersCarsProps } from "./FiltersCars.types";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FilterCars(props: FiltersCarsProps) {
    const { clearFilters, setFilters, filters } = props;

    const handleFilter = (filter: string, value: string) => {
        setFilters(filter, value);
    };

    return (
        <div className="mt-5 mb-8 flex flex-col space-y-2 md:flex-row md:space-y-0 md:gap-5">
            <Select
                onValueChange={(value) => handleFilter("type", value)}
                value={filters.type}
            >
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="categoria" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>categoria</SelectLabel>
                        <SelectItem value="tuverculo">tuverculo</SelectItem>
                        <SelectItem value="organico">organico</SelectItem>
                        <SelectItem value="exotico">exotico</SelectItem>
                        <SelectItem value="humedo">humedo</SelectItem>
                        <SelectItem value="otro">otro</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>

            <Select
                onValueChange={(value) => handleFilter("transmission", value)}
                value={filters.transmission}
            >
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="tipo" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>tipo </SelectLabel>
                        <SelectItem value="fruta">fruta</SelectItem>
                        <SelectItem value="verdura">verdura</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>

            <Select
                onValueChange={(value) => handleFilter("engine", value)}
                value={filters.engine}
            >
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="estado" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel></SelectLabel>
                        <SelectItem value="bueno">bueno</SelectItem>
                        <SelectItem value="aceptable">aceptable</SelectItem>
                        <SelectItem value="regular">regular</SelectItem>
                        <SelectItem value="malo">malo</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>

            <Select
                onValueChange={(value) => handleFilter("people", value)}
                value={filters.people}
            >
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="rareza" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="comun">comun</SelectItem>
                        <SelectItem value="frecuente">frecuente</SelectItem>
                        <SelectItem value="escaso">escaso</SelectItem>
                        <SelectItem value="limitado">limitado</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>

            <Button onClick={clearFilters}>
                remover busqueda <Trash className="w-4 h-4 ml-2" />
            </Button>
        </div>
    );
}