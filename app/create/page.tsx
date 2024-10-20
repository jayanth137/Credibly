'use client';

import Create from "./create";
import Created from "./created";
import { useState } from "react";

export default function CourseCreation() {
    const [created, setCreated] = useState<boolean>(false);

    return (
        <div className="min-h-screen text-white">
            {!created ? (
                <Create setCreated={setCreated} />
            ) : (
                <Created setCreated={setCreated} />
            )}
        </div>
    );
}
