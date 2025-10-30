"use client";
import React, { useState } from "react";
import Predictions from "../../components/PredictionCard";

export default function predictionsPage() {
    const [coins, setCoins] = useState([]);

    useEffect(() => {
        fetch("/api/predictions")
            .then((res) => res.json())
            .then((data) => setCoins(data))
            .catch((err) => console.error("Failed to fetch predictions:", err));
        
    }, []); 

  return <Predictions coins={coins}/>;
}