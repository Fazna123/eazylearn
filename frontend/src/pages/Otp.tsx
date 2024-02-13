import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignIn() {
    
   
  const [activation_token, setActivationToken] = useState("");

  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      setActivationToken(location.state.activation_token || "");
    }
  }, [location.state]);

  const handleChange = (e: { target: { id: string; value: string; }; }) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
   
    try {
      const {otp} = formData;

    if (!otp || otp.trim().length === 0 || otp.trim().length < 4 ) {
      toast.error("Invalid Otp. Please check your mail.");
      
      } else {
      setLoading(true);
      setError(false);

      const body = {
        ...formData,
        activation_token, 
      };
      console.log(body)

      const res = await fetch('/api/user/activate-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const data = await res.json();
     
      setLoading(false);
      if (data.success === false) {
        setError(true);
        return;
      }else{
        navigate('/signin')
      }
      
    }
    } catch (error) {
      console.log(error)
      setLoading(false);
      setError(true);
    }
  };




  return (
    <div className='w-full bg-slate-200'>
      {/* <Header/> */}
    <div className='p-3 max-w-lg mx-auto py-32'>
      <h1 className='text-3xl text-center font-semibold my-7'>Verify Your Account</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='number'
          placeholder='Enter OTP'
          id='otp'
          className='bg-slate-100 p-3 rounded-lg'
          onChange={handleChange}
        />
        
        <button
          disabled={loading}
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Submit'}
        </button>
        {/* <OAuth /> */}
      </form>
      {/* <div className='flex gap-2 mt-5'>
        <p>Dont Have an account?</p>
        <Link to='/signup'>
          <span className='text-blue-500'>Sign up</span>
        </Link>
      </div> */}
      {/* <Link to='/admin-sign-in'>
          <span className='text-blue-500'>Admin Sign In</span>
        </Link> */}
        <ToastContainer autoClose={2000}/>
        <p className={`text-red-700 mt-5 transition-opacity`}>
        { error ? 'Invalid OTP!' : ''}
      </p>

    </div>
    </div>
  )
}
