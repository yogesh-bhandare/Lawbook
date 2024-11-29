import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

export interface CaseType {
  id: number;
  case_id: string;
  date_added: string;
  title: string;
  content: string;
  img_url: string;
  summary: string;
  category: string;
}

export default function useCases() {
  const [cases, setCases] = useState<CaseType[]>([]);
  const [loader, setLoader] = useState(true);
  const [shouldRefetch, setShouldRefetch] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCaseData = useCallback(async () => {
    setLoader(true);
    setError(null);
    try {
      const response = await axios.get<CaseType[]>(
        `${process.env.EXPO_PUBLIC_SERVER_URL}/judgments/l1/`
      );
      
      setCases(response.data);
    } catch (error) {
      console.error("Error fetching case data:", error);
      setError(error instanceof Error ? error.message : "An unknown error occurred");
    } finally {
      setLoader(false);
    }
  }, []);

  useEffect(() => {
    fetchCaseData();
    return () => setShouldRefetch(false);
  }, [fetchCaseData, shouldRefetch]);

  const refetch = () => {
    setShouldRefetch(true);
  };

  const getCaseById = (id: number) => {
    return cases.find(caseItem => caseItem.id === id);
  };

  const getCasesByCategory = (category: string) => {
    return cases.filter(caseItem => caseItem.category === category);
  };

  return { 
    cases, 
    loader, 
    error, 
    refetch, 
    getCaseById, 
    getCasesByCategory 
  };
}