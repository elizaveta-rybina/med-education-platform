// import { Teacher } from '@/components/users/user'
// import axios from 'axios'
// import { useEffect, useState } from 'react'

// export const useTeachers = () => {
//   const [teachers, setTeachers] = useState<Teacher[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchTeachers = async () => {
//       try {
//         const response = await axios.get('/api/teachers');
//         setTeachers(response.data);
//       } catch (err) {
//         setError('Ошибка при загрузке преподавателей');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTeachers();
//   }, []);

//   return { teachers, loading, error };
// };