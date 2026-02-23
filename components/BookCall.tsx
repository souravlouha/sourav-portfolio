import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

// টাইম স্লটগুলোর একটি অ্যারে
const TIME_SLOTS = [
  { start: '9:00 am', end: '9:30 am' },
  { start: '9:30 am', end: '10:00 am' },
  { start: '10:00 am', end: '10:30 am' },
  { start: '10:30 am', end: '11:00 am' },
  { start: '11:00 am', end: '11:30 am' },
  { start: '11:30 am', end: '12:00 pm' },
  { start: '12:00 pm', end: '12:30 pm' },
  { start: '12:30 pm', end: '1:00 pm' },
  { start: '1:00 pm', end: '1:30 pm' },
];

const BookCall = () => {
  const location = useLocation();
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [step, setStep] = useState<1 | 2>(1); 
  
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<{start: string, end: string} | null>(null);

  // UPDATED: ডেমো তারিখগুলো মুছে দেওয়া হয়েছে। এখন এই অ্যারেটি পুরো ফাঁকা।
  // ফলে ক্যালেন্ডারের কোনো দিনই আর লাল দেখাবে না।
  const bookedDates: string[] = []; 

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('success') === 'true') {
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 6000);
    }
  }, [location]);

  const handleNextStep = () => {
    if (selectedDate && selectedTime) {
      setStep(2);
    }
  };
  
  const getMonthName = (date: Date) => date.toLocaleString('default', { month: 'long', year: 'numeric' });
  const getShortMonthName = (date: Date) => date.toLocaleString('default', { month: 'short' });
  const getDaysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const changeMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + (direction === 'next' ? 1 : -1), 1));
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const daysInMonth = getDaysInMonth(currentMonth);
  const startingDay = getFirstDayOfMonth(currentMonth);

  return (
    <div className="min-h-screen bg-white py-24 px-4 font-sans relative overflow-hidden">
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-gradient-to-b from-blue-50 to-transparent blur-3xl rounded-full opacity-60 pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* ================= HERO SECTION ================= */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 gap-8">
          <div className="text-center md:text-left">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400 block mb-4">
              Schedule / Connect / Collaborate
            </span>
            <h1 className="text-6xl md:text-[7rem] font-black tracking-tighter uppercase leading-[0.85] text-neutral-900">
              Book a <br /> 
              Call <br /> 
              <span className="text-neutral-300">With me</span>
            </h1>
          </div>
          
          <div className="w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-8 border-white shadow-2xl shrink-0">
            <img src="/images/about02.jpeg" alt="Sourav Louha" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* ================= TABS SECTION ================= */}
        <div className="flex justify-center mb-12">
          <div className="bg-neutral-100/80 backdrop-blur-md p-1.5 rounded-full flex gap-2 border border-neutral-200/50 shadow-sm">
            <button 
              onClick={() => setStep(1)} 
              className={`px-6 py-2.5 rounded-full text-xs font-bold flex items-center gap-2 transition-all ${step === 1 ? 'bg-neutral-900 text-white shadow-md' : 'text-neutral-500 hover:text-neutral-900 hover:bg-white'}`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              Book a Call
            </button>
            <Link to="/contact" className="text-neutral-500 hover:text-neutral-900 hover:bg-white px-6 py-2.5 rounded-full text-xs font-bold flex items-center gap-2 transition-all">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
              Send a Message
            </Link>
          </div>
        </div>

        {isSuccess && (
          <div className="max-w-5xl mx-auto mb-6 p-4 bg-green-100 border border-green-200 text-green-800 rounded-xl text-sm font-bold flex items-center gap-3 shadow-sm">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Meeting Request Sent Successfully! I will confirm it via email shortly.
          </div>
        )}

        {/* ================= INTERACTIVE UI CONTAINER ================= */}
        <div className="bg-white rounded-[2.5rem] shadow-xl border border-neutral-100 overflow-hidden max-w-6xl mx-auto relative min-h-[550px]">
          <AnimatePresence mode="wait">
            
            {/* ----------------- STEP 1: CALENDAR & TIME ----------------- */}
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col md:flex-row h-full"
              >
                {/* Left Panel: Info */}
                <div className="w-full md:w-1/4 p-10 border-b md:border-b-0 md:border-r border-neutral-100 bg-neutral-50/30">
                  <img src="/images/about02.png" className="w-16 h-16 rounded-full mb-6 shadow-sm border-2 border-white object-cover" alt="Profile" />
                  <p className="text-sm font-bold text-neutral-500 mb-2">Sourav Louha</p>
                  <h2 className="text-3xl font-black tracking-tight text-neutral-900 mb-8">30 Min Meeting</h2>
                  
                  <div className="space-y-5 text-base font-medium text-neutral-600">
                    <div className="flex items-center gap-4">
                      <svg className="w-6 h-6 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      30m
                    </div>
                    <div className="flex items-center gap-4">
                      <svg className="w-6 h-6 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                      Google Meet
                    </div>
                    <div className="flex items-center gap-4 mt-8 pt-6 border-t border-neutral-200">
                      <svg className="w-6 h-6 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      Asia/Kolkata
                    </div>
                  </div>
                </div>

                {/* Middle Panel: Calendar */}
                <div className="w-full md:w-2/4 p-10 border-b md:border-b-0 md:border-r border-neutral-100 flex flex-col justify-center">
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="text-xl font-bold text-neutral-900">{getMonthName(currentMonth)}</h3>
                    <div className="flex gap-3">
                      <button onClick={() => changeMonth('prev')} className="p-2 rounded-full hover:bg-neutral-100 text-neutral-500 cursor-pointer border border-transparent hover:border-neutral-200 transition-all">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                      </button>
                      <button onClick={() => changeMonth('next')} className="p-2 rounded-full hover:bg-neutral-100 text-neutral-900 cursor-pointer border border-transparent hover:border-neutral-200 transition-all">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-7 gap-y-6 gap-x-2 text-center text-xs font-bold tracking-widest text-neutral-400 mb-4">
                    <div>SUN</div><div>MON</div><div>TUE</div><div>WED</div><div>THU</div><div>FRI</div><div>SAT</div>
                  </div>

                  <div className="grid grid-cols-7 gap-y-3 gap-x-2 text-center text-base font-semibold">
                    {[...Array(startingDay)].map((_, i) => (
                      <div key={`empty-${i}`}></div>
                    ))}
                    
                    {[...Array(daysInMonth)].map((_, i) => {
                      const date = i + 1;
                      
                      const currentIteratedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), date);
                      const todayDateOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
                      const isPast = currentIteratedDate < todayDateOnly;
                      
                      const dateString = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
                      const isBooked = bookedDates.includes(dateString) && !isPast; 
                      
                      const isSelected = selectedDate === date;

                      return (
                        <div 
                          key={date}
                          onClick={() => !isPast && !isBooked && setSelectedDate(date)}
                          className={`py-3 rounded-full flex flex-col items-center justify-center transition-all ${
                            isPast ? 'text-neutral-300 cursor-not-allowed' : 
                            isBooked ? 'bg-red-50 text-red-400 line-through cursor-not-allowed font-medium' : 
                            isSelected ? 'bg-neutral-900 text-white cursor-pointer shadow-lg scale-105' : 
                            'hover:bg-neutral-100 cursor-pointer text-neutral-800'
                          }`}
                        >
                          {date}
                          {!isPast && !isBooked && currentIteratedDate.getTime() === todayDateOnly.getTime() && !isSelected && <div className="w-1 h-1 bg-blue-500 rounded-full mt-1"></div>}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Right Panel: Time Slots */}
                <div className="w-full md:w-1/4 p-10 flex flex-col bg-neutral-50/10">
                   <div className="flex justify-between items-center mb-8">
                      <h3 className="text-lg font-bold text-neutral-900">
                        {selectedDate ? `${getShortMonthName(currentMonth)} ${selectedDate}` : 'Select Date'}
                      </h3>
                   </div>

                   <div className="flex flex-col gap-3 overflow-y-auto pr-2 custom-scrollbar flex-grow mb-6 h-80">
                      {selectedDate ? (
                        TIME_SLOTS.map((time, i) => (
                          <button 
                            key={i} 
                            onClick={() => setSelectedTime(time)}
                            className={`w-full py-4 text-sm font-bold border-2 rounded-2xl transition-all ${
                              selectedTime?.start === time.start 
                              ? 'border-neutral-900 bg-neutral-900 text-white shadow-lg translate-x-1' 
                              : 'border-neutral-200 text-neutral-700 hover:border-neutral-900 hover:shadow-md'
                            }`}
                          >
                            {time.start}
                          </button>
                        ))
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full text-center opacity-50">
                          <svg className="w-12 h-12 mb-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                          <p className="text-sm font-bold text-neutral-500">Please select a date to view available times.</p>
                        </div>
                      )}
                   </div>
                   
                   <div className={`transition-all duration-300 ${selectedTime ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
                      <button 
                        onClick={handleNextStep}
                        className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-base transition-colors shadow-xl"
                      >
                        Next Step
                      </button>
                   </div>
                </div>
              </motion.div>
            )}

            {/* ----------------- STEP 2: FORM SUBMISSION ----------------- */}
            {step === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col md:flex-row h-full"
              >
                {/* Left Panel: Summary Info */}
                <div className="w-full md:w-[40%] p-12 border-b md:border-b-0 md:border-r border-neutral-100 bg-neutral-50/30 flex flex-col">
                  <div className="mb-8 cursor-pointer w-fit" onClick={() => setStep(1)}>
                    <div className="w-12 h-12 rounded-full border border-neutral-200 flex items-center justify-center hover:bg-white hover:shadow-md transition-all">
                       <svg className="w-6 h-6 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    </div>
                  </div>

                  <img src="/images/about01.png" className="w-20 h-20 rounded-full mb-6 shadow-md border-2 border-white object-cover" alt="Profile" />
                  <p className="text-base font-bold text-neutral-500 mb-2">Sourav Louha</p>
                  <h2 className="text-4xl font-black tracking-tight text-neutral-900 mb-10">30 Min Meeting</h2>
                  
                  <div className="space-y-6 text-base font-semibold text-neutral-700">
                    <div className="flex items-start gap-4">
                      <svg className="w-6 h-6 text-neutral-400 mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      <span className="text-lg text-neutral-900 leading-snug">{getMonthName(currentMonth)} {selectedDate}, {currentMonth.getFullYear()}<br/><span className="text-neutral-500 text-sm">{selectedTime?.start} – {selectedTime?.end}</span></span>
                    </div>
                    <div className="flex items-center gap-4">
                      <svg className="w-6 h-6 text-neutral-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      30m
                    </div>
                    <div className="flex items-center gap-4">
                      <svg className="w-6 h-6 text-neutral-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                      Google Meet
                    </div>
                  </div>
                </div>

                {/* Right Panel: The Form */}
                <div className="w-full md:w-[60%] p-12">
                  <h3 className="text-2xl font-bold text-neutral-900 mb-8">Enter Details</h3>
                  
                  <form action="https://formspree.io/f/xojnkoed" method="POST" className="flex flex-col gap-6">
                    
                    <input type="hidden" name="_next" value={window.location.origin + "/book?success=true"} />
                    <input type="hidden" name="_subject" value="New Calendar Booking Request!" />
                    <input type="hidden" name="_captcha" value="false" />
                    <input type="hidden" name="Meeting_Date" value={`${getMonthName(currentMonth)} ${selectedDate}`} />
                    <input type="hidden" name="Meeting_Time" value={`${selectedTime?.start} to ${selectedTime?.end}`} />

                    <div className="flex flex-col gap-2">
                      <label htmlFor="name" className="text-sm font-bold text-neutral-900">Your name *</label>
                      <input 
                        type="text" id="name" name="name" required placeholder="John Doe" 
                        className="w-full bg-neutral-50 px-5 py-4 rounded-xl border border-neutral-200 focus:bg-white focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-all text-base font-medium"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className="text-sm font-bold text-neutral-900">Email address *</label>
                      <input 
                        type="email" id="email" name="email" required placeholder="you@example.com" 
                        className="w-full bg-neutral-50 px-5 py-4 rounded-xl border border-neutral-200 focus:bg-white focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-all text-base font-medium"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="notes" className="text-sm font-bold text-neutral-900">Additional notes</label>
                      <textarea 
                        id="notes" name="notes" rows={4} placeholder="Please share anything that will help prepare for our meeting." 
                        className="w-full bg-neutral-50 px-5 py-4 rounded-xl border border-neutral-200 focus:bg-white focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-all text-base font-medium resize-none"
                      ></textarea>
                    </div>

                    <p className="text-sm text-neutral-500 mt-2">
                      By proceeding, you agree to my Terms and Privacy Policy.
                    </p>

                    <div className="flex items-center gap-4 mt-6 pt-6 border-t border-neutral-100">
                      <button 
                        type="submit" 
                        className="w-full md:w-auto px-10 py-4 bg-neutral-900 hover:bg-black text-white rounded-xl font-bold text-base transition-all shadow-xl hover:shadow-2xl active:scale-95 ml-auto"
                      >
                        Confirm Booking
                      </button>
                    </div>

                  </form>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f5f5f5; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #c0c0c0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #a0a0a0; }
      `}</style>
    </div>
  );
};

export default BookCall;