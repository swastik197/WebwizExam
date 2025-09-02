import { useEffect, useState } from 'react'

import './App.css'
import axios from 'axios';

function App() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lists, setLists] = useState([]);

  useEffect(() => {
    if (search) {
      searchName();

    }
    
  }, [search]);

  async function searchName() {
    try {
      setLoading(true);
      const response = await axios.get(`https://dummyjson.com/users/search?q=${search}`);
      setResults(response.data.users);
      console.log(response.data.users);
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setLoading(false);
    }
  }




  return (
    <>
      <main className='h-screen w-screen flex items-center justify-between'>
        <div className='h-96 w-[400px] bg-slate-300 m-auto rounded-lg flex flex-col   justify-center items-center'>
         

         <div className='p-2  text-white flex space-x-2'>{lists.length > 0 ? lists.map((item) => <div className='bg-blue-600 rounded-2xl px-1' key={item.id}>{item.firstName} {item.lastName}</div>) : <div>No users selected</div>}</div>
        
        <input
          className='p-4 bg-blue-300 h-10 w-1/2 rounded-2xl border-none outline-none'
          type="search"
          value={search}
          onChange={(event) => {setSearch(event.target.value)
            console.log(event.target.value)
          }}
        />
        <div className='p-4 w-full text-center h-60 overflow-auto'>{loading ? (
          <div>Loading...</div>
        ) : results && results.length > 0 ? (
          results.map((result) => {
            return <div className='p-3 w-full border-b border-slate-400' onClick={() => {setLists([...lists, result]) 
              console.log(lists)}} key={result.id}>{result.firstName} {result.lastName}</div>;

          })
        ) : (
          <div>No results found</div>
        )}</div>
        </div>
      </main>
    </>
  );
}

export default App


