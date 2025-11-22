import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = window.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = window.env.SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const useFetchSupabase = (tableName) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const { data: rows, error } = await supabase
          .from(tableName)
          .select("*");

        if (error) throw error;

        if (isMounted) {
          setData(rows);
          setIsPending(false);
        }
      } catch (err) {
        if (isMounted) {
          setIsPending(false);
          setError(err.message);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [tableName]);

  return { data, isPending, error };
};

export default useFetchSupabase;
