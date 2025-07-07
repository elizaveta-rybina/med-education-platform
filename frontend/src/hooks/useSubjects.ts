// useSubjects.ts
import axios from 'axios'
import { useEffect, useState } from 'react'

interface Subject {
  id: string;
  name: string;
}

export const useSubjects = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get('/api/subjects');
        setSubjects(response.data);
      } catch (err) {
        setError('Ошибка при загрузке предметов');
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  return { subjects, loading, error };
};