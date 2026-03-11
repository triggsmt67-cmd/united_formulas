
'use client';

import { usePO } from "@/context/POContext";
import PORequisitionForm from "./PORequisitionForm";

export default function GlobalPOContainer() {
    const { isPOFormOpen, setIsPOFormOpen } = usePO();

    return (
        <PORequisitionForm 
            isOpen={isPOFormOpen} 
            onClose={() => setIsPOFormOpen(false)} 
        />
    );
}
