import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import SessionCheck from '../utils/session';

export default function NoticeBoard() {
  const [notice, setNotice] = useState([]);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleBackClick = () => {
    router.push('/Admin/Admin_LoggedinPage');
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/Admin/publicNotice`);

      if (Array.isArray(response.data)) {
        const noticeData = response.data;


        if (noticeData.length > 0) {
          setNotice(noticeData);
        } else {
          setError('No Notice found');
        }
      } else {
        setError('No Notice found');
      }
    } catch (error) {
      console.error('Failed:', error);
      setError('An error occurred. Please try again later.');
    }

    
  };

  return (
    <div>
      <SessionCheck></SessionCheck>
      <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
        <div className="mt-4">
          
        </div>
        <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow">
          <h1 className="text-3xl font-semibold mb-4">Notices</h1>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="flex items-center justify-between bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md mb-4">
            <span className="text-lg font-semibold">Total Notices</span>
            <span className="text-3xl font-bold">{notice.length}</span>
          </div>
          <ul className="space-y-4">
            {notice.map((noticeItem, index) => (
              <li key={index} className="p-4 bg-gray-200 shadow-md rounded-md relative">
           
                <div className="flex justify-between items-center mb-2">
                  <div className="countdown font-mono text-6xl" style={{ '--value': index + 1 }}>
                    <span style={{ '--value': index + 1 }}></span>
                  </div>
                  <div>
                    <p className="text-black font-semibold">Subject: {noticeItem.subject}</p>
                    <p className="text-gray-600">Time: {noticeItem.postedTime}</p>
                  </div>
                </div>
                <p className="text-gray-600">Notice: {noticeItem.message}</p>
              </li>
            ))}
          </ul>
          <div className="mt-4 space-x-2">
     
          </div>
        </div>
      </div>
    </div>
  );
}
