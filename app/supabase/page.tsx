"use client"
import { useEffect, useState } from "react";
// import "./App.css";
import { Auth } from "./_auth/page";
import TaskManager from "./_task/page";
import { supabase } from "../../hooks/supabase/supabase-client";

function App() {
  const [session, setSession] = useState<any>(null);

  const fetchSession = async () => {
    const currentSession = await supabase.auth.getSession();
    console.log(" ------------------------",currentSession);
    setSession(currentSession.data.session);
  };

  useEffect(() => {
    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        console.log( "zzzzzzzzzzz",_event,"zzzzzzzzzzz",session,"zzzzzzzzzzz")
        
        setSession(session);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="">
      {session ? (
        <div className="w-full text-center">
          <button className="bg-red-500 text-white rounded-md w-40 text-center m-10 p-2" onClick={logout}> Log Out</button>
          <TaskManager session={session} />
        </div>
      ) : (
        <Auth />
      )}
    </div>
  );
}

export default App;
