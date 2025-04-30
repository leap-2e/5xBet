"use client"

import * as React from "react"
import { useEffect, useState } from "react"
import { ChevronsUpDown, Check } from "lucide-react"
import axios from "axios"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover"
import {
    Command,
    CommandInput,
    CommandList,
    CommandGroup,
    CommandItem,
    CommandEmpty,
} from "@/components/ui/command"

export default function CountrySelect() {
    const [countries, setCountries] = useState<any[]>([])
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")

    useEffect(() => {
        axios.get("https://restcountries.com/v3.1/all")
            .then((response) => {
                // console.log(response.data)
                setCountries(response.data)
            })
            .catch((error) => {
                console.error("Error fetching countries:", error)
            })
    }, [])

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {value
                        ? countries.find((c) => c.name.common === value)?.name.common
                        : "Select a country"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search country..." />
                    <CommandList>
                        <CommandEmpty>No country found.</CommandEmpty>
                        <CommandGroup>
                            {countries.map((country) => (
                                <CommandItem
                                    key={country.cca3}
                                    value={country.name.common}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === value ? "" : currentValue)
                                        setOpen(false)
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === country.name.common ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {country.name.common}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
